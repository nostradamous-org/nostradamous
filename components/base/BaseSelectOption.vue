<template>
  <div class="base-select-option">
    <label
      v-if="label"
      class="flex base-select-option__label"
      :class="inputLabelClass"
    >
      <slot name="label">{{ label }}&nbsp; </slot>
    </label>
    <div
      class="base-select-option__input"
      @mouseleave="selectOptionStatus = false"
      @click="selectOptionClicked"
      :class="[
        {
          'base-select-option__input--clicked': selectOptionStatus,
          'base-select-option__input--disabled': disabled,
        },
        inputMainClass,
      ]"
    >
      <slot name="placeholder">
        <div class="flex center-items full-width space-between">
          <div class="flex center-items">
            <base-icon
              v-if="activeOption.icon"
              :icon-path="activeOption.icon"
            ></base-icon>
            <span
              class="ellipsis"
              :class="{ 'color-nepal': !activeOption.name && options.length }"
              >&nbsp;
              {{ activeOption.name ? activeOption.name : placeholder }}&nbsp;
            </span>
          </div>
          <base-icon
            svg-class="is-rotated-180"
            icon-path="general/up-arrow"
            size="16"
            color="nero"
          ></base-icon>
        </div>
      </slot>

      <base-transition name="vertical">
        <div
          v-if="selectOptionStatus"
          class="base-select-option__options scroll-bar"
          :class="inputOptionClass"
        >
          <slot name="options">
            <div
              v-for="(option, index) in options"
              :key="index"
              class="base-select-option__option"
              :class="{
                'base-select-option__option--active':
                  activeOption.id == option.id,
              }"
              @click="emitActiveOption(option)"
            >
              <base-icon
                v-if="option.icon"
                :icon-path="option.icon"
              ></base-icon>
              &nbsp; {{ option.name }}
            </div>
          </slot>
        </div>
      </base-transition>
    </div>
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  props: {
    inputLabelClass: {
      type: [String, Array],
      default: 'bold-500',
    },
    inputMainClass: {
      type: [String, Array],
      default: '',
    },
    inputOptionClass: {
      type: [String, Array],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    activeOption: {
      type: Object,
      required: true,
      validator: (propValue) => {
        let keys = Object.keys(propValue)
        return keys.includes('name') && keys.includes('id')
      },
    },
  },
  data() {
    return {
      selectOptionStatus: false,
    }
  },
  mounted() {
    if (this.options.length && !this.placeholder) {
      this.emitActiveOption(this.options[0])
    }
  },
  methods: {
    emitActiveOption(option) {
      this.$emit('update:active-option', option)
    },
    selectOptionClicked(e) {
      if (!this.disabled && !e.target.dataset.clickForbidden) {
        this.selectOptionStatus = !this.selectOptionStatus
      }
    },
  },
}
</script>

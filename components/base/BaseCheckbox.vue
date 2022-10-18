<template>
  <div class="flex center-items">
    <input
      :class="[
        type == 'checkbox' ? 'base-checkbox' : 'base-checkbox--radio',
        checkBoxInputClass,
        ,
      ]"
      :type="type"
      :id="id"
      v-bind="$attrs"
      :value="checkBoxValue"
      :disabled="disabled"
      @change="onChange"
    />
    <slot name="label">
      <label class="base-checkbox__label" :class="checkBoxLabelClass" :for="id">
        {{ label }}
      </label>
    </slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    checkBoxValue: {
      type: [String, Number],
      required: true,
    },
    checkBoxInputClass: {
      type: String,
      default: '',
    },
    checkBoxLabelClass: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'checkbox',
    },
    value: {
      type: [Array, String],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(e) {
      if (this.type == 'radio') {
        this.$emit('input', e.target.value)
      } else {
        let currentValue = [...this.value]
        if (e.target.checked) {
          currentValue.push(e.target.value)
        } else {
          currentValue = currentValue.filter((item) => item !== e.target.value)
        }
        this.$emit('input', currentValue)
      }
    },
  },
}
</script>

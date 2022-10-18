<template>
  <div class="flex">
    <slot name="label">
      <label
        v-if="label"
        class="flex center-items left-aligned"
        :class="inputLabelClass"
        >{{ label }}</label
      ></slot
    >
    <div class="flex" :class="inputParentClass">
      <slot name="extra-input"></slot>
      <component
        :is="inputModel"
        class="base-input"
        :class="[
          { 'base-input--error': errorStatus },
          { 'base-input--disabled': disabled },
          inputMainClass,
        ]"
        :disabled="disabled"
        v-bind="$attrs"
        @input="inputChange($event)"
      ></component>
    </div>
    <slot name="error"></slot>
  </div>
</template>

<script>
import { number } from '~/assets/js/utils'
export default {
  inheritAttrs: false,
  props: {
    inputModel: {
      type: String,
      default: 'input',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorStatus: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    inputLabelClass: {
      type: String,
      default: '',
    },
    inputParentClass: {
      type: String,
      default: '',
    },
    inputMainClass: {
      type: [String, Array],
      default: '',
    },
    number: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    inputChange(e) {
      if (this.number) {
        e.target.value = e.target.value.replace(number, '')
      }
      this.$emit('input', e.target.value)
    },
  },
}
</script>

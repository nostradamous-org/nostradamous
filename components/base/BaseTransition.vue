<template>
  <component :is="transition" v-bind="attrs">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    transition: {
      type: String,
      default: 'transition',
    },
    name: {
      type: String,
      default: 'vertical',
    },
    mode: {
      type: String,
      default: 'out-in',
    },
  },
  data() {
    return {
      attrs: {
        name: this.name,
        mode: this.mode,
      },
    }
  },
}
</script>

<style lang="scss">
@import 'assets/css/6_utilities/_transitions.scss';
</style>

<template>
  <div class="base-icon">
    <i :class="[`svg-icon--${size} ${svgColor}`, svgClass]">
      <component :is="icon"></component>
    </i>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: '32',
    },
    svgClass: {
      type: [String, Object, Array],
      default: '',
    },
    iconPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      icon: null,
    }
  },
  computed: {
    svgColor() {
      return this.color ? `svg-icon--${this.color}` : ''
    },
  },
  watch: {
    iconPath: async function () {
      this.icon = await import(`~/assets/svg/${this.iconPath}.svg?inline`)
    },
  },
  async created() {
    this.icon = await import(`~/assets/svg/${this.iconPath}.svg?inline`)
  },
}
</script>

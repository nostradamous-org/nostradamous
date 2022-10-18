<template>
  <loading
    :active="isLoading"
    loader="bars"
    :is-full-page="isFullPage"
    :background-color="backgroundColor"
    :blur="blur"
    :width="30"
    :height="30"
    :color="$config.loadingColor"
  >
  </loading>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    Loading,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    blur: {
      type: String,
      default: '',
    },
  },
}
</script>

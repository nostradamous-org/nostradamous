<template>
  <div class="container full-width column-flex">
    <the-header></the-header>
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/base/TheHeader'
export default {
  components: {
    TheHeader,
  },
}
</script>

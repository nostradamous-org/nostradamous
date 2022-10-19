<template>
  <section class="filler column-flex top-margin color-white">
    <div class="column-flex full-width top-margin bottom-margin">
      <div
        v-if="error.statusCode === 404 || error.statusCode === 403"
        class="full-width column-flex center-items center-aligned"
      >
        <h1 class="bold-900 no-margin top-margin">Page Not Found</h1>
        <p class="bold-500 half-top-margin">
          There is nothing here!
        </p>
        <nuxt-link
          :to="{ name: 'home' }"
          class="button top-margin bottom-margin"
          >Home</nuxt-link
        >
      </div>
      <div
        v-else-if="error.statusCode === 500"
        class="full-width column-flex center-items center-aligned"
      >
        <h1 class="bold-900 no-margin top-margin">
          Something Wrong
        </h1>
        <p class="bold-500 half-top-margin">We will fix it soon!</p>
        <button @click="reload" class="button top-margin bottom-margin">
          Try again
        </button>
      </div>
      <div v-else class="full-width column-flex center-items center-aligned">
        <h1 class="bold-900 no-margin top-margin">
          Something Wrong
        </h1>
        <p class="bold-500 half-top-margin">
          The problem has beed reported to technical team. We appolize for the
          issue. code: {{ convertCode[error.statusCode] }})
        </p>
        <p class="bold-500 half-top-margin"></p>
        <button @click="reload" class="button top-margin bottom-margin">
          Try again
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      convertCode: {
        400: 1, //Bad Request
        401: 2, //Unauthorized
        408: 3, //timeout
        502: 4, //Bad Gateway,
        504: 5, //Gateway Timeout
        405: 6, // Method Not Allowed
        403: 7, // Forbidden
      },
    }
  },
  methods: {
    reload() {
      window.location.reload()
    },
  },
}
</script>

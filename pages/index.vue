<template>
  <div class="flex full-width top-margin">
    <bridge-route></bridge-route>
  </div>
</template>

<router>
  {
    name: "home"
  }
</router>

<script>
import BridgeRoute from '~/components/bridge/BridgeRoute'
export default {
  components: {
    BridgeRoute,
  },
}
</script>

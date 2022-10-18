<template>
  <div class="flex full-width top-margin">
    <bridge-route></bridge-route>
    <bridge-details></bridge-details>
  </div>
</template>

<router>
  {
    name: "home"
  }
</router>

<script>
import BridgeRoute from '~/components/bridge/BridgeRoute'
import BridgeDetails from '~/components/bridge/BridgeDetails'
export default {
  components: {
    BridgeRoute,
    BridgeDetails,
  },
}
</script>

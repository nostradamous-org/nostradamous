<template>
  <base-select-option
    class="column-flex flex-start-align flex-1"
    :label="flow"
    :options="tokens"
    :active-option.sync="option"
  >
  </base-select-option>
</template>

<script>
import { chainsId } from '~/assets/js/constants'
export default {
  props: {
    flow: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      option: {
        id: '',
        name: '',
        icon: '',
      },
      tokens: chainsId,
    }
  },
}
</script>

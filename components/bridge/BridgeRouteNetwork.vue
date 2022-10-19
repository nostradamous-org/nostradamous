<template>
  <base-select-option
    class="column-flex flex-start-align flex-1"
    input-main-class="bridge__network"
    :label="flow"
    :options="networks"
    :active-option.sync="option"
  >
  </base-select-option>
</template>

<script>
import { chainsId } from '~/assets/js/constants'
import { isObjectEmpty } from '~/assets/js/utils'
export default {
  props: {
    flow: {
      type: String,
      required: true,
    },
    network: {
      type: Object,
      required: true,
    },
    fromNetwork: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      option: {
        id: '',
        name: '',
        icon: '',
      },
      networks: chainsId,
    }
  },
  watch: {
    option: {
      handler() {
        this.$emit('network-value', this.option, this.flow)
      },
      deep: true,
    },
    network: {
      handler() {
        this.option = this.network
      },
      deep: true,
    },
    fromNetwork: {
      handler() {
        if (!isObjectEmpty(this.fromNetwork)) {
          this.networks = chainsId.filter((x) => x.id !== this.fromNetwork.id)
          if (this.option.id === this.fromNetwork.id) {
            this.option = this.networks[0]
          }
        }
      },
      deep: true,
    },
  },
}
</script>

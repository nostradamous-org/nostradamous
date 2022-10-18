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
import { isObjectEmpty } from '~/assets/js/utils'
export default {
  props: {
    flow: {
      type: String,
      required: true,
    },
    token: {
      type: Object,
      required: true,
    },
    fromToken: {
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
      tokens: chainsId,
    }
  },
  watch: {
    option: {
      handler() {
        this.$emit('token-value', this.option, this.flow)
      },
      deep: true,
    },
    token: {
      handler() {
        this.option = this.token
      },
      deep: true,
    },
    fromToken: {
      handler() {
        if (!isObjectEmpty(this.fromToken)) {
          this.tokens = chainsId.filter((x) => x.id !== this.fromToken.id)
          if (this.option.id === this.fromToken.id) {
            this.option = this.tokens[0]
          }
        }
      },
      deep: true,
    },
  },
}
</script>

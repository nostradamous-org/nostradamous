<template>
  <base-input
    id="wallet"
    placeholder="Recipient Wallet Address"
    class="bottom-margin column-flex full-width"
    label="Recipient Wallet Address"
    input-label-class="bold-500"
    input-parent-class="center-items full-width relative"
    v-model="wallet"
  >
  </base-input>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      wallet: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['walletValue']),
  },
  watch: {
    walletValue: {
      handler() {
        if (this.walletValue.address) {
          this.wallet = this.walletValue.address
        }
      },
      deep: true,
    },
    wallet: function () {
      this.$emit('wallet-address', this.wallet)
    },
  },
}
</script>

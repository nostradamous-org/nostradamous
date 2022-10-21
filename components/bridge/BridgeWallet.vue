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
    <template v-slot:error>
      <span
        >You can use different recipient address than your connected wallet
        address.</span
      >
    </template>
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
        this.wallet = this.walletValue.address
      },
      deep: true,
    },
    wallet: function () {
      this.$emit('wallet-address', this.wallet)
    },
  },
}
</script>

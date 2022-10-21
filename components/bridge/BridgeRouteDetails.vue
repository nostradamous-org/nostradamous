<template>
  <div class="column-flex top-margin bottom-margin bridge__details relative">
    <base-loading :is-loading="isLoading"></base-loading>
    <span><b>Estimated Transfer Fee ~</b> {{ fee === 0 ? '' : fee }}</span>
    <span v-if="txHash"><b>Transaction Hash:</b> {{ txHash }}</span>
    <span v-if="txHash" class="flex"
      ><b>Status:</b>
      <span :class="`bridge__transaction-status--${txStatus}`"
        >&nbsp;{{ txStatus }}</span
      ></span
    >
  </div>
</template>

<script>
import { getTransferFee } from '~/utils/getTransferFee'
export default {
  props: {
    fee: {
      type: [String, Number],
      required: true,
    },
    txHash: {
      type: String,
      required: true,
    },
    fromNetwork: {
      type: String,
      required: true,
    },
    toNetwork: {
      type: String,
      required: true,
    },
    amount: {
      type: [String, Number],
      required: true,
    },
    txStatus: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  watch: {
    fromNetwork: function () {
      this.getFee()
    },
    toNetwork: function () {
      this.getFee()
    },
    amount: function () {
      this.getFee()
    },
  },
  methods: {
    async getFee() {
      if (!this.amount) {
        return
      }
      try {
        this.isLoading = true
        let fee = await getTransferFee(
          this.fromNetwork.toLowerCase(),
          this.toNetwork.toLowerCase(),
          'aUSDC',
          this.amount.toString()
        )
        this.$emit('update:fee', fee)
        this.isLoading = false
      } catch (e) {
        console.log(e)
        this.isLoading = false
      }
    },
  },
}
</script>

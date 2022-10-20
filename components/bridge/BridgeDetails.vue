<template>
  <div class="column-flex bottom-margin bridge__details">
    <span v-if="fee"><b>Transfer Fee:</b> {{ fee }}</span>
    <span v-if="txHash"><b>Transactions Hash:</b> {{ txHash }}</span>
    <span class='flex'
      ><b>Status:</b>
      <span :class="`bridge__transaction-status--${status}`">&nbsp;{{
        status
      }}</span></span
    >
  </div>
</template>

<script>
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
  },
  computed: {
    status() {
      return this.fee ? 'success' : 'failed'
    },
  },
}
</script>

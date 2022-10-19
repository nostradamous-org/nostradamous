<template>
  <div class="column-flex bottom-margin bridge__details">
    <span><b>Transfer Fee:</b> {{ fee }}</span>
    <span><b>Transactions Hash:</b> {{ txHash }}</span>
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
}
</script>

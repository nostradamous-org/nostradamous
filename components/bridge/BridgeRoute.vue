<template>
  <div class="bridge column-flex">
    <span class="fl2 bold-500 bottom-margin">Bridge</span>
    <div class="flex flex-end-align bottom-margin">
      <bridge-route-token
        flow="From"
        :token="fromToken"
        @token-value="tokenValue"
      ></bridge-route-token>
      <base-icon
        class="side-margin cursor-pointer bridge__converter-icon"
        color="nero"
        icon-path="general/converter"
        @click.native="changeToken"
      ></base-icon>
      <bridge-route-token
        flow="To"
        :token="toToken"
        :from-token="fromToken"
        @token-value="tokenValue"
      ></bridge-route-token>
    </div>
    <bridge-route-currency
      flow="from"
      @amount-value="amountValue"
    ></bridge-route-currency>
    <bridge-route-currency
      flow="to"
      @amount-value="amountValue"
    ></bridge-route-currency>
    <button class="button--full bold-500">Select Route</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromToken: {},
      toToken: {},
      sendAmount: '',
      receiveAmount: '',
    }
  },
  methods: {
    tokenValue(value, flow) {
      if (flow.toLowerCase() === 'from') {
        this.fromToken = value
      } else {
        this.toToken = value
      }
    },
    amountValue(value, flow) {
      if (flow === 'from') {
        this.sendAmount = value
      } else {
        this.receiveAmount = value
      }
    },
    changeToken() {
      let temp = this.fromToken
      this.fromToken = this.toToken
      this.toToken = temp
    },
  },
}
</script>

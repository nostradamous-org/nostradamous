<template>
  <div class="bridge column-flex">
    <base-loading :is-loading="isLoading" isFullPage></base-loading>
    <span class="fl2 bold-500 bottom-margin">Bridge</span>
    <div class="flex flex-end-align bottom-margin">
      <bridge-route-network
        flow="From"
        :network="fromNetwork"
        @network-value="networkValue"
      ></bridge-route-network>
      <base-icon
        class="side-margin cursor-pointer bridge__converter-icon"
        color="nero"
        icon-path="general/converter"
        @click.native="changeNetwork"
      ></base-icon>
      <bridge-route-network
        flow="To"
        :network="toNetwork"
        :from-network="fromNetwork"
        @network-value="networkValue"
      ></bridge-route-network>
    </div>
    <bridge-wallet @wallet-address="walletAddress"></bridge-wallet>
    <bridge-route-currency
      flow="send"
      @amount-value="amountValue"
    ></bridge-route-currency>
    <bridge-route-currency
      flow="receive"
      :receive-amount="receiveAmountCalculator"
      @amount-value="amountValue"
    ></bridge-route-currency>
    <bridge-details
      v-if="transferFee && txHash"
      :fee="transferFee"
      :tx-hash="txHash"
    ></bridge-details>
    <button class="button--full bold-500" @click="bridge">Bridge</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gatewaySendToken } from '../../utils'

export default {
  data() {
    return {
      fromNetwork: {},
      toNetwork: {},
      sendAmount: '',
      receiveAmount: '',
      isLoading: false,
      wallet: '',
      transferFee: '',
      txHash: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['walletValue']),
    receiveAmountCalculator() {
      if (this.transferFee > 0) {
        return +this.sendAmount - +this.transferFee
      }
      return ''
    },
  },
  methods: {
    walletAddress(wallet) {
      this.wallet = wallet
    },
    networkValue(value, flow) {
      if (flow?.toLowerCase() === 'from') {
        this.fromNetwork = value
      } else {
        this.toNetwork = value
      }
    },
    amountValue(value, flow) {
      if (flow === 'send') {
        this.sendAmount = value
      } else {
        this.receiveAmount = value
      }
    },
    changeNetwork() {
      let temp = this.fromNetwork
      this.fromNetwork = this.toNetwork
      this.toNetwork = temp
    },
    async bridge() {
      if (!this.wallet) {
        this.$toast.error(
          'Please connect your wallet or enter recipient wallet address'
        )
        return
      }
      if (!this.sendAmount) {
        this.$toast.error('Please enter send amount')
        return
      }
      this.transferFee = ''
      this.txHash = ''
      this.isLoading = true

      const cb = (data) => {
        this.transferFee = data.transferFee
        this.txHash = data.txHash
      }
      await gatewaySendToken(
        this.fromNetwork.network,
        this.toNetwork.network,
        this.sendAmount,
        this.wallet,
        cb
      )
        .finally(() => {
          this.isLoading = false
        })
        .catch((e) => {
          if (e.toString().includes('insufficient funds for gas')) {
            this.$toast.error('Insufficient funds for gas')
          } else {
            this.$toast.error('Something Wrong happened')
          }
        })
    },
  },
}
</script>

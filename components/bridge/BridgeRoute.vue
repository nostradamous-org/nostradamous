<template>
  <div class="bridge column-flex">
    <base-loading :is-loading="isLoading" isFullPage></base-loading>
    <div class="column-flex bottom-margin">
      <span class="fl2 bold-500">Bridge</span>
      <span class="fl1 bold-400"
        >You can bridge only on <b>testnet</b> for now.</span
      >
    </div>
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
      :fee="transferFee"
      @amount-value="amountValue"
      @token-details="tokenDetails"
    ></bridge-route-currency>
    <bridge-route-currency
      flow="receive"
      :receive-amount="receiveAmountCalculator"
      @amount-value="amountValue"
      @token-details="tokenDetails"
    ></bridge-route-currency>
    <bridge-route-details
      :amount="sendAmount"
      :tx-status="txStatus"
      :to-network="toNetwork.name"
      :from-network="fromNetwork.name"
      :fee.sync="transferFee"
      :tx-hash="txHash"
    ></bridge-route-details>
    <button class="button--full bold-500" @click="bridge">Bridge</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gatewaySendToken } from '~/utils'

export default {
  data() {
    return {
      fromNetwork: {
        name: '',
      },
      toNetwork: {
        name: '',
      },
      sendAmount: '',
      isLoading: false,
      wallet: '',
      transferFee: 0,
      txHash: '',
      txStatus: '',
      tokenAddress: {},
      balanceError: '',
      requiredMessage: {
        wallet: 'Please, Connet Your Wallet',
        recipient: 'Please, Enter Recipient Wallet Address',
        value: 'Please, Enter Send Amount',
        network: 'Wrong Network Selected',
      },
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
      this.transferFee = 0
      if (flow?.toLowerCase() === 'from') {
        this.fromNetwork = value
      } else {
        this.toNetwork = value
      }
    },
    amountValue(value, error) {
      this.sendAmount = value
      this.transferFee = 0
      this.balanceError = error
    },
    tokenDetails(flow, details) {
      let contract = details.contracts.find(
        (x) => x.name === this.fromNetwork.name
      )
      if (flow === 'send') {
        this.tokenAddress.srcToken = details.token
        this.tokenAddress.srcTokenAddress = contract.address
      } else {
        this.tokenAddress.destTokenAddress = contract.address
      }
    },
    changeNetwork() {
      let temp = this.fromNetwork
      this.fromNetwork = this.toNetwork
      this.toNetwork = temp
    },
    bridge() {
      if (this.balanceError) {
        return
      }
      let isWrongNetwork = this.walletValue.networkId !== this.fromNetwork.id
      let key = !this.walletValue.address
        ? 'wallet'
        : isWrongNetwork
        ? 'network'
        : !this.wallet
        ? 'recipient'
        : !this.sendAmount
        ? 'value'
        : ''
      if (key) {
        this.$toast.error(this.requiredMessage[key])
        return
      }
      this.txHash = ''
      this.txStatus = ''
      this.isLoading = true

      this.sendTokenMethod()
    },
    async sendTokenMethod() {
      const cb = (data) => {
        this.transferFee = data.transferFee
        this.txHash = data.txHash
      }
      await gatewaySendToken(
        this.fromNetwork.network,
        this.toNetwork.network,
        this.sendAmount,
        this.wallet,
        this.tokenAddress.srcToken,
        this.tokenAddress.srcTokenAddress,
        this.tokenAddress.destTokenAddress,
        cb
      )
        .finally(() => {
          this.isLoading = false
        })
        .catch((e) => {
          console.log(e)
          let error = e.toString()
          if (error.includes('failed')) {
            this.txStatus = 'failed'
          }
          if (error.includes('insufficient funds for gas')) {
            this.$toast.error('Insufficient funds for gas')
          } else if (error.includes('transactionHash')) {
            let start = error.search('transactionHash=')
            let end = error.search(', transaction=')
            this.txHash = error.slice(start + 17, end - 1)
          } else {
            this.$toast.error('Something Wrong happened')
          }
        })
    },
  },
}
</script>

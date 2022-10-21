<template>
  <div class="column-flex bottom-margin">
    <div class="flex">
      <base-input
        :id="flow"
        :placeholder="placeholder"
        class="bridge__currency-input full-width"
        :error-status="error ? true : false"
        input-parent-class="center-items full-width relative"
        :disabled="flow === 'receive' ? true : false"
        type="number"
        v-model="amount"
      >
        <template v-if="flow === 'send'" v-slot:extra-input>
          <button
            class="button bridge__currency-max"
            :class="{ 'color-sova-grey': !balanceValue.value }"
            :disabled="balanceValue.value ? false : true"
            @click="amount = balanceValue.value"
          >
            Max
          </button>
        </template>
      </base-input>

      <base-select-option
        input-main-class="bridge__currency-option"
        :options="currencies"
        :active-option.sync="option"
      ></base-select-option>
    </div>
    <span v-if="flow === 'send'" class="fs1 color-nero bold-400"
      >&nbsp; &nbsp;Balance: {{ balanceValue.value }}
      {{ balanceValue.symbol }}</span
    >
    <span v-if="error" class="color-red bold-500">* {{ error }}</span>
  </div>
</template>

<script>
import { Contract, providers, ethers } from 'ethers'
import IERC20 from '~/abi/IERC20.sol/IERC20.json'
import { tokens } from '~/assets/js/constants'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    flow: {
      type: String,
      required: true,
    },
    receiveAmount: {
      type: [Number, String],
      default: '',
    },
    fee: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      amount: '',
      option: {
        id: '',
        name: '',
        icon: '',
      },
      error: '',
      currencies: this.flow === 'send' ? [tokens[0]] : [tokens[1]],
    }
  },
  computed: {
    ...mapGetters('auth', ['walletValue']),
    ...mapGetters('general', ['fromNetworkValue', 'balanceValue']),
    placeholder() {
      return this.flow === 'send' ? 'You Send' : 'You Receive'
    },
  },
  watch: {
    amount: function () {
      if (this.flow === 'send') {
        this.error = ''
        if (this.amount <= 0 && this.amount) {
          this.error = 'Send amount must be greater than 0'
        }
        if (+this.amount + +this.fee > this.balanceValue.value) {
          this.error = 'Insufficient Balance'
        }
        if (this.error) {
          return
        }
        this.$emit('amount-value', this.amount, this.flow)
      }
    },
    receiveAmount: function () {
      this.amount = this.receiveAmount
    },
    fee: function () {
      if (this.flow === 'send') {
        if (+this.amount + +this.fee > this.balanceValue.value) {
          this.error = 'Insufficient Balance'
        }
      }
    },
    option: {
      handler() {
        this.$emit('token-details', this.flow, this.option)
      },
      deep: true,
    },
    fromNetworkValue: {
      handler() {
        this.getBalance()
      },
      deep: true,
    },
    'walletValue.address': function () {
      this.getBalance()
    },
  },
  methods: {
    ...mapActions('general', ['setBalance']),
    async getBalance() {
      if (this.flow !== 'send' || !this.walletValue.address) {
        return
      }
      try {
        const provider = new providers.Web3Provider(window.ethereum)
        let rawBalance = ''
        let balance = {
          value: '',
          symbol: this.option.token,
        }
        if (this.option.main) {
          rawBalance = await provider.getBalance(this.walletAddress.address)
        } else {
          let token = tokens.find((x) => x.name === this.option.name).contracts
          let contract = token.find(
            (x) => x.name === this.fromNetworkValue.name
          ).address
          const srcErc20 = new Contract(contract, IERC20.abi, provider)
          rawBalance = await srcErc20.balanceOf(this.walletValue.address)
        }
        balance.value = +ethers.utils.formatUnits(rawBalance, 6)
        this.setBalance(balance)
      } catch (e) {
        this.$toast.error('Something wrong happened')
        console.log(e)
      }
    },
  },
}
</script>

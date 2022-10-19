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
        <!-- <template v-if="flow === 'send'" v-slot:extra-input>
          <button
            class="button bridge__currency-max"
            :class="{ 'color-sova-grey': !walletValue.balance }"
            :disabled="walletValue.balance ? false : true"
            @click="amount = walletValue.balance"
          >
            Max
          </button>
        </template> -->
      </base-input>

      <base-select-option
        input-main-class="bridge__currency-option"
        :options="currencies"
        :active-option.sync="option"
      ></base-select-option>
    </div>
    <span v-if="flow === 'send'" class="fs1 color-nero bold-400"
      >&nbsp; &nbsp;Balance: {{ walletValue.balance }}
      {{ walletValue.currency }}</span
    >
    <span v-if="error" class="color-red bold-500">* {{ error }}</span>
  </div>
</template>

<script>
import { stableCoins } from '~/assets/js/constants'
import { mapGetters } from 'vuex'
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
      currencies: this.flow === 'send' ? [stableCoins[0]] : [stableCoins[1]],
    }
  },
  computed: {
    ...mapGetters('auth', ['walletValue']),
    placeholder() {
      return this.flow === 'send' ? 'You Send' : 'You Receive'
    },
  },
  watch: {
    amount: function () {
      this.error = ''
      if (this.amount <= 0 && this.amount) {
        this.error = 'Send amount must be greater than 0'
        return
      }
      this.$emit('amount-value', this.amount, this.flow)
    },
    receiveAmount: function () {
      this.amount = this.receiveAmount
    },
  },
}
</script>

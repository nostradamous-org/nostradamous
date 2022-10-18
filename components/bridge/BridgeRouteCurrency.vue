<template>
  <div class="column-flex bottom-margin">
    <div class="flex">
      <base-input
        :id="flow"
        :placeholder="placeholder"
        class="bridge__currency-input full-width"
        input-parent-class="center-items full-width relative"
        number
        v-model.number="amount"
      >
        <template v-slot:extra-input>
          <button
            class="button bridge__currency-max"
            :class="{ 'color-sova-grey': !walletValue.balance }"
            :disabled="walletValue.balance ? false : true"
            @click="amount = walletValue.balance"
          >
            Max
          </button>
        </template>
      </base-input>

      <base-select-option
        :options="currencies"
        :active-option.sync="option"
      ></base-select-option>
    </div>
    <span v-if="flow === 'from'" class="fs1 color-nero bold-400"
      >&nbsp; &nbsp;Balance: {{ walletValue.balance }}
      {{ walletValue.currency }}</span
    >
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
  },
  data() {
    return {
      amount: '',
      option: {
        id: '',
        name: '',
        icon: '',
      },
      currencies: stableCoins,
    }
  },
  watch: {
    amount: function () {
      this.$emit('amount-value', this.amount, this.flow)
    },
  },
  computed: {
    ...mapGetters('auth', ['walletValue']),
    placeholder() {
      return this.flow === 'from' ? 'You Send' : 'You Receive'
    },
  },
}
</script>

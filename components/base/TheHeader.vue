<template>
  <div class="flex space-between full-width bottom-half-margin">
    <div class="flex center-items bold-500">
      <nuxt-link
        :to="{ name: 'home' }"
        class="flex center-items color-aquamarine cursor-pointer"
      >
        <base-icon
          color="aquamarine"
          size="32"
          icon-path="general/home"
        ></base-icon>
        <span class="fl1">&nbsp; &nbsp; Home</span>
      </nuxt-link>
    </div>
    <span v-if="address" class="button">{{ address }}</span>
    <button v-else class="button" @click="connectWallet">
      <base-icon color="nero" size="32" icon-path="general/wallet"></base-icon
      >&nbsp; &nbsp;Connect Wallet
    </button>
  </div>
</template>

<script>
import { chainsId } from '~/assets/js/constants'
import { mapActions } from 'vuex'
import Web3 from 'web3'
export default {
  data() {
    return {
      address: '',
    }
  },
  methods: {
    ...mapActions('auth', ['setWallet']),
    async connectWallet() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.send('eth_requestAccounts')
          //   const instance = new Web3(Web3.givenProvider)
          const instance = new Web3(window.ethereum)
          // Get necessary info on your node
          const networkId = await instance.eth.net.getId()
          this.address = await instance.eth.getCoinbase()
          const balance = await instance.eth.getBalance(this.address)
          let wallet = {
            networkId: networkId,
            address: this.address,
            balance: instance.utils.fromWei(balance, 'ether'),
            currency: chainsId.find((c) => c.id == networkId).token,
          }
          this.setWallet(wallet)
        } catch (error) {
          this.$toast.error('User denied web3 access')
          return
        }
      } else {
        this.$toast.error('No web3 provider detected')
      }
    },
  },
}
</script>

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
    <div class="flex">
      <span v-if="walletConnected" class="button right-margin">{{
        error ? error : address
      }}</span>
      <button class="button" @click="connectWallet(true)">
        <base-icon color="nero" size="32" icon-path="general/wallet"></base-icon
        >&nbsp; &nbsp;{{ address ? 'Disconnect Wallet' : 'Connect Wallet' }}
      </button>
    </div>
  </div>
</template>

<script>
import { chainsId } from '~/assets/js/constants'
import { mapActions, mapGetters } from 'vuex'
import Web3 from 'web3'
export default {
  data() {
    return {
      address: '',
      error: '',
      walletConnected: false,
    }
  },
  computed: {
    ...mapGetters('general', ['fromNetworkValue']),
  },
  watch: {
    fromNetworkValue: {
      handler() {
        this.connectWallet()
      },
      deep: true,
    },
  },
  mounted() {
    ethereum.on('accountsChanged', () => this.connectWallet())
    ethereum.on('chainChanged', () => this.connectWallet())
  },
  methods: {
    ...mapActions('auth', ['setWallet']),
    async connectWallet(click = false) {
      this.error = ''
      let wallet = {
        networkId: '',
        address: '',
      }
      if (typeof window.ethereum !== 'undefined') {
        try {
          if (click) {
            if (this.address) {
              this.setWallet(wallet)
              this.address = ''
              return
            } else {
              await window.ethereum.send('eth_requestAccounts')
            }
          }
          const instance = new Web3(window.ethereum)

          const networkId = await instance.eth.net.getId()
          if (
            !chainsId.find((c) => c.id == networkId) ||
            networkId !== this.fromNetworkValue.id
          ) {
            this.error = 'Wrong Network'
            return
          }
          this.address = await instance.eth.getCoinbase()

          wallet = {
            networkId: networkId,
            address: this.address,
          }
          this.walletConnected = true

          this.setWallet(wallet)
        } catch (error) {
          return
        }
      } else {
        this.$toast.error('No web3 provider detected')
      }
    },
  },
}
</script>

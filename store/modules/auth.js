export const namespaced = true

export const state = () => ({
  wallet: {
    networkId: '',
    address: '',
    balance: '',
    currency: '',
  },
})

export const mutations = {
  SET_WALLET(state, wallet) {
    state.wallet = wallet
  },
}

export const actions = {
  setWallet({ commit }, wallet) {
    commit('SET_WALLET', wallet)
  },
}

export const getters = {
  walletValue: (state) => state.wallet,
}

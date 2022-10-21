export const namespaced = true

export const state = () => ({
  fromNetwork: {},
  balance: {
    symbol: '',
    value: '',
  },
})

export const mutations = {
  SET_FROM_NETWORK(state, fromNetwork) {
    state.fromNetwork = fromNetwork
  },
  SET_BALANCE(state, balance) {
    state.balance = balance
  },
}

export const actions = {
  setFromNetwork({ commit }, fromNetwork) {
    commit('SET_FROM_NETWORK', fromNetwork)
  },
  setBalance({ commit }, balance) {
    commit('SET_BALANCE', balance)
  },
}

export const getters = {
  fromNetworkValue: (state) => state.fromNetwork,
  balanceValue: (state) => state.balance,
}

export const namespaced = true

export const state = () => ({
  fromNetwork: {},
})

export const mutations = {
  SET_FROM_NETWORK(state, fromNetwork) {
    state.fromNetwork = fromNetwork
  },
}

export const actions = {
  setFromNetwork({ commit }, fromNetwork) {
    commit('SET_FROM_NETWORK', fromNetwork)
  },
}

export const getters = {
  fromNetworkValue: (state) => state.fromNetwork,
}

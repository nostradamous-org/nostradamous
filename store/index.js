import vuex from 'vuex'
import * as modules from './modules'

const createStore = () => {
  return new vuex.Store({
    modules: {
      auth: modules.auth,
      general: modules.general,
    },
  })
}

export default createStore

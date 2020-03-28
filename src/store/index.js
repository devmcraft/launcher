import Vue from 'vue'
import Vuex from 'vuex'
import { createPersistedState, createSharedMutations } from "vuex-electron"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    minecraft: {
      status: "",
      progress: 0,
      username: "",
      password: "",
      min: 1000,
      max: 2000,
      minecraftStarted: false,
      isMojang: false,
      autoconnect: false,
      logShow: false,
      opts: {}
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    minecraft({ minecraft }) {
      return minecraft;
    }
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
})

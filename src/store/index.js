import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    FAT: null, // FAT结合位示图
  },
  mutations: {
    changeFAT (state, x, y, data) {
      state.FAT[x][y] = {...data};
    },
  },
  actions: {
  },
  modules: {
  }
})

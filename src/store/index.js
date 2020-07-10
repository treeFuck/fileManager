import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    FAT: null, // FAT结合位示图
    FATLen_x: 10, // FAT行数
    FATLen_y: 10, // FAT列数
    root: null, // 根目录,
    nowDir: null // 当前所在目录
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

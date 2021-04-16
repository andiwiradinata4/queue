import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const authenticated = false;
// const headers = { Accept: "application/json" };

export default new Vuex.Store({
  state: {
    count: 0,
    authenticated: false
  },
  mutations: {
    setIncrement(state) {
      state.count++;
    },
    setAuthenticate(state) {
      state.authenticated = !state.authenticated;
    }
  },
  actions: {
    setIncrement(state) {
      state.commit("setIncrement");
    },
    setAuthenticate(state) {
      state.commit("setAuthenticate", state);
    }
  },
  modules: {},
  getters: {
    getCount: (state) => state.count,
    getAuthenticate: state => state.authenticated
  }
});

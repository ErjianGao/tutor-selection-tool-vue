import Vue from "vue";
import Vuex from "vuex";
import * as types from "@/store/types";

Vue.use(Vuex);

const myState = {
  isCollapse: false
};

const myMutations = {
  [types.SWITCH_COLLAPSE](state) {
    state.isCollapse = !state.isCollapse;
  }
};

const myActions = {
  async [types.SWITCH_COLLAPSE]({ commit }) {
    commit(types.SWITCH_COLLAPSE);
  }
};

export const appModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

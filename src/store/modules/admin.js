import vue from "vue";
import vuex from "vuex";

vue.use(vuex);

const myState = {};

const myMutations = {};

const myActions = {};

export const adminModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  acttions: myActions
};

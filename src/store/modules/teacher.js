import vue from "vue";
import vuex from "vuex";

vue.use(vuex);

const myState = {
  courses: [],
  students: []
};

const myMutations = {};

const myActions = {};

export const teacherModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  acttions: myActions
};

import vue from "vue";
import vuex from "vuex";
import { GET_TEACHERS, UPDATE_TEACHERS } from "@/store/types";
import axios from "axios";

vue.use(vuex);

const myState = {
  teachers: []
};

const myMutations = {
  [UPDATE_TEACHERS](state, data) {
    state.teachers = data;
  }
};

const myActions = {
  async [GET_TEACHERS]({ commit }, data) {
    let resp = await axios.get("/student/teachers");
    console.log("teachers: ", resp.data);
    commit(UPDATE_TEACHERS, resp.data);
  }
};

export const adminModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

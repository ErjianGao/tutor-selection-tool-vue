import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import { GET_DIRECTIONS, UPDATE_DIRECTIONS } from "@/store/types";

vue.use(vuex);

const myState = {
  student_directions: [],
  teacher: null
};

const myMutations = {
  [UPDATE_DIRECTIONS](state, data) {
    state.student_directions = data;
  }
};

const myActions = {
  async [GET_DIRECTIONS]({ commit }) {
    let resp = await axios.get("/api/student/profile");
    console.log(resp);
    commit(UPDATE_DIRECTIONS, resp.data.directions());
  }
};

export const studentModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  acttions: myActions
};

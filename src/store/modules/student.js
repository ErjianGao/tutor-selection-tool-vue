import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import {
  GET_DIRECTIONS,
  GET_STUDENT_DIRECTIONS,
  UPDATE_DIRECTIONS,
  UPDATE_STUDENT_DIRECTIONS
} from "@/store/types";

vue.use(vuex);

const myState = {
  directions: [],
  student_directions: [],
  teacher: null
};

const myMutations = {
  [UPDATE_STUDENT_DIRECTIONS](state, data) {
    state.student_directions = data;
  },
  [UPDATE_DIRECTIONS](state, data) {
    state.directions = data;
  }
};

const myActions = {
  // async [GET_STUDENT_DIRECTIONS]({ commit }) {
  //   let resp = await axios.get("/api/student/profile");
  //   console.log(resp);
  //   commit(UPDATE_DIRECTIONS, resp.data.directions());
  // },

  async [GET_DIRECTIONS]({ commit }) {
    let resp = await axios.get("directions");
    console.log("directions: ", resp.data);
    commit(UPDATE_DIRECTIONS, resp.data);
  }
};

export const studentModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

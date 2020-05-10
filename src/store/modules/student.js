import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import {
  ADD_DIRECTION,
  GET_DIRECTIONS,
  GET_STUDENT_DIRECTIONS,
  UPDATE_DIRECTIONS,
  UPDATE_STUDENT_DIRECTIONS
} from "@/store/types";

vue.use(vuex);

const myState = {
  directions: [],
  studentDirections: [],
  teacher: null
};

const myMutations = {
  [UPDATE_STUDENT_DIRECTIONS](state, data) {
    state.studentDirections = data;
    console.log("studentDirections: ", state.studentDirections);
  },
  [UPDATE_DIRECTIONS](state, data) {
    state.directions = data;
    console.log("muta directions: ", state.directions);
  },
  [ADD_DIRECTION](state, data) {
    state.directions.push(data);
  }
};

const myActions = {
  async [GET_STUDENT_DIRECTIONS]({ commit }) {
    let resp = await axios.get("student/directions");
    console.log("student dir", resp.data);
    commit(UPDATE_STUDENT_DIRECTIONS, resp.data);
  },

  async [UPDATE_STUDENT_DIRECTIONS]({ commit }, data) {
    console.log(data);
    let resp = await axios.patch("student/directions", data);
    console.log(resp);
    commit(UPDATE_STUDENT_DIRECTIONS, resp.data.directions);
  },

  async [GET_DIRECTIONS]({ commit }) {
    let resp = await axios.get("directions");
    console.log("directions: ", resp.data);
    commit(UPDATE_DIRECTIONS, resp.data);
  },

  async [ADD_DIRECTION]({ commit }, data) {
    let resp = await axios.post("teacher/directions", data);
    console.log("add direction: ", resp.data);
    commit(UPDATE_DIRECTIONS, resp.data);
  }
};

export const studentModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

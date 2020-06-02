import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import {
  ADD_DIRECTION,
  ADD_SELECTED_TEACHER,
  GET_ALL_COURSES,
  GET_DIRECTIONS,
  GET_SELECTED_TEACHER,
  GET_STUDENT_DIRECTIONS,
  UPDATE_ALL_COURSES,
  UPDATE_DIRECTIONS,
  UPDATE_SELECTED_STUDENTS,
  UPDATE_SELECTED_TEACHER,
  UPDATE_STUDENT_DIRECTIONS
} from "@/store/types";

vue.use(vuex);

const myState = {
  directions: [],
  studentDirections: [],
  selectedTeacher: undefined,
  allCourses: []
};

const myMutations = {
  [UPDATE_STUDENT_DIRECTIONS](myState, data) {
    myState.studentDirections = data;
    console.log("studentDirections: ", myState.studentDirections);
  },
  [UPDATE_DIRECTIONS](myState, data) {
    myState.directions = data;
    console.log("muta directions: ", myState.directions);
  },
  [ADD_DIRECTION](myState, data) {
    myState.directions.push(data);
  },
  [UPDATE_SELECTED_TEACHER](myState, data) {
    myState.selectedTeacher = data;
  },
  [UPDATE_ALL_COURSES](myState, data) {
    myState.allCourses = data;
  }
};

const myActions = {
  async [GET_STUDENT_DIRECTIONS]({ commit }, data) {
    let resp = await axios.get(`student/${data}/directions`);
    console.log("student dir", resp.data);
    commit(UPDATE_STUDENT_DIRECTIONS, resp.data);
  },

  async [UPDATE_STUDENT_DIRECTIONS]({ commit }, data) {
    console.log(data);
    let resp = await axios.patch("student/directions", data);
    console.log("update student directions: ", resp.data);
    commit(UPDATE_STUDENT_DIRECTIONS, resp.data);
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
  },

  async [GET_SELECTED_TEACHER]({ commit }, data) {
    let resp = await axios.get("student/profile");
    commit(UPDATE_SELECTED_TEACHER, resp.data.teacher);
  },

  async [ADD_SELECTED_TEACHER]({ commit }, data) {
    let resp = await axios.patch(`student/teachers/${data.tid}`);
    commit(UPDATE_SELECTED_TEACHER, resp.data.teacher);
  },

  async [GET_ALL_COURSES]({ commit }) {
    let resp = await axios.get("courses");
    commit(UPDATE_ALL_COURSES, resp.data);
  }
};

export const studentModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

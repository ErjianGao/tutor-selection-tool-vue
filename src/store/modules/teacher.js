import vue from "vue";
import vuex from "vuex";
import {
  GET_COURSES,
  GET_STUDENTS,
  UPDATE_COURSES,
  UPDATE_STUDENTS
} from "@/store/types";
import axios from "axios";

vue.use(vuex);

const myState = {
  courses: [],
  students: []
};

const myMutations = {
  [UPDATE_STUDENTS](state, data) {
    state.students = data;
    console.log("students: ", state.students);
  },
  [UPDATE_COURSES](state, data) {
    state.courses = data;
    console.log("courses: ", state.courses);
  }
};

const myActions = {
  async [GET_STUDENTS]({ commit }, data) {
    let resp = await axios.get("teacher/students");
    commit(UPDATE_STUDENTS, resp.data);
  },

  // 获取老师选择的课程信息
  async [GET_COURSES]({ commit }, data) {
    console.log("id: ", data.id);
    let resp = await axios.get(`teacher/${data.id}/courses`);
    commit(UPDATE_COURSES, resp.data);
  }
};

export const teacherModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

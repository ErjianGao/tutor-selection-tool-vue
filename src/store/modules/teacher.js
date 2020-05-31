import store from "@/store";
import vue from "vue";
import vuex from "vuex";
import {
  ADD_COURSE,
  ADD_ELECTIVES,
  ADD_SELECTED_STUDENT,
  ADD_STUDENT,
  ADD_STUDENTS,
  ADMIN_NAMESPACE,
  DELETE_COURSE,
  DELETE_SELECTED_STUDENT,
  DELETE_STUDENT,
  GET_COURSES,
  GET_SELECTED_STUDENTS,
  GET_STUDENTS,
  GET_TEACHER_INFO,
  GET_TEACHERS,
  TEACHER_NAMESPACE,
  UPDATE_COURSE,
  UPDATE_COURSES,
  UPDATE_SELECTED_STUDENTS,
  UPDATE_STUDENTS,
  UPDATE_TEACHER_INFO
} from "@/store/types";
import axios from "axios";

vue.use(vuex);

const myState = {
  courses: [],
  students: [],
  selectedStudents: [],
  minRanking: null,
  maxStudentNumber: null
};

const myMutations = {
  [UPDATE_STUDENTS](state, data) {
    myState.students = data;
    console.log("students: ", myState.students);
  },
  [UPDATE_COURSES](myState, data) {
    myState.courses = data;
    console.log("courses: ", myState.courses);
  },
  [UPDATE_SELECTED_STUDENTS](myState, data) {
    myState.selectedStudents = data;
    console.log("selectedStudents: ", myState.selectedStudents);
  },
  [UPDATE_TEACHER_INFO](state, data) {
    myState.minRanking = data.minRanking;
    myState.maxStudentNumber = data.maxStudentNumber;
  }
};

const myActions = {
  // 获取老师选择的课程信息
  async [GET_COURSES]({ commit }, data) {
    console.log("id: ", data.id);
    let resp = await axios.get(`teacher/${data.id}/courses`);
    commit(UPDATE_COURSES, resp.data);
  },

  async [ADD_COURSE]({ commit }, data) {
    console.log("add course: ", data);
    let resp = await axios.post("teacher/courses", data);
    // let courses = state.courses;
    // courses.push(resp.data);
    // commit(UPDATE_COURSES, courses);
  },

  async [GET_TEACHER_INFO]({ commit }, data) {
    let resp = await axios.get(`profile/teachers/${data}`);
    commit(UPDATE_TEACHER_INFO, resp.data);
  },

  async [UPDATE_TEACHER_INFO]({ commit }, data) {
    let resp = await axios.patch(
      `teacher/requirements/minRanking/${data.minRanking}/maxStudentNumber/${data.maxStudentNumber}`
    );
    commit(UPDATE_TEACHER_INFO, resp.data);
  },

  async [UPDATE_COURSE]({ commit }, data) {
    console.log(data);
    console.log("update course: ", data);
    let resp = await axios.patch("teacher/courses", data);
  },

  async [DELETE_COURSE]({ commit }, data) {
    console.log(data);
    console.log("delete course: ", data);
    let resp = await axios.delete(`teacher/courses/${data}`);
  },

  async [GET_STUDENTS]({ commit }, data) {
    let resp = await axios.get("teacher/students");
    commit(UPDATE_STUDENTS, resp.data);
  },

  async [GET_SELECTED_STUDENTS]({ commit }, data) {
    let resp = await axios.get("teacher/selectedstudents");
    commit(UPDATE_SELECTED_STUDENTS, resp.data);
  },

  async [ADD_SELECTED_STUDENT]({ commit }, data) {
    console.log("sid: ", data);
    let resp = await axios.put(`teacher/students/${data}`);
    await store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
  },

  async [DELETE_SELECTED_STUDENT]({ commit }, data) {
    console.log("sid: ", data);
    let resp = await axios.delete(`teacher/selectedstudents/${data}`);
    await store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
    await store.dispatch(ADMIN_NAMESPACE + "/" + GET_TEACHERS);
  },

  async [DELETE_STUDENT]({ commit }, data) {
    let resp = await axios.delete(`teacher/students/${data}`);
    await store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
  },

  // async [ADD_STUDENT]({ commit }, data) {
  //   let resp = await axios.post(
  //     `teacher/courses/${data.cid}/student/${data.grade}`,
  //     data.student
  //   );
  // },

  // async [ADD_STUDENTS]({ commit }, data) {
  //   let resp = await axios.post(
  //     `teacher/courses/${data.cid}/students`,
  //     data.students
  //   );
  //   await store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
  // },

  async [ADD_ELECTIVES]({ commit }, data) {
    let resp = await axios.post("teacher/students", data);
    await store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
  }
};

export const teacherModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

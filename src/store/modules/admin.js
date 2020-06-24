import vue from "vue";
import vuex from "vuex";
import store from "@/store";
import {
  ADD_TEACHER,
  ADMIN_NAMESPACE,
  DELETE_TEAHCER,
  GET_SELECTED_TEACHER,
  GET_TEACHERS,
  STUDENT_NAMESPACE,
  UPDATE_TEACHERS
} from "@/store/types";
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
  async [GET_TEACHERS]({ commit }) {
    let resp = await axios.get("/student/teachers");
    console.log("teachers: ", resp.data);
    commit(UPDATE_TEACHERS, resp.data);
  },

  async [ADD_TEACHER]({ commit }, data) {
    let resp = await axios.post("/admin/teachers", data);
    await store.dispatch(ADMIN_NAMESPACE + "/" + GET_TEACHERS);
  },

  async [DELETE_TEAHCER]({ commit }, data) {
    let resp = await axios.delete(`/admin/teachers/${data}`);
    await store.dispatch(ADMIN_NAMESPACE + "/" + GET_TEACHERS);
    await store.dispatch(STUDENT_NAMESPACE + "/" + GET_SELECTED_TEACHER);
  }
};

export const adminModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

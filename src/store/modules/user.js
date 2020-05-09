import Vue from "vue";
import Vuex from "vuex";
import * as types from "@/store/types";
import * as consts from "@/util/consts";
import axios from "@/util/axios";
import { STUDENT_ROLE, TEACHER_ROLE, ADMIN_ROLE, ROLE } from "@/util/consts";

Vue.use(Vuex);

function decodeRole(roleKey) {
  switch (roleKey) {
    case STUDENT_ROLE:
      return "student";
    case TEACHER_ROLE:
      return "teacher";
    case ADMIN_ROLE:
      return "admin";
  }
}

const myState = {
  // user
  id: null,
  name: null,
  identityNo: null,
  role: null,
  isLogin: false
};

const myMutations = {
  [types.LOGIN](state, data) {
    state.isLogin = data;
  },
  [types.UPDATE_ID](state, data) {
    state.id = data;
  },
  [types.UPDATE_ROLE](state, data) {
    state.role = data;
  },
  [types.UPDATE_NAME](state, data) {
    state.name = data;
  },
  [types.UPDATE_IDENTITY_NO](state, data) {
    state.identityNo = data;
  },
  [types.UPDATE_DIRECTIONS](state, data) {
    state.directions = data;
  }
};

const myActions = {
  async [types.LOGIN]({ commit }, data) {
    console.log("准备登陆");
    let resp = await axios.post("login", data);

    // 登录成功则resp不为null
    if (resp != null) {
      // 身份信息存入session storage
      sessionStorage.setItem(
        consts.AUTHORIZATION,
        resp.headers[consts.AUTHORIZATION]
      );
      let role = resp.data;
      console.log("login role: ", role);
      sessionStorage.setItem(ROLE, role);
      commit(types.LOGIN, true);
    }
  },

  async [types.UPDATE_USER]({ commit }) {
    let resp = await axios.get("profile");
    console.log("user: ", resp.data);

    commit(types.UPDATE_ID, resp.data.id);
    commit(types.UPDATE_NAME, resp.data.name);
    commit(types.UPDATE_IDENTITY_NO, resp.data.identityNo);
    commit(types.UPDATE_ROLE, decodeRole(sessionStorage.getItem(ROLE)));
  },

  async [types.UPDATE_PASSWORD]({ commit }, data) {
    let resp = await axios.patch("/settings/password", data);
    console.log(resp.data);
  },

  async [types.LOGOUT]({ commit }) {
    commit(types.UPDATE_NAME, null);
    commit(types.UPDATE_IDENTITY_NO, null);
    commit(types.UPDATE_ROLE, null);
    commit(types.LOGIN, false);
  }
};

export const userModule = {
  namespaced: true,
  state: myState,
  mutations: myMutations,
  actions: myActions
};

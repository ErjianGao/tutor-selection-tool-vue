import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";

import { appModule } from "@/store/modules/app";
import { userModule } from "@/store/modules/user";
import { permissionModule } from "@/store/modules/permission";

Vue.use(Vuex);

const modules = {
  appModule: appModule,
  userModule: userModule,
  permissionModule: permissionModule
};

const store = new Vuex.Store({
  modules,
  getters
});

export default store;

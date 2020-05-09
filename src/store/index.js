import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";

import { appModule } from "@/store/modules/app";
import { userModule } from "@/store/modules/user";
import { permissionModule } from "@/store/modules/permission";
import { studentModule } from "@/store/modules/student";

Vue.use(Vuex);

const modules = {
  app: appModule,
  user: userModule,
  student: studentModule,
  permission: permissionModule
};

const store = new Vuex.Store({
  modules,
  getters
});

export default store;

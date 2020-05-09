import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";

import { appModule } from "@/store/modules/app";
import { userModule } from "@/store/modules/user";
import { permissionModule } from "@/store/modules/permission";
import { studentModule } from "@/store/modules/student";
import { adminModule } from "@/store/modules/admin";
import { teacherModule } from "@/store/modules/teacher";

Vue.use(Vuex);

const modules = {
  app: appModule,
  user: userModule,
  student: studentModule,
  teacher: teacherModule,
  admin: adminModule,
  permission: permissionModule
};

const store = new Vuex.Store({
  modules,
  getters
});

export default store;

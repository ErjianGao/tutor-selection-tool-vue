import Vue from "vue";
import Vuex from "vuex";
// import { adminModule } from "@/store/modules/admin";
// import { appModule } from "@/store/modules/app";
// import { teacherModule } from "@/store/modules/teacher";
import { userModule } from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // adminModule: adminModule,
    // appModule: appModule,
    // teacherModule: teacherModule,
    userModule: userModule
  }
});

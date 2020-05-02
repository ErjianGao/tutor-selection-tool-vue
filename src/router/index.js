import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },

  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/index/index.vue")
      }
    ]
  },

  {
    path: "*",
    redirect: "/login"
  }
];

const adminRouter = [
  {
    path: "/admin/"
    // component: () => import("@/views/admin/index.vue")
  }
];
const teacherRouter = [
  {
    path: "/teacher/"
    // component: () => import("@/views/teacher/index.vue")
  }
];
const studentRouter = [
  {
    path: "/student/"
    // component: () => import("@/views/student/index.vue")
  }
];

const adminRole = "E#*st#7sjAiUH4XXok8#EoA*9L$LrhxO";
const teacherRole = "Ol#gusunkVLGxAJXrIuWkQ3Pj04K!02d";
const studentRole = "fRDM4ozFX@w4QvOGbPAQq$I6x4MlVYCu";

// 暴露该方法，登录后，有vuex调用，通知更新路由信息
export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case adminRole:
      router.addRoutes(adminRouter);
      router.push("/home");
      break;
    case teacherRole:
      // 添加路由
      router.addRoutes(teacherRouter);
      break;
    case studentRole:
      router.addRoutes(studentRouter);
      break;
  }
}

const router = new VueRouter({
  routes
});

export default router;
updateRoutes();

import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(Router);

// 路由表，不需要权限
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },

  {
    path: "/404",
    component: () => import("@/views/error-page/404")
  }
];

// //实例化vue的时候只挂载constantRouter
// export default new Router({
//   routes: constantRouterMap
// });

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: "/",
    name: "rootPath",
    component: Layout,
    meta: { roles: ["student", "teacher", "admin"] },
    children: [
      {
        path: "home",
        meta: { roles: ["student", "teacher", "admin"] },

        component: () => import("@/views/home/index.vue")
      },

      {
        path: "settings",
        meta: { roles: ["student", "teacher", "admin"] },

        component: () => import("@/views/settings/index.vue")
      },

      {
        path: "directions",
        component: () => import("@/views/table/DirectionTable")
      },

      {
        path: "teachers",
        meta: { roles: ["student", "admin"] },

        component: () => import("@/views/table/TeacherTable")
      },

      {
        path: "students/allStudents",
        meta: { roles: ["teacher", "admin"] },

        component: () => import("@/views/table/StudentTable")
      },

      {
        path: "students/selectedStudents",
        meta: { roles: ["teacher"] },

        component: () => import("@/views/table/SelectedStudentTable")
      },

      {
        path: "courses",
        meta: { roles: ["teacher"] },
        component: () => import("@/views/table/CourseTable")
      }
    ]
  },

  {
    path: "*",
    redirect: "/404"
  }
];

const createRouter = () =>
  new Router({
    routes: constantRouterMap
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  // reset router
  router.matcher = newRouter.matcher;
}

export default router;

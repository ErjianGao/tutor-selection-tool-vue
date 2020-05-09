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
    path: "/logout"
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
    component: Layout,
    meta: { roles: ["teacher", "student", "admin"] },
    children: [
      {
        path: "home",
        meta: { roles: ["teacher", "student", "admin"] },
        component: () => import("@/views/home/index.vue")
      },

      {
        path: "settings",
        meta: { roles: ["teacher", "student", "admin"] },
        component: () => import("@/views/settings/index.vue")
      },

      {
        path: "directions",
        component: () => import("@/views/table/DirectionTable")
      },

      {
        path: "teachers",
        meta: { roles: ["admin"] },
        component: () => import("@/views/table/TeacherTable")
      },

      {
        path: "students",
        meta: { roles: ["admin", "teacher"] },
        component: () => import("@/views/table/StudentTable")
      },

      {
        path: "courses",
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
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

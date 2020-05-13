<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#ffffff"
    text-color="#000000"
    active-text-color="rgb(123, 48, 221)"
    router
  >
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item
      v-if="role === 'admin' || role === 'teacher'"
      index="/directions"
    >
      <i class="el-icon-s-promotion"></i>
      <span slot="title">学生方向</span>
    </el-menu-item>

    <el-menu-item v-if="role === 'teacher'" index="/courses">
      <i class="el-icon-s-order"></i>
      <span slot="title">课程列表</span>
    </el-menu-item>

    <el-menu-item v-if="role === 'admin'" index="/students">
      <i class="el-icon-s-order"></i>
      <span slot="title">学生列表</span>
    </el-menu-item>

    <el-submenu v-if="role === 'teacher'" index="/students">
      <template slot="title">
        <i class="el-icon-school"></i>
        <span slot="title">学生列表</span>
      </template>

      <el-menu-item class="submenu-item" index="/students/allStudents">
        所有学生
      </el-menu-item>
      <el-menu-item class="submenu-item" index="/students/selectedStudents">
        已选学生
      </el-menu-item>
    </el-submenu>

    <el-menu-item
      v-if="role === 'student' || role === 'admin'"
      index="/teachers"
    >
      <i class="el-icon-s-custom"></i>
      <span slot="title">教师列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import { APP_NAMESPACE, USER_NAMESPACE } from "@/store/types";
export default {
  name: "Sidebar",

  data: () => ({
    breads: []
  }),
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
    // handleMenuSelect(index, indexPath) {
    //   this.breads = indexPath;
    //   this.$emit("switch", this.breads);
    // }
  },
  computed: {
    ...mapState(APP_NAMESPACE, ["isCollapse"]),
    ...mapState(USER_NAMESPACE, ["role"])
  }
};
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 230px;
}

.el-menu-item:hover {
  background: #ccccff75 !important;
}

.el-submenu,
.el-menu-item {
  text-align: left;
  font-size: 17px !important;
}

>>> .el-submenu__title {
  font-size: 17px !important;
}

>>> .el-submenu__title:hover {
  background: #ccccff75 !important;
}

.submenu-item {
  padding-left: 50px !important;
  min-width: 0 !important;
}
</style>

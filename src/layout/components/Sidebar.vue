<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#ffffff"
    text-color="#000000"
    active-text-color="#9393fc"
    @select="handleMenuSelect"
  >
    <el-menu-item index="首页">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="课程列表">
      <i class="el-icon-s-order"></i>
      <span slot="title">课程列表</span>
    </el-menu-item>

    <el-submenu index="学生列表">
      <template slot="title">
        <i class="el-icon-school"></i>
        <span slot="title">学生列表</span>
      </template>

      <el-menu-item class="submenu-item" index="所有学生">
        所有学生
      </el-menu-item>
      <el-menu-item class="submenu-item" index="已选学生">
        已选学生
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="教师列表">
      <i class="el-icon-s-custom"></i>
      <span slot="title">教师列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { APP_NAMESPACE } from "@/store/types";
const { mapState } = createNamespacedHelpers(APP_NAMESPACE);
export default {
  name: "Sidebar",

  data: () => ({
    breads: []
  }),
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuSelect(index, indexPath) {
      this.breads = indexPath;
      this.$emit("switch", this.breads);
    }
  },
  computed: {
    ...mapState(["isCollapse"])
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

<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#66b1ff"
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

      <el-menu-item index="所有学生">所有学生</el-menu-item>
      <el-menu-item index="已选学生">已选学生</el-menu-item>
    </el-submenu>

    <el-menu-item index="教师列表">
      <i class="el-icon-s-custom"></i>
      <span slot="title">教师列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
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

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
}
</style>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    active-text-color="#9393fc"
    @select="handleSelect"
  >
    <el-menu-item index="1">基本信息</el-menu-item>
    <el-menu-item index="2">密码修改</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data: () => ({
    activeIndex: "1"
  }),
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
/* .el-menu.el-menu--horizontal {
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.164) !important;
} */

.el-menu-item:hover {
  background: none !important;
}
</style>

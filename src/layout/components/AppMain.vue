<template>
  <el-main>
    Main
    <router-view />
  </el-main>
</template>

<script>
export default {
  name: "AppMain"
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>

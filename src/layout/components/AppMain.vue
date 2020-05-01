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
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.164);
}
</style>

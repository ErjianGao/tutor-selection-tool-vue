<template>
  <el-main>
    <router-view :key="$route.fullPath" />
  </el-main>
</template>

<script>
export default {
  name: "AppMain"
};
</script>

<style scoped>
.el-main {
  background-color: #ccccff54;
  color: #333;
  text-align: center;
  box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.164);
}
</style>

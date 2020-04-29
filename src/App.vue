<template>
  <div id="app">
    <router-view id="router" :key="$route.path"></router-view>
    <alertdialog></alertdialog>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {
    alertdialog: () => import("@/components/AlterDialog.vue")
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

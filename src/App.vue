<template>
  <div id="app">
    <router-view />
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
  font-family: "Roboto", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app,
.el-container {
  height: 100%;
}

button {
  border: 0px;
  text-decoration: none;
  outline: none;
}

button:hover {
  cursor: pointer;
}
</style>

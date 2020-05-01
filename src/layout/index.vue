<template>
  <div class="app-wrapper">
    <el-container class="app-container" direction="vertical">
      <Header />
      <el-container>
        <Sidebar />
        <el-container direction="vertical">
          <AppMain />
          <Footer />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Sidebar, Header, AppMain, Footer } from "./components/";
export default {
  components: {
    Sidebar,
    Header,
    AppMain,
    Footer
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: rgb(211, 47, 47);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.app-wrapper {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

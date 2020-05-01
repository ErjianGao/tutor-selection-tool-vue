<template>
  <div class="app-wrapper">
    <el-container class="app-container" direction="horizontal">
      <Sidebar @switch="getPath" />
      <el-container direction="vertical">
        <Header :breads="breads" />
        <AppMain />
        <Footer />
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
  },
  data: () => ({
    breads: []
  }),
  methods: {
    getPath(breads) {
      this.breads = breads;
      // console.log(this.breads);
    }
  }
};
</script>

<style>
.app-wrapper {
  height: 100%;
}
</style>

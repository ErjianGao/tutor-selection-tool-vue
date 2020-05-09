<template>
  <div class="app-wrapper">
    <el-container class="app-container" direction="vertical">
      <el-container direction="horizontal">
        <Sidebar @switch="getPath" />
        <el-container direction="vertical">
          <Header :breads="breads" />
          <AppMain />
        </el-container>
      </el-container>
      <Footer />
    </el-container>
  </div>
</template>

<script>
import Sidebar from "@/layout/components/Sidebar";
import Header from "@/layout/components/Header";
import AppMain from "@/layout/components/AppMain";
import Footer from "@/layout/components/Footer";

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

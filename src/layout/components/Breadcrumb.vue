<template>
  <el-breadcrumb separator="/">
    <template v-for="(list, index) in breads">
      <el-breadcrumb-item :key="index">
        {{ list }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["breads"],
  data: () => ({
    pageLocation: "首页"
  })
};
</script>

<style scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 18px;
  line-height: 50px;
  padding: 5px;
  margin-left: 20px;
}

.el-breadcrumb-item {
  border: 1px solid #dcdfe6;
  border-radius: 10px;
}

.el-breadcrumb >>> .el-breadcrumb__inner a,
.el-breadcrumb >>> .el-breadcrumb__inner.is-link {
  font-size: 21px;
  font-weight: 540;
}

.el-breadcrumb >>> .el-breadcrumb__inner a:hover,
.el-breadcrumb >>> .el-breadcrumb__inner.is-link:hover {
  color: rgb(123, 48, 221);
}
</style>

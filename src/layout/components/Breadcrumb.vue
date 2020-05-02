<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <template v-for="(list, index) in breads">
      <el-breadcrumb-item v-if="!(list === '首页')" :key="index">
        {{ list }}
      </el-breadcrumb-item>
    </template>

    <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
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
  font-size: 17px;
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
  font-size: 20px;
  font-weight: 540;
}

.el-breadcrumb >>> .el-breadcrumb__inner a:hover,
.el-breadcrumb >>> .el-breadcrumb__inner.is-link:hover {
  color: rgb(123, 48, 221);
}
</style>

<template>
  <el-row :gutter="36">
    <el-col :span="16">
      <el-card class="box-card" shadow="hover">
        <el-image :src="require('@/assets/img/system-logo.png')"></el-image>
        <h1 class="title">欢迎使用毕业设计导师选择系统!</h1>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>项目信息</span>
        </div>
        <p>
          制作者：高尔健
          <br />
          <a href="">后端微服务仓库链接</a>
          <br />
          <a href="">前端Vue仓库链接</a>
          <br />
        </p>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
* {
  font-size: 1.05em !important;
  text-align: left;
  line-height: 2em;
}

.box-card {
  text-align: center;
  padding-bottom: 20px;
}

.title {
  text-align: center;
  font-size: 30px !important;
  font-weight: 500;
}
</style>

<template>
  <el-footer height="28px">
    <div class="box">
      <div class="top">
        <el-tooltip
          class="item"
          effect="dark"
          content="刷新页面"
          placement="top-end"
        >
          <button class="button-icon">
            <i class="el-icon-refresh" />
          </button>
        </el-tooltip>
      </div>
    </div>
  </el-footer>
</template>

<style scoped>
.box {
  margin-left: auto;
}

.el-footer {
  background-color: #1d2935;
  color: #ffffff;
  text-align: center;
  padding: 2px 4px;
}
</style>

<style scoped>
.el-footer {
  display: flex;
}

.button-icon {
  margin-right: 10px;
  background-color: transparent;
}
i {
  color: white;
  font-size: 16px;
}

.top {
  text-align: center;
}

.left {
  float: left;
  width: 60px;
}

.right {
  float: right;
  width: 60px;
}

.bottom {
  clear: both;
  text-align: center;
}

.item {
  margin: 4px;
}

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}
</style>

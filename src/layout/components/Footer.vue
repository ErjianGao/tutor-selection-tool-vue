<template>
  <el-footer id="footer" height="28px">
    <div class="link-box">
      <a href="https://github.com/ErjianGao">
        <i class="iconfont icon-GitHub"></i>
      </a>
    </div>

    <span>
      <b>Location.href:</b>
      {{ url }}
    </span>

    <div class="time">{{ date }}</div>

    <div class="box">
      <div class="top">
        <el-tooltip
          class="item"
          effect="dark"
          content="刷新页面"
          placement="top-end"
        >
          <button class="button-icon" type="button" @click="reload">
            <i class="el-icon-refresh" />
          </button>
        </el-tooltip>
      </div>
    </div>
  </el-footer>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
export default {
  data: () => ({
    date: new Date()
  }),
  methods: {
    reload() {
      window.location.reload();
    }
  },
  mounted: function() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      //设置定时器，每秒执行一次function函数，
      //函数是获取当前时间并给date变量赋值(每秒赋值一次)
      _this.date = new Date().toString().substr(0, 24); //修改数据date
    }, 1000);
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer); //在Vue实例销毁前，清除定时器
    }
  },
  computed: {
    url() {
      console.log(window.location.href);

      return window.location.href;
    }
  }
};
</script>

<style scoped>
.el-footer {
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  flex-direction: row;
  background-color: #1d2935;
  color: #ffffff;
  padding: 6px 4px;
}
.link-box:hover {
  color: #000000;
}

.icon-GitHub {
  font-size: 13px;
  margin: 0 10px;
}

.el-footer {
  display: flex;
}

.button-icon {
  margin-right: 10px;
  background-color: transparent;
}

.time {
  margin-left: auto;
  margin-right: 15px;
}

i {
  color: white;
  font-size: 16px;
}

i:hover {
  color: #c4c4ff;
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

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}
</style>

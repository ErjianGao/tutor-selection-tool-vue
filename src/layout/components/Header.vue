<template>
  <el-header height="60px">
    <button class="switch-button" @click="switchCollapse">
      <i :class="`${this.icon}`" />
    </button>
    <Breadcrumb :breads="breads" />

    <div class="full-screen-button-container">
      <div class="bottom">
        <el-tooltip
          class="item"
          effect="dark"
          content="全屏"
          placement="bottom-end"
        >
          <button class="full-screen-button" type="button" @click="buttoncli">
            <i class="el-icon-full-screen" />
          </button>
        </el-tooltip>
      </div>
    </div>

    <el-dropdown class="dropdown-container avator">
      <span class="el-dropdown-link">
        <div class="avator-container">
          <el-avatar
            shape="square"
            :src="require('@/assets/img/defaut_avatar.gif')"
          ></el-avatar>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script>
import screenfull from "screenfull";
import { SWITCH_COLLAPSE } from "@/store/types.js";
import { mapState } from "vuex";
import Breadcrumb from "./Breadcrumb";

export default {
  name: "Header",
  props: ["breads"],
  components: {
    Breadcrumb
  },
  data: () => ({
    icon: "el-icon-s-fold",
    isFullscreen: false
  }),
  methods: {
    switchCollapse() {
      this.$store.dispatch(SWITCH_COLLAPSE).then(() => {
        if (this.isCollapse == true) {
          this.icon = "el-icon-s-unfold";
        } else {
          this.icon = "el-icon-s-fold";
        }
      });
    },
    buttoncli() {
      if (!screenfull.enabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: "不支持全屏",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen == true) {
        this.$message({
          message: "全屏啦",
          type: "success"
        });
      }
    }
  },

  computed: {
    ...mapState(["isCollapse"])
  }
};
</script>

<style scoped>
.el-header {
  background-color: #ccccff9d;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  /* border-bottom: 1.5px solid #dcdfe6; */
}

.switch-button {
  font-size: 30px;
  background: transparent;
  color: rgb(123, 48, 221);
}

.full-screen-button-container {
  margin-left: auto;
}

.full-screen-button {
  font-size: 30px;
  padding: 10px;
  background: transparent;
}

.dropdown-container:hover .el-avatar--square {
  /* margin-left: auto; */
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.164) !important;
  transform: scale(1.2);
}
.avator-container {
  padding: 10px;
}

.el-avatar--square {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.164) !important;
  transition-duration: 200ms;
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

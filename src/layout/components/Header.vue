<template>
  <el-header height="60px">
    <button class="switch-button" @click="switchCollapse">
      <i :class="`${this.icon}`" />
    </button>
    <Breadcrumb :breads="breads" />
    <el-dropdown class="dropdown-container">
      <span class="el-dropdown-link">
        <div class="avator-container">
          <el-avatar
            shape="square"
            src="https://lh3.googleusercontent.com/proxy/KwQih1SQWBdtlqM6QSdAzcjW6heSV-eUSWrysLuSxRzCHUyn2EF-ETj7LlvIHYxSPYg2yWyYAtyTbdl42VT32KtJ"
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
import { SWITCH_COLLAPSE } from "@/store/type.js";
import { mapState } from "vuex";
import Breadcrumb from "./Breadcrumb";
export default {
  name: "Header",
  props: ["breads"],
  components: {
    Breadcrumb
  },
  data: () => ({
    icon: "el-icon-s-fold"
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

.dropdown-container {
  margin-left: auto;
}

.avator-container {
  padding: 10px;
}

.el-avatar--square {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.164) !important;
}
</style>

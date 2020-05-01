<template>
  <el-header height="60px">
    <el-button
      class="switch-button"
      type="text"
      :icon="`${this.icon}`"
      @click="switchCollapse"
      :v-loading="`${this.isCollapse}`"
    ></el-button>
    <Breadcrumb :breads="breads" />
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
  background-color: #e9eff8;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  border-bottom: 1.5px solid #dcdfe6;
}

.switch-button {
  font-size: 30px;
}
</style>

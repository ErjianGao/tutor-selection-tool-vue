<template>
  <el-header>
    <el-button
      class="switch-button"
      type="text"
      :icon="`${this.icon}`"
      @click="switchCollapse"
      :v-loading="`${this.isCollapse}`"
    ></el-button>
  </el-header>
</template>

<script>
import { SWITCH_COLLAPSE } from "@/store/type.js";
import { mapState } from "vuex";
export default {
  name: "Header",
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
  display: flex;
}

.switch-button {
  font-size: 30px;
}
</style>

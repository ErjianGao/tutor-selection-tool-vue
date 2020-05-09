<template>
  <el-tabs active-name="first">
    <el-tab-pane label="基本信息" name="first">
      <ChangeInfo :studentDirections="this.studentDirections"></ChangeInfo>
    </el-tab-pane>
    <el-tab-pane label="密码修改" name="second">
      <ChangePassword></ChangePassword>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ChangeInfo from "@/views/settings/components/ChangeInfo";
import ChangePassword from "@/views/settings/components/ChangePassword";
export default {
  name: "NavMenu",
  props: ["studentDirections"],
  components: {
    ChangeInfo,
    ChangePassword
  },
  data: () => ({}),
  methods: {}
};
</script>

<style scoped>
.el-menu-item:hover {
  background: none !important;
}
</style>

<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-table :data="this.teachers" style="width: 100%" :fit="true">
          <el-table-column prop="identityNo" label="工号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column
            prop="maxStudentNumber"
            label="最大可接受学生数"
          ></el-table-column>
          <el-table-column prop="minRanking" label="排名限制"></el-table-column>
          <el-table-column prop="insertTime" label="插入时间"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import { ADMIN_NAMESPACE, GET_TEACHERS } from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(ADMIN_NAMESPACE + "/" + GET_TEACHERS);
  },

  computed: {
    ...mapState(ADMIN_NAMESPACE, ["teachers"])
  }
};
</script>

<style scoped></style>

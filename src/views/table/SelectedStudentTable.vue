<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table
            :data="this.selectedStudents"
            style="width: 100%"
            :fit="true"
          >
            <el-table-column prop="identityNo" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column
              prop="teacher.name"
              label="已选导师"
            ></el-table-column>
            <el-table-column
              prop="insertTime"
              label="插入时间"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_SELECTED_STUDENTS, TEACHER_NAMESPACE } from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_SELECTED_STUDENTS);
  },

  computed: {
    ...mapState(TEACHER_NAMESPACE, ["selectedStudents"])
  }
};
</script>

<style scoped>
.buttons {
  margin-bottom: 15px !important;
}

.buttons .iconfont {
  font-size: 1.6em;
}
</style>

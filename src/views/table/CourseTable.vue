<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-table :data="this.courses" style="width: 100%" :fit="true">
          <el-table-column prop="teacher.name" label="导师"></el-table-column>
          <el-table-column prop="name" label="课程名称"></el-table-column>
          <el-table-column prop="cutOffMark" label="最低分数"></el-table-column>
          <el-table-column prop="weight" label="权值"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import { GET_COURSES, TEACHER_NAMESPACE, USER_NAMESPACE } from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES, {
      id: this.id
    });
  },

  computed: {
    ...mapState(TEACHER_NAMESPACE, ["courses"]),
    ...mapState(USER_NAMESPACE, ["id"])
  }
};
</script>

<style scoped></style>

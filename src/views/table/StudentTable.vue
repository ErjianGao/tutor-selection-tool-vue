<template>
  <div>
    <el-row class="buttons">
      <el-col :span="1">
        <el-tooltip
          class="item"
          effect="light"
          content="导入学生"
          placement="top"
        >
          <el-link :underline="false" alt="123">
            <i class="iconfont icon-tubiao106"></i>
          </el-link>
        </el-tooltip>
      </el-col>
      <el-col :span="2">
        <el-tooltip
          class="item"
          effect="light"
          content="下载模板"
          placement="top"
        >
          <el-link :underline="false" alt="123">
            <i class="iconfont icon-xiazaimoban"></i>
          </el-link>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table :data="this.students" style="width: 100%" :fit="true">
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
import { GET_STUDENTS, TEACHER_NAMESPACE } from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
  },

  computed: {
    ...mapState(TEACHER_NAMESPACE, ["students"])
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

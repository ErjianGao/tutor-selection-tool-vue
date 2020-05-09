<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-table :data="this.directions" style="width: 100%" :fit="true">
          <el-table-column prop="name" label="可选方向"></el-table-column>
          <el-table-column prop="insertTime" label="插入时间"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import {
  GET_DIRECTIONS,
  STUDENT_NAMESPACE,
  USER_NAMESPACE
} from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_DIRECTIONS);
  },

  computed: {
    ...mapState(USER_NAMESPACE, ["directions"])
  }
};
</script>

<style scoped></style>

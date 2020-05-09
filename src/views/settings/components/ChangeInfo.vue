<template>
  <el-form ref="infoForm" label-width="80px">
    <el-form-item label="姓名">
      <el-input :value="name" disabled></el-input>
    </el-form-item>

    <el-form-item v-if="role === 'student'" label="学号">
      <el-input :value="identityNo" disabled></el-input>
    </el-form-item>
    <el-form-item v-if="role === 'teacher'" label="工号">
      <el-input :value="identityNo" disabled></el-input>
    </el-form-item>
    <el-form-item v-if="role === 'admin'" label="用户名">
      <el-input :value="identityNo" disabled></el-input>
    </el-form-item>

    <el-form-item v-if="role === 'student'" label="方向">
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="this.studentDirections" size="small">
          <el-checkbox-button
            v-for="direction in directions"
            :label="direction"
            :key="direction"
          >
            {{ direction }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </el-form-item>

    <el-form-item class="submit-button">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  GET_DIRECTIONS,
  GET_STUDENT_DIRECTIONS,
  STUDENT_NAMESPACE,
  UPDATE_STUDENT_DIRECTIONS
} from "@/store/types";

export default {
  name: "ChangeInfo",
  async created() {
    console.log(1);

    // 获取所有的可选方向
    await this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_DIRECTIONS);
    await this.$store.dispatch(
      STUDENT_NAMESPACE + "/" + GET_STUDENT_DIRECTIONS
    );
  },
  data: () => ({
    // CheckboxGroup: this.studentDirections
  }),
  methods: {
    async submitForm(infoForm) {
      await this.$store.dispatch(
        STUDENT_NAMESPACE + "/" + UPDATE_STUDENT_DIRECTIONS,
        {
          directions: this.CheckboxGroup
        }
      );
    }
  },
  computed: {
    ...mapGetters(["name", "identityNo", "role"]),

    ...mapState(STUDENT_NAMESPACE, ["directions", "studentDirections"])
  }
};
</script>

<style scoped>
.el-form {
  margin: 30px 50px 30px 30px;
}
</style>

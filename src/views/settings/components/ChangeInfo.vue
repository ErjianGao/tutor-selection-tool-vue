<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input :value="name" disabled></el-input>
    </el-form-item>
    <el-form-item label="ID号">
      <el-input :value="identityNo" disabled></el-input>
    </el-form-item>
    <el-form-item label="方向">
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup" size="small">
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
import { mapGetters } from "vuex";
import {
  GET_DIRECTIONS,
  UPDATE_DIRECTIONS,
  USER_NAMESPACE
} from "@/store/types";

export default {
  name: "ChangeInfo",
  async created() {
    await this.$store.dispatch(
      USER_NAMESPACE + "/" + GET_DIRECTIONS,
      UPDATE_DIRECTIONS
    );
  },
  data: () => ({
    CheckboxGroup: this.student_directions
  }),
  computed: {
    ...mapGetters(["name", "identityNo", "student_directions", "directions"])
  }
};
</script>

<style scoped>
.el-form {
  margin: 30px 50px 30px 30px;
}
</style>

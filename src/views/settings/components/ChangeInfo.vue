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
      <div>
        <el-checkbox-group v-model="CheckboxGroup" size="small">
          <el-checkbox-button
            v-for="direction in this.directions"
            :label="direction.name"
            :key="direction.name"
          >
            {{ direction.name }}
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
  props: ["studentDirections"],
  async created() {
    // 获取所有的可选方向
    await this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_DIRECTIONS);
    console.log(this.studentDirections);
  },
  data() {
    return {
      // 注意这里接收父组件传递给子组件的值，这是如果对组件进行双向绑定
      // ，并且对传递给子组件的值进行修改的话，不会对父组件造成影响，并且vue会进行报错，
      // 此时应该换一个变量，对新的变量进行更改
      CheckboxGroup: this.studentDirections
    };
  },
  methods: {
    async submitForm(infoForm) {
      try {
        await this.$store.dispatch(
          STUDENT_NAMESPACE + "/" + UPDATE_STUDENT_DIRECTIONS,
          {
            id: this.id,
            directions: this.CheckboxGroup
          }
        );
      } catch (e) {
        this.$message.error("修改失败");
      }
      this.$message.success("修改成功");
    }
  },
  computed: {
    ...mapGetters(["id", "name", "identityNo", "role"]),

    ...mapState(STUDENT_NAMESPACE, ["directions"])
  }
};
</script>

<style scoped>
.el-form {
  margin: 30px 50px 30px 30px;
}
</style>

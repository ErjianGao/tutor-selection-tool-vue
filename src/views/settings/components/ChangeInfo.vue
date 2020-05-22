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

    <el-form-item v-if="role === 'teacher'" label="最低排名">
      <el-input :value="minRanking"></el-input>
    </el-form-item>
    <el-form-item v-if="role === 'teacher'" label="人数上限">
      <el-input :value="maxStudentNumber"></el-input>
    </el-form-item>

    <!--    多选框写法-->
    <!--    <el-form-item v-if="role === 'student'" label="方向">-->
    <!--      <div>-->
    <!--        <el-checkbox-group v-model="CheckboxGroup" size="small">-->
    <!--          <el-checkbox-button-->
    <!--            v-for="direction in this.directions"-->
    <!--            :label="direction.name"-->
    <!--            :key="direction.name"-->
    <!--          >-->
    <!--            {{ direction.name }}-->
    <!--          </el-checkbox-button>-->
    <!--        </el-checkbox-group>-->
    <!--      </div>-->
    <!--    </el-form-item>-->

    <!--    可创建条目的选择器用于方向选择-->
    <el-form-item v-if="role === 'student'" label="方向">
      <el-select
        v-model="selectedDirections"
        multiple
        filterable
        allow-create
        placeholder="请选择方向标签"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-if="role === 'student'" class="submit-button">
      <el-button type="primary" @click="submitForm('infoForm')">提交</el-button>
    </el-form-item>
    <el-form-item v-if="role === 'teacher'" class="submit-button">
      <el-button type="primary" @click="submitTeacherInfo('infoForm')">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  GET_DIRECTIONS,
  GET_STUDENT_DIRECTIONS,
  GET_TEACHER_INFO,
  STUDENT_NAMESPACE,
  TEACHER_NAMESPACE,
  UPDATE_STUDENT_DIRECTIONS,
  UPDATE_TEACHER_INFO
} from "@/store/types";
import store from "@/store";

export default {
  name: "ChangeInfo",

  async created() {
    await this.$store.dispatch(
      TEACHER_NAMESPACE + "/" + GET_TEACHER_INFO,
      this.id
    );
    await this.$store.dispatch(
      STUDENT_NAMESPACE + "/" + GET_STUDENT_DIRECTIONS,
      this.id
    );
    //
    this.selectedDirections = this.studentDirections.map(d => d.name);
    // console.log("change info: ", this.studentDirections);
  },

  data() {
    // // 获取所有的可选方向

    return {
      // 注意这里接收父组件传递给子组件的值，这是如果对组件进行双向绑定
      // ，并且对传递给子组件的值进行修改的话，不会对父组件造成影响，并且vue会进行报错，
      // 此时应该换一个变量，对新的变量进行更改
      CheckboxGroup: this.studentDirections,
      // 学生可选择的方向
      options: [
        {
          value: "web前端开发",
          label: "web前端开发"
        },
        {
          value: "web后端开发",
          label: "web后端开发"
        },
        {
          value: "flutter移动开发",
          label: "flutter移动开发"
        },
        {
          value: "大数据开发",
          label: "大数据开发"
        },
        {
          value: "机器学习",
          label: "机器学习"
        }
      ],
      selectedDirections: null
    };
  },
  methods: {
    async submitForm(infoForm) {
      try {
        await this.$store.dispatch(
          STUDENT_NAMESPACE + "/" + UPDATE_STUDENT_DIRECTIONS,
          this.selectedDirections.map(item => {
            return {
              name: item
            };
          })
        );
      } catch (e) {
        this.$message.error("修改失败");
      }
      this.$message.success("修改成功");
      window.location.reload();
    },

    submitTeacherInfo(infoForm) {
      this.$store
        .dispatch(
          TEACHER_NAMESPACE + "/" + UPDATE_TEACHER_INFO,
          this.selectedDirections.map(item => {
            return {
              name: item
            };
          })
        )
        .then(() => {
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    }
  },
  computed: {
    ...mapGetters(["id", "name", "identityNo", "role"]),
    ...mapState(STUDENT_NAMESPACE, ["studentDirections"]),
    ...mapState(TEACHER_NAMESPACE, ["minRanking", "maxStudentNumber"])
  }
};
</script>

<style scoped>
.el-form {
  margin: 30px 50px 30px 30px;
}

.el-select {
  width: 100%;
}
</style>

<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-table
          :row-class-name="tableRowClassName"
          :data="this.teachers"
          style="width: 100%"
          :fit="true"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="教师姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所选课程">
                  <el-button
                    @click="handleCoursesDrawer(props.$index, props.row)"
                  >
                    点击异步查询教师所选课程及权重分配
                  </el-button>
                  <el-drawer
                    title="标题"
                    :withHeader="false"
                    :visible.sync="courseDrawerVisible"
                    :direction="direction"
                    size="45%"
                  >
                    <h3>
                      <i class="iconfont icon-kecheng"></i>
                      教师所选课程及权重分配
                    </h3>
                    <el-table :data="courses" style="width: 100%" :fit="true">
                      <el-table-column
                        prop="teacher.name"
                        label="导师"
                      ></el-table-column>
                      <el-table-column
                        prop="name"
                        label="课程名称"
                      ></el-table-column>
                      <el-table-column
                        prop="cutOffMark"
                        label="最低分数"
                      ></el-table-column>
                      <el-table-column
                        prop="weight"
                        label="权值"
                      ></el-table-column>
                    </el-table>
                  </el-drawer>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="identityNo" label="工号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column
            prop="maxStudentNumber"
            label="最大可接受学生数"
          ></el-table-column>
          <el-table-column prop="minRanking" label="排名限制"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                v-if="
                  selectedTeacher !== undefined &&
                    selectedTeacher.name === scope.row.name
                "
                @onConfirm="handleDeleteSelect(scope.$index, scope.row)"
                trigger="hover"
                title="您确定取消选择该老师吗？"
              >
                <el-button size="mini" type="success" slot="reference" disabled>
                  互 选 成 功
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                v-else
                @onConfirm="handleSelect(scope.$index, scope.row)"
                trigger="hover"
                title="您确定选择该老师吗？"
              >
                <el-button
                  size="mini"
                  type="success"
                  slot="reference"
                  :disabled="handleDisable"
                >
                  选 中 导 师
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";
import {
  ADMIN_NAMESPACE,
  DELETE_SELECTED_STUDENT,
  GET_ALL_COURSES,
  GET_COURSES,
  GET_SELECTED_TEACHER,
  GET_TEACHERS,
  STUDENT_NAMESPACE,
  TEACHER_NAMESPACE,
  USER_NAMESPACE
} from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(ADMIN_NAMESPACE + "/" + GET_TEACHERS);
    await this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_SELECTED_TEACHER);
    await this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_ALL_COURSES);
  },

  data() {
    return {
      direction: "rtl",
      courseDrawerVisible: false
    };
  },

  methods: {
    handleSelect(index, row) {},

    tableRowClassName({ row, rowIndex }) {
      if (
        this.selectedTeacher !== undefined &&
        this.selectedTeacher.name === row.name
      ) {
        return "success-row";
      }
      return "";
    },

    handleDeleteSelect(index, row) {
      this.$store
        .dispatch(TEACHER_NAMESPACE + "/" + DELETE_SELECTED_STUDENT, this.id)
        .then(() => {
          this.$message.success("成功取消互选");
        })
        .catch(() => {
          this.$message.error("取消失败");
        });
    },

    async handleCoursesDrawer(index, row) {
      this.courseDrawerVisible = true;
      await this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES, {
        id: row.id
      });
    }
  },

  computed: {
    handleDisable() {
      console.log(this.selectedTeacher);
      if (this.selectedTeacher !== undefined) {
        return true;
      } else return false;
    },

    ...mapState(USER_NAMESPACE, ["id"]),
    ...mapState(ADMIN_NAMESPACE, ["teachers"]),
    ...mapState(STUDENT_NAMESPACE, ["selectedTeacher"]),
    ...mapState(TEACHER_NAMESPACE, ["courses"])
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand >>> label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand >>> .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}

.el-table >>> .success-row {
  background: #f0f9eb;
}

.el-drawer {
  text-align: center;
}

.el-drawer .el-table {
  padding: 0 50px;
}
.el-drawer h3 {
  margin: 20px;
  color: #606266;
  font-size: 1.5em;
  text-align: center;
}

.el-drawer i {
  font-size: 1.2em;
}
</style>

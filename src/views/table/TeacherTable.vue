<template>
  <div>
    <el-row v-if="role === 'admin'" class="buttons">
      <el-col :span="1">
        <el-tooltip
          class="item"
          effect="light"
          content="增加课程"
          placement="top"
        >
          <el-link
            :underline="false"
            @click="addTeacherDialogFormVisible = true"
          >
            <i class="iconfont icon-jia"></i>
          </el-link>
        </el-tooltip>
      </el-col>

      <el-dialog
        width="40%"
        title="添加教师"
        :visible.sync="addTeacherDialogFormVisible"
      >
        <el-form
          :model="teacherForm"
          :rules="rules"
          ref="teacherForm"
          label-position="left"
        >
          <el-form-item label="教师姓名" prop="name" :label-width="'80px'">
            <el-input v-model="teacherForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="教师工号"
            prop="identityNo"
            :label-width="'80px'"
          >
            <el-input
              v-model.number="teacherForm.identityNo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="dialog-buttons">
            <el-button type="primary" @click="addTeacher('teacherForm')">
              确 定
            </el-button>
            <el-button @click="resetForm('teacherForm')">重 置</el-button>
            <el-button @click="addTeacherDialogFormVisible = false">
              取 消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
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
            <el-table-column
              prop="minRanking"
              label="排名限制"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  v-if="
                    selectedTeacher !== undefined &&
                      selectedTeacher.name === scope.row.name &&
                      role === 'student'
                  "
                  @onConfirm="handleDeleteSelect(scope.$index, scope.row)"
                  trigger="hover"
                  title="您确定取消选择该老师吗？"
                >
                  <el-button
                    size="mini"
                    type="success"
                    slot="reference"
                    disabled
                  >
                    互 选 成 功
                  </el-button>
                </el-popconfirm>
                <el-popconfirm
                  v-else-if="role === 'student'"
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
                <el-popconfirm
                  v-if="role === 'admin'"
                  @onConfirm="handleDelete(scope.$index, scope.row)"
                  trigger="hover"
                  title="删除老师的同时会将老师导入的学生同时删除，您确定删除老师吗？"
                >
                  <el-button size="mini" type="danger" slot="reference">
                    删 除
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  ADD_COURSE,
  ADD_SELECTED_TEACHER,
  ADD_TEACHER,
  ADMIN_NAMESPACE,
  DELETE_SELECTED_STUDENT,
  DELETE_TEAHCER,
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
      teacherForm: {
        name: null,
        identityNo: null
      },
      Teacher: false,
      direction: "rtl",
      rules: {
        name: [
          { required: true, message: "教师名称不能为空", trigger: "blur" }
        ],
        identityNo: [
          { required: true, message: "工号不能为空", trigger: "blur" }
        ]
      },
      courseDrawerVisible: false,
      addTeacherDialogFormVisible: false
    };
  },

  methods: {
    addTeacher(teacherForm) {
      let _this = this;
      this.$refs[teacherForm].validate(valid => {
        if (valid) {
          this.$store
            .dispatch(ADMIN_NAMESPACE + "/" + ADD_TEACHER, {
              name: _this.teacherForm.name,
              identityNo: _this.teacherForm.identityNo
            })
            .then(() => {
              this.$message.success("添加成功");
              _this.addTeacherDialogFormVisible = false;
            });
        } else {
          this.$message.error("请按正确的格式填写哦");
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleDelete(index, row) {
      this.$store
        .dispatch(ADMIN_NAMESPACE + "/" + DELETE_TEAHCER, row.id)
        .then(() => {
          this.$message.success("删除成功");
        });
    },

    handleSelect(index, row) {
      this.$store.dispatch(STUDENT_NAMESPACE + "/" + ADD_SELECTED_TEACHER, {
        tid: row.id
      });
    },

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

    handleCoursesDrawer(index, row) {
      this.courseDrawerVisible = true;
      this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES, {
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

    ...mapState(USER_NAMESPACE, ["id", "role"]),
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

.buttons {
  margin-bottom: 15px !important;
}

.buttons .iconfont {
  font-size: 1.6em;
}

>>> .el-dialog {
  border-radius: 10px;
  text-align: center;
}

.dialog-buttons {
  text-align: center;
}

.el-button {
  margin-right: 5px;
}
</style>

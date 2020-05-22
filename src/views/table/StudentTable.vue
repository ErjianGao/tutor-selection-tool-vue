<template>
  <div>
    <el-row class="buttons">
      <el-col :span="1">
        <el-tooltip
          class="item"
          effect="light"
          content="导入学生信息"
          placement="top"
        >
          <el-link @click="addStudentVisible = true" :underline="false">
            <i class="iconfont icon-tubiao106"></i>
          </el-link>
        </el-tooltip>
      </el-col>

      <el-dialog
        width="40%"
        title="请指定课程导入"
        :visible.sync="addStudentVisible"
      >
        <el-table :data="this.courses" style="width: 100%" :fit="true">
          1
          <el-table-column prop="name" label="课程名称"></el-table-column>
          <el-table-column width="180" label="操作">
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                action=""
                :auto-upload="false"
                :on-exceed="fileExceed"
                :limit="1"
                :file-list="fileList"
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                :on-change="
                  (file, fileList) => {
                    return importStudents(file, fileList, scope.row);
                  }
                "
              >
                <el-button
                  v-loading.fullscreen.lock="fullscreenLoading"
                  size="small"
                  type="primary"
                >
                  导 入
                </el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <el-col :span="2">
        <el-tooltip
          class="item"
          effect="light"
          content="下载课程成绩模板"
          placement="top"
        >
          <el-link @click="downloadTemplate" :underline="false" alt="123">
            <i class="iconfont icon-xiazaimoban"></i>
          </el-link>
        </el-tooltip>
      </el-col>
      <el-col :span="20"></el-col>

      <el-col :span="1" :offset="18">
        <el-tooltip
          class="item"
          effect="light"
          content="批量删除"
          placement="top"
        >
          <el-link @click="clickDeleteAll" :underline="false">
            <i class="iconfont icon-shanchu"></i>
          </el-link>
        </el-tooltip>
      </el-col>
      <el-dialog title="警告" :visible.sync="deleteVisible" width="30%">
        <span>您确定要删除所选学生吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            type="primary"
            @click="deleteStudents"
          >
            确 定
          </el-button>
        </span>
      </el-dialog>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :data="this.students"
            style="width: 100%"
            :fit="true"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="学号">
                    <span>{{ props.row.identityNo }}</span>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="插入时间">
                    <span>{{ props.row.insertTime }}</span>
                  </el-form-item>
                  <el-form-item label="毕设方向">
                    <el-button @click="getDirections(props.$index, props.row)">
                      点击异步获取方向
                    </el-button>
                    <el-tag
                      v-for="(item, index) in studentDirections"
                      :key="index"
                      type=""
                      effect="light"
                    >
                      {{ item.name }}
                    </el-tag>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="identityNo" label="学号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column
              prop="teacher.name"
              label="已选导师"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  @onConfirm="handleDelete(scope.$index, scope.row)"
                  trigger="hover"
                  title="您确定删除学生吗？"
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
import { mapGetters, mapState } from "vuex";
import {
  ADD_ELECTIVES,
  ADD_STUDENT,
  ADD_STUDENTS,
  DELETE_STUDENT,
  GET_COURSES,
  GET_STUDENT_DIRECTIONS,
  GET_STUDENTS,
  STUDENT_NAMESPACE,
  TEACHER_NAMESPACE,
  USER_NAMESPACE
} from "@/store/types";
import { readSutdentsFile } from "@/util/excelHandler.js";

export default {
  created() {
    this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS);
    this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES, {
      id: this.id
    });
  },

  data() {
    return {
      addStudentVisible: false,
      deleteVisible: false,
      fileList: [],
      multipleSelection: [],
      fullscreenLoading: false,
      directions: []
    };
  },

  methods: {
    downloadTemplate() {
      window.open("./file/课程成绩单模板.xls");
    },

    handleDelete(index, row) {
      this.$store
        .dispatch(TEACHER_NAMESPACE + "/" + DELETE_STUDENT, row.id)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 500);
          this.$message.success("删除成功");
        });
    },

    fileExceed() {
      this.$message.error("别贪心！一次只能上传一个哦~");
    },

    importStudents(file, fileList, row) {
      this.fullscreenLoading = true;
      console.log(file);
      readSutdentsFile(file.raw).then(async data => {
        console.log(data);
        let electives = [];
        data.forEach(student => {
          electives.push({
            course: {
              id: row.id
            },
            grade: student.score,
            student: {
              name: student.name,
              identityNo: student.number
            }
          });
        });

        this.$store
          .dispatch(TEACHER_NAMESPACE + "/" + ADD_ELECTIVES, electives)
          .then(() => {
            this.$message.success("导入成功");
            this.addStudentVisible = false;
            this.fullscreenLoading = false;
          })
          .catch(() => {
            this.$message.error("导入失败");
            this.addStudentVisible = false;
            this.fullscreenLoading = false;
          });
        // let students = [];
        // data.forEach(student => {
        //   console.log(student);
        //   students.push({
        //     identityNo: student.number,
        //     name: student.name,
        //     electives: [
        //       {
        //         course: {
        //           id: row.id
        //         },
        //         grade: student.score
        //       }
        //     ]
        //   });
        // });
        // console.log(students);
        // this.$store
        //   .dispatch(TEACHER_NAMESPACE + "/" + ADD_STUDENTS, {
        //     cid: row.id,
        //     students: students
        //   })
        //   .then(() => {
        //     this.$message.success("导入成功");
        //     this.addStudentVisible = false;
        //     this.fullscreenLoading = false;
        //   })
        //   .catch(() => {
        //     this.$message.error("导入失败");
        //     this.addStudentVisible = false;
        //     this.fullscreenLoading = false;
        //   });

        // for (let i = 0; i < data.length; i++) {
        //   await this.$store.dispatch(TEACHER_NAMESPACE + "/" + ADD_STUDENTS, {
        //     cid: row.id,
        //     grade: data[i].score,
        //     student: {
        //       identityNo: data[i].number,
        //       name: data[i].name
        //     }
        //   });
        // }
      });
    },

    async deleteStudents() {
      this.deleteVisible = false;
      this.fullscreenLoading = true;
      let length = this.multipleSelection.length;

      for (let i = 0; i < length; i++) {
        await this.$store.dispatch(
          TEACHER_NAMESPACE + "/" + DELETE_STUDENT,
          this.multipleSelection[i].id
        );
      }
      this.$message.success("删除成功");
      window.location.reload();
      this.fullscreenLoading = false;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    clickDeleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("您还没有选择");
      } else {
        this.deleteVisible = true;
      }
    },

    getDirections(index, row) {
      console.log(row);
      this.$store.dispatch(
        STUDENT_NAMESPACE + "/" + GET_STUDENT_DIRECTIONS,
        row.id
      );
    }
  },

  computed: {
    ...mapState(USER_NAMESPACE, ["role", "name", "identityNo", "id"]),
    ...mapState(TEACHER_NAMESPACE, ["students", "courses"]),
    ...mapState(STUDENT_NAMESPACE, ["studentDirections"])
  }
};
</script>

<style scoped>
.buttons {
  margin-bottom: 15px !important;
}

>>> .el-dialog {
  border-radius: 10px;
  text-align: center;
}

.buttons .iconfont {
  font-size: 1.6em;
}

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
  width: 50%;
}
</style>

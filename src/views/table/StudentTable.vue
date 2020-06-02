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
          <!--          :data="
              students.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "-->
          <el-table
            ref="multipleTable"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            :row-key="rowKey"
            :data="
              students.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            :fit="true"
            @sort-change="sort_change"
            :default-sort="{ prop: 'identityNo', order: 'ascending' }"
          >
            <el-table-column type="index"></el-table-column>
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
                    <el-tag
                      v-for="(item, index) in studentDirections(props.row.id)"
                      :key="index"
                      type=""
                      effect="light"
                    >
                      {{ item }}
                    </el-tag>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="55"
            ></el-table-column>
            <el-table-column
              sortable="custom"
              prop="identityNo"
              label="学号"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column
              prop="teacher.name"
              label="已选导师"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  v-if="
                    scope.row.teacher !== undefined &&
                      scope.row.teacher.name === name
                  "
                  @onConfirm="handleDeleteSelect(scope.$index, scope.row)"
                  trigger="hover"
                  title="您确定取消选中该学生吗？"
                >
                  <el-button size="mini" type="warning" slot="reference">
                    取 消 选 择
                  </el-button>
                </el-popconfirm>
                <el-popconfirm
                  v-else
                  @onConfirm="handleSelect(scope.$index, scope.row)"
                  trigger="hover"
                  title="您确定选择该学生吗？"
                >
                  <el-button size="mini" type="success" slot="reference">
                    提 前 选 择
                  </el-button>
                </el-popconfirm>
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
          <div style="text-align: center;margin-top: 30px;">
            <el-pagination
              background
              layout="prev, pager, next, sizes, total, jumper"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              :total="students.length"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  ADD_ELECTIVES,
  ADD_SELECTED_STUDENT,
  ADD_STUDENT,
  ADD_STUDENTS,
  DELETE_SELECTED_STUDENT,
  DELETE_STUDENT,
  GET_COURSES,
  GET_DIRECTIONS,
  GET_STUDENT_DIRECTIONS,
  GET_STUDENTS,
  STUDENT_NAMESPACE,
  TEACHER_NAMESPACE,
  USER_NAMESPACE
} from "@/store/types";
import { readSutdentsFile } from "@/util/excelHandler.js";

export default {
  created() {
    this.$store
      .dispatch(TEACHER_NAMESPACE + "/" + GET_STUDENTS, {
        tid: this.id
      })
      .then(() => {
        this.sort_change({ prop: "identityNo", order: "ascending" });
      });
    this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES, {
      id: this.id
    });
    this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_DIRECTIONS);
  },

  data() {
    return {
      addStudentVisible: false,
      deleteVisible: false,
      fileList: [],
      multipleSelection: [],
      fullscreenLoading: false,
      total: null,
      pageSize: 10,
      currentPage: 1
    };
  },

  methods: {
    // ------------排序------------
    sortFunction(attr, rev) {
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev === undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (rev === 1) {
          return a - b;
        } else {
          return b - a;
        }
      };
    },

    sort_change(column) {
      //column是个形参，就是前面说的info，你叫什么都可以
      console.log(column);
      // this.currentPage = 1; // return to the first page after sorting
      if (column.prop === "identityNo") {
        this.students.sort(
          this.sortFunction(column.prop, column.order === "ascending")
        );
        console.log(this.students);
      }
      // this.showedData = this.students.slice(0, this.pageSize); // 排序完显示到第一页
      console.log("Finished");
    },

    rowKey(row) {
      return row.id;
    },

    // ------------分页------------
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      console.log("current page ", this.currentPage);
    },

    handleSizeChange(psize) {
      console.log("page size: ", psize);
      this.pageSize = psize;
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.teacher !== undefined && row.teacher.name === this.name) {
        return "success-row";
      }
      return "";
    },

    downloadTemplate() {
      window.open("./file/课程成绩单模板.xls");
    },

    // 删除导入学生
    handleDelete(index, row) {
      let _this = this;
      this.$store
        .dispatch(TEACHER_NAMESPACE + "/" + DELETE_STUDENT, {
          sid: row.id,
          tid: _this.id
        })
        .then(() => {
          this.$message.success("删除成功");
        });
    },

    handleSelect(index, row) {
      this.$store
        .dispatch(TEACHER_NAMESPACE + "/" + ADD_SELECTED_STUDENT, {
          sid: row.id,
          tid: this.id
        })
        .then(() => {
          this.$message.success("选择成功");
        })
        .catch(e => {
          this.$message.error("互选失败");
        });
    },

    handleDeleteSelect(index, row) {
      this.$store
        .dispatch(TEACHER_NAMESPACE + "/" + DELETE_SELECTED_STUDENT, {
          sid: row.id,
          tid: this.id
        })
        .then(() => {
          this.$message.success("成功取消互选");
        })
        .catch(() => {
          this.$message.error("取消失败");
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
          .dispatch(TEACHER_NAMESPACE + "/" + ADD_ELECTIVES, {
            electives: electives,
            tid: this.id
          })
          .then(() => {
            this.$message.success("导入成功");
            this.fileList = [];
            this.addStudentVisible = false;
            this.fullscreenLoading = false;
          })
          .catch(() => {
            this.$message.error("导入失败");
            this.fileList = [];
            this.addStudentVisible = false;
            this.fullscreenLoading = false;
          });
      });
    },

    async deleteStudents() {
      this.deleteVisible = false;
      this.fullscreenLoading = true;
      let length = this.multipleSelection.length;
      console.log(length);

      for (let i = 0; i < length; i++) {
        await this.$store.dispatch(TEACHER_NAMESPACE + "/" + DELETE_STUDENT, {
          sid: this.multipleSelection[i].id,
          tid: this.id
        });
      }
      this.$refs.multipleTable.clearSelection();
      this.$message.success("删除成功");
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
    },

    studentDirections(sid) {
      let studentDirections = this.directions.filter(direction => {
        if (direction.student.id === sid) return direction;
      });
      let directionNames = [];
      studentDirections.forEach(studentDirection => {
        directionNames.push(studentDirection.name);
      });
      return directionNames;
    }
  },

  computed: {
    ...mapState(USER_NAMESPACE, ["role", "name", "identityNo", "id"]),
    ...mapState(TEACHER_NAMESPACE, ["courses"]),
    ...mapState(TEACHER_NAMESPACE, {
      students: state => state.students
    }),
    ...mapState(STUDENT_NAMESPACE, ["directions"])
  }
  //
  // watch: {
  //   showedData: {
  //     handler() {
  //       console.log("进入");
  //       this.sort_change({ prop: "identityNo", order: "ascending" });
  //     }
  //   }
  // }
};
</script>

<style scoped>
.buttons {
  margin-bottom: 15px !important;
}

.el-button {
  margin-right: 10px;
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
}

.el-tag {
  margin-right: 10px;
}

.el-table >>> .warning-row {
  background: oldlace;
}

.el-table >>> .success-row {
  background: #f0f9eb;
}
</style>

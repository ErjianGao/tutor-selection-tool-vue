<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table
            stripe
            :data="this.selectedStudents"
            style="width: 100%"
            :fit="true"
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
              sortable
              prop="identityNo"
              label="学号"
            ></el-table-column>
            <el-table-column
              sortable
              prop="name"
              label="姓名"
            ></el-table-column>
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
import {
  GET_SELECTED_STUDENTS,
  STUDENT_NAMESPACE,
  TEACHER_NAMESPACE
} from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_SELECTED_STUDENTS);
  },

  methods: {
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
    ...mapState(TEACHER_NAMESPACE, ["selectedStudents"]),
    ...mapState(STUDENT_NAMESPACE, ["directions"])
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
</style>

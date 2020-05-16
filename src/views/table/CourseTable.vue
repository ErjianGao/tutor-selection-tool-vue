<template>
  <div>
    <el-row class="buttons">
      <el-col :span="1">
        <el-tooltip
          class="item"
          effect="light"
          content="增加课程"
          placement="top"
        >
          <el-link :underline="false" @click="dialogFormVisible = true">
            <i class="iconfont icon-jia"></i>
          </el-link>
        </el-tooltip>
      </el-col>

      <el-dialog width="40%" title="添加课程" :visible.sync="dialogFormVisible">
        <el-form
          :model="CourseForm"
          :rules="rules"
          ref="CourseForm"
          label-position="left"
        >
          <el-form-item label="课程名称" prop="name" :label-width="'80px'">
            <el-input v-model="CourseForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="最低分数"
            prop="cutOffMark"
            :label-width="'80px'"
          >
            <el-input
              v-model.number="CourseForm.cutOffMark"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="权值" prop="weight" :label-width="'80px'">
            <el-input v-model="CourseForm.weight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="dialog-buttons">
            <el-button type="primary" @click="addCourse('CourseForm')">
              确定
            </el-button>
            <el-button @click="resetForm('CourseForm')">重置</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table :data="this.courses" style="width: 100%" :fit="true">
            <el-table-column prop="teacher.name" label="导师"></el-table-column>
            <el-table-column prop="name" label="课程名称"></el-table-column>
            <el-table-column
              prop="cutOffMark"
              label="最低分数"
            ></el-table-column>
            <el-table-column prop="weight" label="权值"></el-table-column>
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
  GET_COURSES,
  TEACHER_NAMESPACE,
  USER_NAMESPACE
} from "@/store/types";

function checkSameCourse(_self) {
  let name = _self.CourseForm.name;
  console.log(name);
  let courses = _self.courses;
  console.log(courses);
  let hasSameCourse = false;
  courses.forEach(course => {
    if (course.name === name) {
      hasSameCourse = true;
    }
  });
  if (hasSameCourse === true) {
    return false;
  } else {
    return true;
  }
}

function checkSumOfWeight(_self) {
  let weight = parseFloat(_self.CourseForm.weight);
  console.log(weight);
  let courses = _self.courses;
  let sumWeight = 0;
  courses.forEach(c => {
    let weight = c.weight;
    sumWeight += weight;
  });
  console.log(sumWeight);
  if (weight + sumWeight > 1) {
    return false;
  } else {
    console.log(weight + sumWeight);
    console.log("not stop");
    return true;
  }
}

export default {
  created() {
    this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES, {
      id: this.id
    });
  },

  data() {
    let checkMark = (rule, value, callback) => {
      // 验证数字需要在v-model上加.number
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value > 100 || value < 0) {
          callback(new Error("分数必须在0到100之间"));
        } else {
          callback();
        }
      }
    };

    let checkWeight = (rule, value, callback) => {
      let weight = parseFloat(value);
      if (isNaN(weight)) {
        callback(new Error("请输入一个0到1之间的浮点数"));
      } else {
        if (weight > 1 || weight < 0) {
          callback(new Error("权重必须在0到1之间"));
        } else {
          callback();
        }
      }
    };

    return {
      CourseForm: {
        name: null,
        cutOffMark: null,
        weight: null
      },
      rules: {
        name: [
          { required: true, message: "课程名称不能为空", trigger: "blur" }
        ],
        cutOffMark: [
          { required: true, message: "最低分数不能为空", trigger: "blur" },
          { validator: checkMark, trigger: "blur" }
        ],
        weight: [
          { required: true, message: "权值不能为空", trigger: "blur" },
          { validator: checkWeight, trigger: "blur" }
        ]
      },
      dialogFormVisible: false
    };
  },

  methods: {
    addCourse(CourseForm) {
      let _this = this;
      this.$refs[CourseForm].validate(valid => {
        if (valid) {
          if (checkSumOfWeight(_this) && checkSameCourse(_this)) {
            this.$store
              .dispatch(TEACHER_NAMESPACE + "/" + ADD_COURSE, {
                name: _this.CourseForm.name,
                cutOffMark: _this.CourseForm.cutOffMark,
                weight: _this.CourseForm.weight
              })
              .then(() => {
                _this.message.success("添加成功！");
                _this.dialogFormVisible = false;
              });
          } else {
            if (!checkSameCourse(_this)) {
              this.$message.error("您已添加过该课程");
            } else if (!checkSumOfWeight(_this)) {
              this.$message.error(
                "您设置的权重综合以超过1，请重新设置目前的课程权重或修改已添加课程的权重"
              );
            }
          }
        } else {
          this.$message.error("请按正确的格式填写哦");
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

  computed: {
    ...mapState(TEACHER_NAMESPACE, ["courses"]),
    ...mapState(USER_NAMESPACE, ["id"])
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

>>> .el-dialog {
  border-radius: 10px;
}
</style>

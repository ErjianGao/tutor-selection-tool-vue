<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="profile-header">
            <span>About me</span>
          </div>
          <div class="profile-content">
            <div class="avatar">
              <i v-if="role === 'admin'" class="iconfont icon-guanliyuan"></i>
              <i
                v-else-if="role === 'teacher'"
                class="iconfont icon-laoshi"
              ></i>
              <i
                v-else-if="role === 'student'"
                class="iconfont icon-xuesheng"
              ></i>
            </div>

            <div class="info">
              <p class="name">{{ name }}</p>
              <p class="identityNo">{{ identityNo }}</p>
            </div>

            <div
              class="direction"
              v-if="this.role === 'student' && studentDirections.length !== 0"
            >
              <div class="tag-group">
                <span class="tag-group__title">
                  <i class="iconfont icon-iconfonticon-dianyu"></i>
                </span>
                <el-tag
                  v-for="(item, index) in studentDirections"
                  :key="index"
                  type=""
                  effect="light"
                >
                  {{ item.name }}
                </el-tag>
              </div>
            </div>
            <div v-if="selectedTeacher !== undefined" class="teacher">
              <i class="iconfont icon-laoshi"></i>
              <el-tag type="success" effect="light">
                {{ selectedTeacher.name }}老师
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <NavMenu></NavMenu>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu";
import { mapGetters, mapState } from "vuex";
import {
  GET_COURSES,
  GET_SELECTED_TEACHER,
  GET_STUDENT_DIRECTIONS,
  STUDENT_NAMESPACE,
  TEACHER_NAMESPACE
} from "@/store/types";

export default {
  created() {
    this.$store.dispatch(
      STUDENT_NAMESPACE + "/" + GET_STUDENT_DIRECTIONS,
      this.id
    );
    this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_SELECTED_TEACHER);
    this.$store.dispatch(TEACHER_NAMESPACE + "/" + GET_COURSES);
  },
  data: () => ({}),
  components: {
    NavMenu
  },
  methods: {},
  computed: {
    ...mapGetters(["role", "name", "identityNo", "id"]),

    ...mapState(STUDENT_NAMESPACE, ["studentDirections", "selectedTeacher"]),
    ...mapState(TEACHER_NAMESPACE, ["courses"])
  }
};
</script>

<style scoped>
.avatar i {
  font-size: 7em !important;
}

.el-card {
  margin-top: 10px;
}

.profile-header {
  color: #909399;
  text-align: left;
  font-size: 1.2em;
}

.profile-content {
  text-align: center;
}

.avatar {
  border-bottom: 2px dashed #dcdfe6;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.info {
  padding-bottom: 10px;
}

.name {
  margin: 10px;
  font-size: 1.5em;
  font-weight: 600;
}

.identityNo {
  margin: 10px;
  font-size: 1.2em;
  color: #909399;
}

.direction,
.teacher {
  border-top: 2px dashed #dcdfe6;
  padding: 10px;
  text-align: left;
}

.direction i,
.teacher i {
  font-size: 2em;
}

.el-tag {
  margin: 5px;
}
</style>

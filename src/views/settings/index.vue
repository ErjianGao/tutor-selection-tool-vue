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
              v-if="
                this.role === 'student' && this.studentDirections.length !== 0
              "
            >
              <i class="iconfont icon-iconfonticon-dianyu"></i>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <NavMenu :studentDirections="this.studentDirections"></NavMenu>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu";
import { mapGetters, mapState } from "vuex";
import { GET_STUDENT_DIRECTIONS, STUDENT_NAMESPACE } from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(
      STUDENT_NAMESPACE + "/" + GET_STUDENT_DIRECTIONS
    );
  },
  data: () => ({}),
  components: {
    NavMenu
  },
  methods: {},
  computed: {
    ...mapGetters(["role", "name", "identityNo"]),

    ...mapState(STUDENT_NAMESPACE, ["studentDirections"])
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

.direction {
  border-top: 2px dashed #dcdfe6;
  padding: 10px;
  text-align: left;
}

.direction i {
  font-size: 2em;
}
</style>

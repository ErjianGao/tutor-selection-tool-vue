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
            <p class="name">{{ user.name }}</p>

            <p class="identityNo">{{ user.identityNo }}</p>
            <div v-if="role === 'student'">
              <div v-if="user.direction != null">
                <i class="iconfont icon-iconfonticon-dianyu"></i>
              </div>
            </div>
            <div v-else-if="role === 'teacher'"></div>
            <div v-else-if="role === 'admin'"></div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <NavMenu></NavMenu>
          <router-view></router-view>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu";
import { mapState } from "vuex";
import { GET_USER } from "@/store/types.js";
export default {
  created() {
    this.$store.dispatch(GET_USER);
  },
  components: {
    NavMenu
  },
  computed: {
    ...mapState(["user", "role"])
  }
};
</script>

<style scoped>
i {
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
</style>

<template>
  <el-container>
    <div class="login-container">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-image :src="require('@/assets/img/system-logo.png')"></el-image>

        <el-form-item label="账号" prop="identityNo">
          <el-input
            v-model="userForm.identityNo"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="userForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary" @click="submitForm('userForm')">
            登 录
          </el-button>
          <el-button @click="resetForm('userForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/types.js";
import { USER_NAMESPACE } from "@/store/types";

export default {
  data: () => ({
    userForm: {
      identityNo: null,
      password: null
    },
    rules: {
      identityNo: [
        { required: true, message: "账号不能为空", trigger: "blur" }
      ],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
    }
  }),
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch(USER_NAMESPACE + "/" + LOGIN, {
              identityNo: this.userForm.identityNo,
              password: this.userForm.password
            })
            .then(() => {
              // https://github.com/vuejs/vue-router/issues/2873
              // 这里的路由跳转会返回一个Promise对象，如果路由跳转被拒绝会抛出一个Error，应该显示捕获异常
              // 原因是Vue-Router版本到到3.1.0及以上之后，页面在跳转路由时如果next()被拒绝（我的路由表是在登录时动态生成的），会报Uncaught (in promise)，这里我一开始是使用await this.$router.push（一开始我也不知道push会返回Promise，ide提示我应该加await我才加的），结果路由访问被拒绝后返回了一个undefined的异常
              this.$router.push("/home").catch(() => {});
              this.$message({
                message: "登录成功",
                type: "success"
              });
            })
            .catch(e => {
              console.log(e);
              this.$message.error("登录失败");
            });

          // try {
          //   await this.$store.dispatch(USER_NAMESPACE + "/" + LOGIN, {
          //     identityNo: this.userForm.identityNo,
          //     password: this.userForm.password
          //   });
          //   // 路由不需要异步
          //   await this.$router.push("/home");
          //   this.$message({
          //     message: "登录成功",
          //     type: "success"
          //   });
          // } catch (e) {
          //   console.log(e);
          //   this.$message.error("e");
          // }
        } else {
          this.$message.error("用户名或密码不能为空哦");
          console.log("error submit!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapState(USER_NAMESPACE, ["isLogin"])
  }
};
</script>

<style scoped>
.login-container {
  background-image: url("../../assets/img/background.jpg");
}

.login-container {
  height: max-content;
  width: 500px;
  /*border: 2px solid #ebeef5;*/
  border-radius: 20px;
  margin: 150px auto;
  padding: 30px 40px 30px 40px;
  box-shadow: 0 0 20px #ebeef5;
}

.el-image {
  width: 300px;
  margin-bottom: 30px;
}

.login-title {
  font-size: 1.5em;
  color: #606266;
  margin-bottom: 20px;
}

.login-button {
  margin-right: 40px;
}
</style>

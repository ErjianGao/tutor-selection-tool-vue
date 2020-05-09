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
        <h3 class="login-title">SYSTEM LOGIN</h3>
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
            登录
          </el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
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
          let resp = this.$store
            .dispatch(USER_NAMESPACE + "/" + LOGIN, {
              identityNo: this.userForm.identityNo,
              password: this.userForm.password
            })
            .then(resp => {
              this.$router.push("/home");
              this.$message({
                message: "登录成功",
                type: "success"
              });
            })
            .catch(error => {
              this.$message.error("用户名密码错误哦");
            });
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
  height: 300px;
  width: 500px;
  border: 2px solid #ebeef5;
  border-radius: 20px;
  margin: 150px auto;
  padding: 30px 40px 30px 15px;
  box-shadow: 0 0 20px #ebeef5;
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

<template>
  <el-form
    :model="passwordForm"
    status-icon
    :rules="rules"
    ref="passwordForm"
    label-width="100px"
  >
    <el-form-item label="旧密码" prop="oldPass">
      <el-input
        type="password"
        v-model="passwordForm.oldPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input
        type="password"
        v-model="passwordForm.newPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="passwordForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item class="submit-button">
      <el-button type="primary" @click="submitForm('passwordForm')">
        提交
      </el-button>
      <el-button @click="resetForm('passwordForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { LOGIN, UPDATE_PASSWORD, USER_NAMESPACE } from "@/store/types";

export default {
  name: "ChangePassword",
  data() {
    let validatePass = (rule, value, callback) => {
      if (this.passwordForm.checkPass !== "") {
        this.$refs.passwordForm.validateField("checkPass");
      }
      callback();
    };

    // 验证再次输入密码
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.passwordForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        oldPass: null,
        newPass: null,
        checkPass: null
      },

      rules: {
        oldPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, message: "密码长度不能少于6个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm(passwordForm) {
      this.$refs[passwordForm].validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch(USER_NAMESPACE + "/" + UPDATE_PASSWORD, {
              oldPassword: this.passwordForm.oldPass,
              newPassword: this.passwordForm.newPass,
              confirmNewPassword: this.passwordForm.checkPass
            });
            this.$message.success("修改成功！");
          } catch (e) {
            console.log(e);
            this.$message.error("修改失败");
          }
        } else {
          this.$message.error("请按正确的格式输入哦");
          return false;
        }
        this.$refs[passwordForm].resetFields();
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.el-form {
  margin: 30px 50px 30px 30px;
}

.submit-button {
  display: flex;
  justify-content: space-between;
}
</style>

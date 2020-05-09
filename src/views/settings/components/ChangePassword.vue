<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="旧密码" prop="oldPass">
      <el-input
        type="password"
        v-model="ruleForm.oldPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input
        type="password"
        v-model="ruleForm.newPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item class="submit-button">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ChangePassword",
  data: () => ({
    ruleForm: {
      oldPass: null,
      newPass: null,
      checkPass: null
    }
  })
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

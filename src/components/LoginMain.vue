<template>
  <el-main>
    <el-form
      v-loading="loading"
      element-loading-text="登录中..."
      element-loading-spinner="el-icon-loading"
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="请输入学号/工号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="loginForm.userType">
          <el-radio :label="'TEACHER'">教师</el-radio>
          <el-radio :label="'STUDENT'">学生/家长</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { loginApi } from "@/api/getData";

export default {
  data() {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    // 校验密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
        userType: "TEACHER",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          loginApi(this.loginForm.username, this.loginForm.password, this.loginForm.userType).then((res) => {
            console.log(res, this.loginForm.userType);
            if (res.data.code === 0) {
              this.loading = false;
              localStorage.setItem("token", res.data.data);
              this.$router.push({ name: "home" });
            } else {
              this.loading = false;
              this.$message.error("用户名或密码错误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped></style>

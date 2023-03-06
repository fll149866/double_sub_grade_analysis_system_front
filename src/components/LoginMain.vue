<template>
  <el-main :style="{'background': 'url(' + require('@/assets/images/forest.png') + ') no-repeat bottom center'}">
    <div class="left-content">
      <el-card class="left-card">
        <h1>
          <img class="font-img" :src="fontImg" />
        </h1>
        <p>
          Double-Sub-Grade-Analysis-System（简称：DSGAS） 该系统旨在帮助老师减轻考试后的评卷，分析成绩等工作量，
          全平台测评一体，可以对成绩进行周期展示和趋势分析。 同时亦可学生亦可查看历史考试成绩，以及成绩模块分析，
          可帮助学生发现不足之处，使学生针对不足进行强化。
        </p>
      </el-card>
    </div>
    <div class="right-content">
      <el-card class="right-card">
        <el-form
          v-loading="loading"
          element-loading-text="登录中..."
          element-loading-spinner="el-icon-loading"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prefix-icon="el-icon-user" prop="username">
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
            <el-button style="width: 100%" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <el-button class="forget-pass" type="info">忘记密码？</el-button>
      </el-card>
    </div>
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
      fontImg: require("@/assets/images/font-theme.png"),
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

<style lang="scss" scoped>
@import "~@/assets/scss/loginMain";
</style>

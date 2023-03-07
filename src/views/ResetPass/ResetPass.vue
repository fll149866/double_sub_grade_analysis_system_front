<template>
  <div class="reset-pass">
    <h1>重置密码页</h1>
    <el-card v-if="confirmStatus" class="reset-card">
      <el-form :model="confirmForm" status-icon :rules="rules" ref="confirmForm" label-width="100px" class="reset-confirmForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="confirmForm.username" placeholder="请输入学号/工号"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-radio-group v-model="confirmForm.userType">
            <el-radio :label="'TEACHER'">教师</el-radio>
            <el-radio :label="'STUDENT'">学生/家长</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号/邮箱" prop="to">
          <el-input v-model="confirmForm.to" placeholder="请输入手机号/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-col :span="11">
            <el-input v-model="confirmForm.code" style="width: 80%"></el-input>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-button type="primary" :disabled="cdCode" @click="getCode('confirmForm')">
              获取验证码
              <span v-if="cdCode">({{ cdTime }})</span>
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('confirmForm')">提交</el-button>
          <el-button @click="resetForm('confirmForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card v-if="resetPass" class="reset-card">
      <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px" class="demo-passForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="passForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPassForm('passForm')">确认修改</el-button>
          <el-button @click="resetForm('passForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// ,checkCodeApi,resetPassApi
import { sendCodeApi, checkCodeApi, resetPassApi } from "@/api/getData";
export default {
  data() {
    // 校验手机号/邮箱
    var validateContact = (rule, value, callback) => {
      // 手机或邮箱正则规则
      if (this.confirmForm.username == "") {
        this.$refs.confirmForm.validateField("username");
      }
      if (/^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(value) || /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号或邮箱格式错误"));
      }
    };

    var validateUsername = (rule, value, callback) => {
      let val = value.trim();
      if (val == "") {
        callback(new Error("请输入学号/工号"));
      } else {
        callback();
      }
    };

    var validateCode = (rule, value, callback) => {
      let val = value.trim();
      if (val == "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passForm.checkPass !== "") {
          this.$refs.passForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 获取验证码按钮
      cdCode: false,
      cdTime: 60,
      // 通信token
      token: "",
      // 用户确认
      confirmStatus: true,
      resetPass: false,
      confirmForm: {
        username: "",
        userType: "TEACHER",
        // 联系方式
        to: "",
        // 邮箱验证码
        code: "",
      },
      // 修改密码表单
      passForm: {
        pass: "",
        checkPass: "",
      },

      rules: {
        username: [{ required: true, validator: validateUsername, trigger: "blur" }],
        to: [{ required: true, validator: validateContact, trigger: "blur" }],
        code: [{ required: true, validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 获取验证码
    getCode(formName) {
      this.$refs[formName].validateField(["to"], async (valid) => {
        if (!valid) {
          // 发送验证码
          this.cdCode = true;
          const timer = setInterval(() => {
            this.cdTime--;
            if (this.cdTime <= 0) {
              this.cdCode = false;
              this.cdTime = 60;
              clearInterval(timer);
            }
          }, 1000);
          sendCodeApi(this.confirmForm.username, this.confirmForm.userType, this.confirmForm.to).then((res) => {
            let result = res.data;
            console.log(result);
            if (result.code === 0) {
              this.token = result.data;
            } else {
              this.$message.error(result.msg);
              this.cdCode = false;
              this.cdTime = 60;
              clearInterval(timer);
              return false;
            }
          });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkCodeApi(this.confirmForm.to, this.confirmForm.code, this.token).then((res) => {
            const result = res.data;
            // 信息确认成功
            if (result.code === 0) {
              this.confirmStatus = false;
              this.resetPass = true;
              this.token = result.data;
            } else {
              this.$message.error(result.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交密码修改表单
    submitPassForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPassApi(this.confirmForm.username, this.confirmForm.userType, this.passForm.pass, this.passForm.checkPass, this.token, this.confirmForm.to).then(
            (res) => {
              const result = res.data;
              if (result.code === 0) {
                // TODO
                this.$message.success("修改成功，即将返回登录页....");
                setTimeout(() => {
                  this.$router.push({ name: "login" });
                }, 500);
              } else {
                console.log(result);
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-pass {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .reset-card {
    margin-top: 20px;
    width: 40%;
    display: flex;
    align-items: center;
    .reset-confirmForm {
      width: 80%;
    }
    // .el-card__body{
    //     width: 100%;
    // }
  }
}
</style>
<style lang="scss">
.el-card__body {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>

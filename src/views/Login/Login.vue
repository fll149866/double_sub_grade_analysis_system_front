<template>
  <el-container style="height: 100%">
    <login-header></login-header>
    <login-main></login-main>
    <el-footer style="height: 4%"><p>Copyright©2023 1498665771@qq.com</p></el-footer>
  </el-container>
</template>

<script>
import LoginMain from "@/components/LoginMain";
import LoginHeader from "@/components/LoginHeader";
export default {
  components: {
    LoginMain,
    LoginHeader,
  },
};
</script>

<style lang="scss" scoped>
.el-footer {
  background-color: #999;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>

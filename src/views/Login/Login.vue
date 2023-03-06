<template>
  <el-container>
    <login-header></login-header>
    <login-main></login-main>
    <el-footer>Footer</el-footer>
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

<style lang="scss" scoped></style>

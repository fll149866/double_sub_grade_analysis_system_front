<template>
  <el-header style="height: 90px">
    <span class="system-logo"><img src="../assets/logo.png" /></span>
    <h3 class="system-name">DSGAS成绩分析系统</h3>
  </el-header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  line-height: 60px;
  align-items: center;
  background-color: rgb(197, 224, 180);
  justify-content: center;
  .system-logo {
    text-align: center;
    display: flex;
    height: 90px;
    border-radius: 50%;
  }
  .system-name {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 32px;
  }
}
</style>

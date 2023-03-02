const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "127.0.0.1",
    port: 9001,
    // 默认打开
    open: true,
  },
  // 配置scss全局变量
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_variable.scss";`,
      },
    },
  },
});

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "warn",
      {
        // 分号
        semi: true,
        // 单引号
        singleQuote: false,
        // 超过多少换行
        printWidth: 160,
      },
    ],
    //在rules中添加自定义规则
    //关闭组件命名规则
    "vue/multi-word-component-names": "off",
  },
};

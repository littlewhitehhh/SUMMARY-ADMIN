module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 这是eslint默认推荐的
    "eslint:recommended",
    // 用来检查ts的
    "plugin:@typescript-eslint/recommended",
    // 用来检查vue3
    "plugin:vue/vue3-essential",
    // 添加prettier

    // 推荐的prettier配置
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "vue",
    // prettier
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};

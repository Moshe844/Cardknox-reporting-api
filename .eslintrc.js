module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "comma-dangle": "off",
    "prefer-arrow-callback": 0,
    "func-names": 0,
    "object-shorthand": 0,
    "object-curly-spacing": "off",
    quotes: [2, "double", { avoidEscape: true }],
    "linebreak-style": 0,
  },
};

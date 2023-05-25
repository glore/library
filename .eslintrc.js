module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'

  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    // 'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    'indent': 'off',
    'eqeqeq': 0,
    'no-fallthrough': 0,
    'no-duplicate-imports': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'camelcase': 0,
    'no-return-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'one-var': 0,
    // "yoda": [0, "never"],
    'no-unused-expressions': 0,
    'no-unneeded-ternary': 0,
    'no-undef': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': [0, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }]
  },
  globals: {
    wx: true
  }
}

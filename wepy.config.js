const path = require('path')
const cliExt = require('wepy-cli-extend')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  // eslint: true,
  cliLogs: !prod,
  static: ['./src/images'],
  build: {},
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  plugins: [
    cliExt()
  ],
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

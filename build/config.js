// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

const NOW = new Date();

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    // 本地连个人ip联调
    proxyTable: { // /member/choice-crm/api
      // /member/api 本地
      // '/member/api/activity': { // 营销模板数据保存接口
      //   target: 'http://10.10.0.135:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     // 路径改写
      //     member: '',
      //   },
      // },
      '/qr': {
        target: 'http://30.87.249.3:8080',
        // target: 'http://yun.dev.choicesaas.cn',
        changeOrigin: true,
        pathRewrite: {
          // 路径改写
          member: '',
        },
      },
      '/api': {
        target: 'http://30.87.249.3:8080',
        // target: 'http://yun.dev.choicesaas.cn',
        changeOrigin: true,
        pathRewrite: {
          // 路径改写
          member: '',
        },
      },
      // 刷新token和登出 api
      '/cloud/api': {
        target: 'http://yun.dev.choicesaas.cn',
        changeOrigin: true,
        pathRewrite: { // 路径改写
          member: '',
        },
      },
    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8006, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    showEslintErrorsInOverlay: false,
    errorOverlay: false,
    cssSourceMap: true,
    poll: false,
    createMenusPath: './src/pages',
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: `${NOW.getFullYear()}${NOW.getMonth() > 8 ? NOW.getMonth() + 1 : `0${NOW.getMonth() + 1}`}${NOW.getDate() > 9 ? NOW.getDate() : `0${NOW.getDate()}`}`,
    assetsPublicPath: './',
    productionSourceMap: true,
    createMenusPath: './src/pages',
    bundleAnalyzerReport: process.env.NPM_CONFIG_REPORT,
  },
};

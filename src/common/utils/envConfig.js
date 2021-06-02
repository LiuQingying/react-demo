/* global BUILD_MODE */

// 默认本地调试地址
let envConfig = {
  // apiPrefix: '/member', // 个人ip
  apiPrefix: '/cloud', // 开发环境
  loginUrl: 'http://localhost/index.html#/system/cloud/home', // 登录地址
  domainScm: 'http://scm.dev.choicesaas.cn/index.html#/', // 供应链主域名
};

if (BUILD_MODE === 'dev') {
  // 开发环境变量
  envConfig = {
    apiPrefix: '/cloud',
    loginUrl: 'http://yun.dev.choicesaas.cn/index.html#/system/cloud/home', // 登录地址
    domainScm: 'http://scm.dev.choicesaas.cn/index.html#/', // 供应链主域名
  };
}

if (BUILD_MODE === 'tst') {
  // 测试环境变量
  envConfig = {
    apiPrefix: '/cloud',
    loginUrl: 'http://yun.tst.choicesaas.cn/index.html#/system/cloud/home', // 登录地址
    domainScm: 'http://scm2.test.choicesaas.cn/index.html#/', // 供应链主域名
  };
}

if (BUILD_MODE === 'ttt') {
  // 测试环境变量
  envConfig = {
    apiPrefix: '/cloud',
    loginUrl: 'http://yun.ttt.choicesaas.cn/index.html#/system/cloud/home', // 登录地址
    domainScm: 'http://scm.hotfix.choicesaas.cn/index.html#/', // 供应链主域名
  };
}

if (BUILD_MODE === 'tst01') {
  // tst01测试环境变量
  envConfig = {
    apiPrefix: '/cloud',
    loginUrl: 'http://yun.ttt.choicesaas.cn/index.html#/system/cloud/home', // 登录地址
    domainScm: 'http://scm.hotfix.choicesaas.cn/index.html#/', // 供应链主域名
  };
}

if (BUILD_MODE === 'pre') {
  // 预发环境变量
  envConfig = {
    apiPrefix: '/cloud',
    loginUrl: 'http://yun.pre.choicesaas.cn/index.html#/system/cloud/home', // 登录地址
    domainScm: 'http://scm.pre.choicesaas.cn/index.html#/', // 供应链主域名
  };
}

if (BUILD_MODE === 'pro') {
  //  生产环境变量
  envConfig = {
    apiPrefix: '/cloud',
    loginUrl: 'http://yun.choicesaas.cn/index.html#/system/cloud/home', // 登录地址
    domainScm: 'http://scm.choicesaas.cn/index.html#/', // 供应链主域名
  };
}

module.exports = envConfig;

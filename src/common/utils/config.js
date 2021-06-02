import envConfig from './envConfig';

const PAYMENT = '/pay-admin/plAdmin';

module.exports = {
  name: '商户端订餐系统',
  prefix: 'rt-report',
  footerText: '商户端订餐系统 v1.0',
  logo: './images/logo.png',
  nodata: './images/nodata.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  openPages: ['/login', '/register', '/registerResult', '/forgetPassword', '/forgetPasswordResult', '/password', '/baseInfo', '/refreshToken'],
  api: {
    payment: {
      payChannel: `${PAYMENT}`,
      aggregator: `${PAYMENT}`,
      isv: `${PAYMENT}`,
      receiptAccount: `${PAYMENT}`,
      receiptChannel: `${PAYMENT}`,
      receiptShop: `${PAYMENT}`,
    },
  },
  REFRESH_TOKEN_URL: '/usercenter/api/auth/token',
  ...envConfig,
};

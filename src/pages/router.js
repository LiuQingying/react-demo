import LoadableComponent from '@/components/LoadableComponent';

export default [
  {
    path: 'orderDish',
    Component: LoadableComponent(() => import('./OrderDish')),
    name: '同步记录',
  },
  {
    path: 'viewDish',
    Component: LoadableComponent(() => import('./ViewDish')),
    name: '灰度平台',
  },
  {
    path: 'login',
    Component: LoadableComponent(() => import('./Login')),
    name: '登录',
  },
  {
    path: 'shopCart',
    Component: LoadableComponent(() => import('./ShopCart')),
    name: '购物车',
  },
  {
    path: 'account',
    Component: LoadableComponent(() => import('./Account')),
    name: '结算',
  },
  {
    path: 'order',
    Component: LoadableComponent(() => import('./Order')),
    name: '结算',
  },
];

import { getSession, getLocal, toJson, treeToList, dishTreeToList } from '@/common/utils';
import { isObject, unionBy } from 'lodash';
// import { loginUrl } from '@/common/utils/config';
import { message } from 'antd';
import { inquireStore, inquireDish, quitSystem } from './service';
// import mockMenu from '../../mock/menu.json';


const winWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export default {
  namespace: 'system',
  initial: {
    user: {
      username: getSession('username') || '',
      tenantName: getSession('tenantName') || '',
    },
    isLogin: false,
    isIframe: false,
    systemMenu: [],
    applicationName: '',
    permissions: {
      visit: {
        personal: ['1', '2', '3'],
      },
    },
    firstMenu: {},
    menuType: [1, 2, 3],
    menu: {
      personal: [
        {
          id: '1',
          icon: 'icon-cho-datum',
          name: '基础资料',
          route: '/system/personal/baseInfo',
        },
        {
          id: '2',
          icon: 'icon-cho-lock',
          name: '修改密码',
          route: '/system/personal/password',
        },
        {
          id: '3',
          icon: 'icon-cho-job',
          name: '我工作的商家',
          route: '/system/personal/myBusiness',
        },
      ],
    },
    buttonPermissions: {},
    isPersonal: false, // 是否是个人中心
    isSelectedTenant: false, // 是否已经选择商家
    menuPopoverVisible: false,
    siderFold: getLocal('siderFold') === 'true',
    darkTheme: false, // 风格定为深色
    isNavbar: winWidth < 769,
    navOpenKeys: toJson(getLocal('navOpenKeys')) || [],
    contactList: [],
    contactBtn: true,
    contactBtnName: '切换商家',
    personalBtnStatus: true,
    dishTree: [],
    dishList: [],
    storeList: [],
    levelList: [],
    storeTree: [],
  },
  reducers: {
    getState(state) {
      return state;
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    switchSider(state) {
      localStorage.setItem('siderFold', !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    autoSwitchSider(state) {
      const siderFold = document.body.clientWidth < 769;
      if (siderFold) {
        localStorage.setItem('siderFold', siderFold);
        return {
          ...state,
          siderFold,
        };
      }
      return { ...state };
    },
    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
  asyncs: {
    // loadMenu 获取菜单
    async loadMenu(dispatch, getState) {
      const visitCache = getState().permissions.visit;
      const menuCache = getState().menu;
      const menuData = toJson(getSession('cloudMenuTree'));
      // const menuData = mockMenu;
      // const tenantObj = toJson(getSession('contactList'));
      if (isObject(menuData)) {
        const {
          firstMenu,
          secondMenu,
          pageVisit,
          buttonPermissions,
        } = menuData;
        dispatch({
          type: 'updateState',
          payload: {
            firstMenu,
            menu: { ...menuCache, ...secondMenu },
            permissions: {
              visit: { ...visitCache, ...pageVisit },
            },
            buttonPermissions,
          },
        });
      } else {
        // window.location = loginUrl;
      }
    },
    // 获取门店树和门店列表
    async queryStore(dispatch) {
      const res = await inquireStore();
      const { data, code } = res;
      if (code === '10000') {
        dispatch({
          type: 'updateState',
          payload: {
            storeTree: data || [],
            storeList: unionBy(treeToList(data), 'id') || [],
          },
        });
      }
    },
    // 获取菜品
    async queryDish(dispatch) {
      const res = await inquireDish();
      const { data, code } = res;
      if (code === '10000') {
        dispatch({
          type: 'updateState',
          payload: {
            dishTree: data || [],
            dishList: unionBy(dishTreeToList(data), 'id') || [],
          },
        });
      }
    },

    async logoutSystem() {
      const params = {
        accessToken: getSession('accessToken'),
        refreshToken: getSession('refreshToken'),
      };
      const res = await quitSystem(params);
      const { code } = res;
      if (code === '10000') {
        message.success('退出成功！');
        // window.location = loginUrl;
      }
    },
  },
  async setup(dispatch) {
    dispatch({
      type: 'loadMenu',
    });
    // dispatch({
    //   type: 'queryStore',
    // });
    // dispatch({
    //   type: 'queryDish',
    // });
    dispatch({
      type: 'updateState',
      payload: {
        applicationName: window.location.pathname.split('/')[1],
      },
    });
    let tid;
    window.onresize = () => {
      clearTimeout(tid);
      tid = setTimeout(() => {
        dispatch({
          type: 'autoSwitchSider',
        });
      }, 300);
    };
  },
};

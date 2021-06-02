
import { message } from 'antd';
import { logout, ddLogin, enter, sendMsg } from './service.js';

export default {
  namespace: 'Login',
  initial: {
    loading: false,
    modalVisible: false,
    selectArray: [],
    selectedRow: [],
    dataSource: [],
    pagination: {
      showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],

    },
    detailLoading: false,
    taskIdDetail: '',
    currentDetail: [],
    tenantList: [],
    searchInfo: {},
    storeList: [],
    id: '',
    deleteFlag: '',
    password: '',
    username: '',
    phoneNumber: '',
    count: '',
    loginModal: 'pwLogin',
    token: '',
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  asyncs: {
    async enter(dispatch, getState, { payload }) {
      console.log('122222222');
      try {
        dispatch({
          type: 'updateState',
          payload: {
            loading: true,
          },
        });
        const { pagination } = getState();
        const res = await enter(payload);
        const { code, data } = res;
        const { pageSize, totalRows, pageNo } = data || {};
        if (code === '200') {
          dispatch({
            type: 'updateState',
            payload: {
              loading: false,
              dataSource: data ? data.dataList : [],
              pagination: {
                ...pagination,
                pageSize: pageSize || 10,
                total: totalRows || 0,
                current: pageNo || 1,
              },
            },
          });
        }
        dispatch({
          type: 'updateState',
          payload: {
            loading: false,
          },
        });
      } catch (error) {
        dispatch({
          type: 'updateState',
          payload: {
            loading: false,
          },
        });
      }
    },

    async logout(dispatch, getState, { payload }) {
      const res = await logout(payload);
      const { code, data } = res;

      if (code === '200') {
        dispatch({
          type: 'updateState',
          payload: {
            tenantList: data || [],
          },
        });
      } else {
        message.error('操作失败，请重新操作');
      }
    },

    async ddLogin(dispatch, getState, { payload }) {
      const res = await ddLogin(payload.tenantId);
      const { code, data } = res;

      if (code === '200') {
        dispatch({
          type: 'updateState',
          payload: {
            storeList: data || [],
          },
        });
      } else {
        message.error('操作失败，请重新操作');
      }
    },
    async graySet(dispatch, getState, { payload }) {
      dispatch({
        type: 'updateState',
        payload: {
          loading: true,
        },
      });
      try {
        const res = await sendMsg(payload.storeList, payload.gray);
        const { code } = res;
        if (code === '200') {
          const { searchInfo } = getState();
          dispatch({
            type: 'updateState',
            payload: {
              loading: false,
              selectArray: [],
              selectedRow: [],
            },
          });
          dispatch({
            type: 'sendMsg',
            payload: {
              ...searchInfo,
              pageNo: 1,
              pageSize: 10,
            },
          });
          if (payload.gray === 1) {
            message.success('发送成功');
          } else {
            message.success('取消成功');
          }
        }
      } catch (error) {
        dispatch({
          type: 'updateState',
          payload: {
            loading: false,
          },
        });
      }
    },
  },

};


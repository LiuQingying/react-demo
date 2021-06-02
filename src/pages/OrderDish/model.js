
import { message } from 'antd';
// import _ from 'lodash';
import { inquireTenantList, inquireStoreList, inquireGrayPostList, graySet } from './service.js';

export default {
  namespace: 'grayPlat',
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
      // defaultPageSize: 10,
    },
    detailLoading: false,
    taskIdDetail: '',
    currentDetail: [],
    tenantList: [],
    searchInfo: {},
    storeList: [],
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
    // 查询灰度发布列表
    async queryGrayPostList(dispatch, getState, { payload }) {
      console.log('122222222');
      try {
        dispatch({
          type: 'updateState',
          payload: {
            loading: true,
          },
        });
        const { pagination } = getState();
        const res = await inquireGrayPostList(payload);
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
    // 查询商户
    async queryTenantList(dispatch, getState, { payload }) {
      const res = await inquireTenantList(payload);
      const { code, data } = res;

      if (code === '200') {
        dispatch({
          type: 'updateState',
          payload: {
            tenantList: data || [],
          },
        });
      } else {
        message.error('查询商户失败');
      }
    },
    // 查询门店
    async queryStoreList(dispatch, getState, { payload }) {
      const res = await inquireStoreList(payload.tenantId);
      const { code, data } = res;

      if (code === '200') {
        dispatch({
          type: 'updateState',
          payload: {
            storeList: data || [],
          },
        });
      } else {
        message.error('删除失败，请重新操作');
      }
    },
    // 灰度设置
    async graySet(dispatch, getState, { payload }) {
      console.log('2222', payload);
      dispatch({
        type: 'updateState',
        payload: {
          loading: true,
        },
      });
      try {
        const res = await graySet(payload.storeList, payload.gray);
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
            type: 'queryGrayPostList',
            payload: {
              ...searchInfo,
              pageNo: 1,
              pageSize: 10,
            },
          });
          if (payload.gray === 1) {
            message.success('设置成功');
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

  async setup(dispatch) {
    dispatch({
      type: 'queryTenantList',
    });
    // dispatch({
    //   type: 'queryGrayPostList',
    // });
  },
};


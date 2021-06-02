/*
 * @Author: Liu Kaiming
 * @since: 2019-09-16 14:18:47
 */

import Moment from 'moment';
import { message } from 'antd';
// import _ from 'lodash';
import { inquireRecordList, inquireDetail, sync, remove } from './service.js';

export default {
  namespace: 'syncRecord',
  initial: {
    loading: false,
    modalVisible: false,
    searchData: {
      status: '',
      date: Moment(),
    },
    selectArray: [],
    selectedRow: [],
    dataSource: [
      {
        title: '辣椒炒肉',
        img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3104536782,3994652127&fm=26&gp=0.jpg',
        price: 22,
        des: '肉香，辣，口水直流',
        storeName: '老济南菜馆',
        count: 1,

      },
      {
        title: '土豆丝',
        img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1281652533,3575347251&fm=26&gp=0.jpg',
        price: 8,
        des: '简单的菜，不简单的味道',
        storeName: '老地方菜馆',
        count: 1,

      },
      {
        title: '红烧鱼',
        img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2677180338,1546453841&fm=26&gp=0.jpg',
        price: 38,
        des: '正宗红烧鱼，好鱼，好厨师，菜才好吃',
        storeName: '老地方菜馆',
        count: 1,

      },
      {
        title: '韭菜鸡蛋',
        img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1570841017,3347797351&fm=11&gp=0.jpg',
        price: 16,
        des: '蛋香，鲜美，口水直流',
        storeName: '老济南菜馆',
        count: 1,


      },
      {
        title: '麻婆豆腐',
        img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2104318787,4144996903&fm=26&gp=0.jpg',
        price: 25,
        des: '又麻又辣，不简单的味道',
        storeName: '老地方菜馆',
        count: 1,

      },
      // {
      //   title: '干炸带鱼',
      //   img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1993925701,2012375169&fm=26&gp=0.jpg',
      //   price: 28,
      //   des: '深海大带鱼，好鱼，好厨师，菜才好吃',
      //   storeName: '老地方菜馆',
      //   count: 1,

      // },
      // {
      //   title: '黄焖鸡',
      //   img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3234327694,53693486&fm=26&gp=0.jpg',
      //   price: 18,
      //   des: '正宗黄焖鸡，爽滑可口，回味无穷',
      //   storeName: '杨铭宇解放东路店',
      //   count: 1,
      // },
      // {
      //   title: '红烧肉',
      //   img: 'http://img5.imgtn.bdimg.com/it/u=2288480414,4197554269&fm=26&gp=0.jpg',
      //   des: '正宗红烧，爽滑可口，回味无穷，让你爱上肉肉',
      //   price: 20,
      //   storeName: '家常菜解放东路店',
      //   count: 1,

      // },
      // {
      //   title: '红烧茄子',
      //   img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1511857250,4075633555&fm=26&gp=0.jpg',
      //   price: 16,
      //   des: '好茄子，正宗口味，吃一次就会爱上',
      //   storeName: '老济南菜馆',
      //   count: 1,

      // },

    ],
    pagination: {
      showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
      defaultPageSize: 10,
    },
    detailLoading: false,
    taskIdDetail: '',
    currentDetail: [],
    currentPagination: {
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
    currentItem: {},
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
    // 查询同步记录列表
    async queryRecordList(dispatch, getState, { payload }) {
      try {
        const { pagination } = getState();
        const res = await inquireRecordList(payload);
        const { code, data, page } = res;
        if (code === '200') {
          dispatch({
            type: 'updateState',
            payload: {
              loading: false,
              dataSource: data || [],
              pagination: {
                ...pagination,
                pageSize: page.rowcount || 10,
                total: page.total || 0,
                current: page.pageno || 1,
              },
            },
          });
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
    // 同步 && 批量同步
    async syncData(dispatch, getState, { payload }) {
      const { searchData, pagination } = getState();
      const res = await sync(payload);
      const { code } = res;
      if (code === '200') {
        message.success('已重新开启同步任务');
        dispatch({
          type: 'queryRecordList',
          payload: {
            ...searchData,
            date: searchData.date.format('YYYY-MM-DD'),
            pageno: pagination.current,
            rowcount: pagination.pageSize,
          },
        });
        dispatch({
          type: 'updateState',
          payload: {
            selectArray: [],
            selectedRow: [],
          },
        });
      } else {
        message.error('操作失败，请重新操作');
      }
    },
    // 删除 && 批量删除
    async delete(dispatch, getState, { payload }) {
      const { searchData, pagination } = getState();
      const res = await remove(payload);
      if (JSON.parse(res).code === '200') {
        message.success('删除成功');
        dispatch({
          type: 'queryRecordList',
          payload: {
            ...searchData,
            date: searchData.date.format('YYYY-MM-DD'),
            pageno: pagination.current,
            rowcount: pagination.pageSize,
          },
        });
        dispatch({
          type: 'updateState',
          payload: {
            selectArray: [],
            selectedRow: [],
          },
        });
      } else {
        message.error('删除失败，请重新操作');
      }
    },
    // 查看失败信息详情
    async queryDetail(dispatch, getState, { payload }) {
      try {
        dispatch({
          type: 'updateState',
          payload: {
            modalVisible: true,
            detailLoading: true,
          },
        });
        const { currentPagination } = getState();
        const res = await inquireDetail(payload);
        const { code, data, page } = res;
        if (code === '200') {
          dispatch({
            type: 'updateState',
            payload: {
              detailLoading: false,
              taskIdDetail: payload.taskId,
              currentDetail: data || [],
              currentPagination: {
                ...currentPagination,
                pageSize: page.rowcount || 10,
                total: page.total || 0,
                current: page.pageno || 1,
              },
            },
          });
        }
      } catch (error) {
        dispatch({
          type: 'updateState',
          payload: {
            // modalVisible: false,
            detailLoading: false,
          },
        });
      }
    },
  },

  async setup(dispatch) {
    dispatch({
      type: 'queryRecordList',
      payload: {
        status: '',
        date: Moment().format('YYYY-MM-DD'),
        pageno: 1,
        rowcount: 10,
      },
    });
  },
};


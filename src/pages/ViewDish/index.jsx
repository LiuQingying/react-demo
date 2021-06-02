
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AutoWrapper } from '@/components/AutoWrapper';
import model from './model';
import Search from './components/search';
import List from './components/list';
import Modal from './components/modal';

@AutoWrapper({ KOSconfig: { model } })
class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      loading,
      searchData,
      selectArray,
      selectedRow,
      dataSource,
      pagination,
      dispatch,
      modalVisible,
      detailLoading,
      taskIdDetail,
      currentDetail,
      currentPagination,
      currentItem,
    } = this.props;
    const searchProps = {
      loading,
      searchData,
      // 搜索列表
      onSearch(values) {
        dispatch({
          type: 'updateState',
          payload: {
            searchData: {
              ...values,
            },
            pagination: {
              ...pagination,
              current: 1,
              pageSize: 10,
            },
            loading: true,
          },
        });
        dispatch({
          type: 'queryRecordList',
          payload: {
            ...values,
            date: values.date.format('YYYY-MM-DD'),
            pageno: 1,
            rowcount: 10,
          },
        });
      },
      onReset() {
        dispatch({
          type: 'updateState',
          payload: {
            searchData: {
              status: '',
              date: moment(),
            },
            pagination: {
              ...pagination,
              current: 1,
              pageSize: 10,
            },
            loading: true,
          },
        });
        dispatch({
          type: 'queryRecordList',
          payload: {
            status: '',
            date: moment().format('YYYY-MM-DD'),
            pageno: 1,
            rowcount: 10,
          },
        });
      },
    };
    const listProps = {
      loading,
      selectArray,
      selectedRow,
      dataSource,
      pagination,
      // 加入购物车
      onClickAddShopCart(item) {
        console.warn(item);

        dispatch({
          type: 'updateState',
          payload: {
            modalVisible: true,
            currentItem: item,
          },
        });
      },
      onPageChange(page) {
        dispatch({
          type: 'updateState',
          payload: {
            selectArray: [],
            selectedRow: [],
          },
        });
        const currPage = page.pageSize === pagination.pageSize ? page.current : 1;
        dispatch({
          type: 'queryRecordList',
          payload: {
            ...searchData,
            date: searchData.date.format('YYYY-MM-DD'),
            pageno: currPage,
            rowcount: page.pageSize,
          },
        });
      },
    };

    const modalProps = {
      visible: modalVisible,
      detailLoading,
      currentDetail,
      currentPagination,
      item: currentItem,
      onPageChange(page) {
        dispatch({
          type: 'queryDetail',
          payload: {
            taskId: taskIdDetail,
            pageno: page.current,
            rowcount: 10,
          },
        });
      },
      // 关掉弹窗
      onCancel() {
        dispatch({
          type: 'updateState',
          payload: {
            modalVisible: false,
            detailLoading: false,
          },
        });
      },
      onOk() {
        dispatch({
          type: 'updateState',
          payload: {
            modalVisible: false,
            detailLoading: false,
          },
        });
      },
    };

    return (
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Search {...searchProps} />
        <List {...listProps} />
        <Modal {...modalProps} />
      </div>
    );
  }
}

Index.propTypes = {
  loading: PropTypes.bool,
  taskIdDetail: PropTypes.string,
  selectArray: PropTypes.array,
  selectedRow: PropTypes.array,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  searchData: PropTypes.object,
  dispatch: PropTypes.func,
  modalVisible: PropTypes.bool,
  detailLoading: PropTypes.bool,
  currentDetail: PropTypes.array,
  currentPagination: PropTypes.object,
  currentItem: PropTypes.object,
};

export default Index;


import React from 'react';
import PropTypes from 'prop-types';
import { AutoWrapper } from '@/components/AutoWrapper';
import model from './model';
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
    const listProps = {
      loading,
      selectArray,
      selectedRow,
      dataSource,
      pagination,
      // 勾选
      onSelect(arr, row) {
        dispatch({
          type: 'updateState',
          payload: {
            selectArray: arr,
            selectedRow: row,
          },
        });
      },
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
      // 删除 && 批量删除
      onDelete(taskIds) {
        dispatch({
          type: 'delete',
          payload: {
            taskIds,
          },
        });
      },
      // 查看失败信息详情
      onDetail(taskId) {
        dispatch({
          type: 'queryDetail',
          payload: {
            taskId,
            pageno: 1,
            rowcount: 10,
          },
        });
      },
      // 分页
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
      // 分页
      onPageChange(page) {
        // const currPage = page.pageSize === pagination.pageSize ? page.current : 1;
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

/*
 * @Author: LiuQingying
 * @Date: 2019-12-26 14:18:19
 * @Last Modified by: LiuQingying
 * @Last Modified time: 2019-12-28 13:35:01
 */

import React from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { AutoWrapper } from '@/components/AutoWrapper';
// import history from '@/common/utils/history';
import model from './model';
import Search from './components/search';
import List from './components/list';
// import Modal from './components/modal';
// import DetailModal from './components/detailModal';

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
      // modalVisible,
      // detailLoading,
      // taskIdDetail,
      // currentDetail,
      // currentPagination,
      tenantList,
      searchInfo,
      storeList,
    } = this.props;
    let timeoutId = 0;
    const searchProps = {
      // loading,
      searchData,
      dispatch,
      // 搜索列表
      onSearch(values) {
        dispatch({
          type: 'grayPlat/queryGrayPostList',
          payload: {
            pageNo: 1,
            pageSize: 10,
            tenantId: values.tenantId.key,
            storeId: values.storeId ? values.storeId.key : '',
            prePaymentEnabled: values.storeConfig.includes('before') ? 0 : 1,
            preOrderEnabled: values.storeConfig.includes('preFood') ? 1 : 0,
            grayscaleFlag: values.grayscaleFlag,
          },
        });
        dispatch({
          type: 'updateState',
          payload: {
            searchInfo: {
              tenantId: values.tenantId.key,
              storeId: values.storeId ? values.storeId.key : '',
              prePaymentEnabled: values.storeConfig.includes('before') ? 0 : 1,
              preOrderEnabled: values.storeConfig.includes('preFood') ? 1 : 0,
              grayscaleFlag: values.grayscaleFlag,
            },
            pagination: {
              ...pagination,
              current: 1,
              pageSize: 10,
            },
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
            // loading: true,
          },
        });
      },
      onSearchStore(value) {
        if (!value || value.length < 1) {
          return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          dispatch({
            type: 'grayPlat/queryStoreList',
            payload: {
              tenantId: value.key,
            },
          });
        }, 1000);
      },
      tenantList,
      searchInfo,
      storeList,
    };
    const listProps = {
      loading,
      selectArray,
      selectedRow,
      dataSource,
      pagination,
      // 勾选
      onSelect(selectedRowKeys, selectedRows) {
        dispatch({
          type: 'updateState',
          payload: {
            selectArray: selectedRowKeys,
            selectedRow: selectedRows,
          },
        });
      },
      onBatchSetGray() {
        dispatch({
          type: 'grayPlat/graySet',
          payload: {
            storeList: cloneDeep(selectedRow.filter(item => item.grayscaleFlag !== 1)).map((item) => {
              item.grayscaleFlag = 1;
              return item;
            }),
            gray: 1,
          },
        });
      },
      onBatchCancelGray() {
        dispatch({
          type: 'grayPlat/graySet',
          payload: {
            storeList: cloneDeep(selectedRow.filter(item => item.grayscaleFlag === 1)).map((item) => {
              item.grayscaleFlag = 0;
              return item;
            }),
            gray: 0,
          },
        });
      },
      onSetGray(value) {
        value.graFlag = 1;
        dispatch({
          type: 'grayPlat/graySet',
          payload: {
            storeList: [value],
            gray: 1,
          },
        });
      },
      onCancelGray(value) {
        value.graFlag = 0;
        dispatch({
          type: 'grayPlat/graySet',
          payload: {
            storeList: [value],
            gray: 0,
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
          type: 'grayPlat/queryGrayPostList',
          payload: {
            ...searchInfo,
            pageNo: currPage,
            pageSize: page.pageSize,
          },
        });
      },
    };

    return (
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <Search {...searchProps} />
        <List {...listProps} />
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
  tenantList: PropTypes.array,
  searchInfo: PropTypes.object,
  storeList: PropTypes.array,
};

export default Index;

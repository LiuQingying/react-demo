
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, Modal } from 'antd';

const List = ({
  loading,
  selectArray,
  selectedRow,
  dataSource,
  pagination,
  onBatchSetGray,
  onBatchCancelGray,
  onSetGray,
  onCancelGray,
  onSelect,
  onPageChange,
}) => {
  // eslint-disable-next-line prefer-destructuring
  const confirm = Modal.confirm;
  const rowSelection = {
    selectedRowKeys: selectArray,
    onChange(selectedRowKeys, selectedRows) {
      onSelect(selectedRowKeys, selectedRows);
    },
  };
  const columns = [
    {
      title: '商户名称',
      dataIndex: 'tenName',
      key: 'tenName',
      width: 180,
      render: text => text || '--',
    },
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
      width: 230,
      render: text => text || '--',
    },
    {
      title: '先付',
      dataIndex: 'prePaymentEnabled',
      key: 'prePaymentEnabled',
      width: 170,
      render: text => (text === 0 ? '是' : '否'),
    },
    // {
    //   title: '后付',
    //   dataIndex: 'taskStartTime',
    //   key: 'taskStartTime',
    //   width: 140,
    //   render: text => (text === 0 ? '先付' : '后付'),
    // },
    {
      title: '预点餐',
      dataIndex: 'preOrderEnabled',
      key: 'preOrderEnabled',
      width: 140,
      render: text => (text === 1 ? '是' : '否'),
    },
    {
      title: '是否灰度',
      dataIndex: 'grayscaleFlag',
      key: 'grayscaleFlag',
      width: 90,
      render: text => (text === 1 ? '是' : '否'),
    },
    {
      title: '操作',
      key: 'operation',
      // width: '120',
      render: (text, record) => (
        <div>
          {record.grayscaleFlag === 1 &&
            <span>
              <Popconfirm
                style={{ padding: 0 }}
                placement="top"
                title="确定取消灰度吗？"
                onConfirm={() => onCancelGray(record)}
                okText="确定"
                cancelText="取消"
              >
                <button className="btn-link">取消灰度</button>
              </Popconfirm>
            </span>}
          {record.grayscaleFlag !== 1 &&
            <Popconfirm
              style={{ padding: 0 }}
              placement="top"
              title="确定设置灰度吗？"
              onConfirm={() => onSetGray(record)}
              okText="确定"
              cancelText="取消"
            >
              <button className="btn-link">设置灰度</button>
            </Popconfirm>
            }
        </div>
      ),
    },
  ];
  // 确认弹窗
  const handleShowConfirm = (e) => {
    const info = e.target.value;
    let number = 0;
    let content = '';
    const selectedItemNumber = selectedRow.length;
    switch (info) {
      case '批量设置灰度':
        number = selectedRow.filter(item => item.grayscaleFlag !== 1).length;
        content = `当前选中${selectedItemNumber}个，可设置${number}个！`;
        break;
      case '批量取消灰度':
        number = selectedRow.filter(item => item.grayscaleFlag === 1).length;
        content = `当前选中${selectedItemNumber}个，可取消${number}个！`;
        break;
      default:
        break;
    }
    if (number === selectedRow.length) {
      switch (info) {
        case '批量设置灰度':
          onBatchSetGray();
          break;
        case '批量取消灰度':
          onBatchCancelGray();
          break;
        default:
          break;
      }
    } else {
      confirm({
        title: `确定${e.target.value}吗？`,
        content,
        cancelText: '取消',
        okText: '确定',
        onOk() {
          switch (info) {
            case '批量设置灰度':
              onBatchSetGray();
              break;
            case '批量取消灰度':
              onBatchCancelGray();
              break;
            default:
              break;
          }
        },
        onCancel() {
        },
      });
    }
  };
  console.log('3333', pagination);
  const TABLE_HEIGHT = '155px';
  return (
    <div>
      <Button value="批量设置灰度" disabled={selectedRow.filter(item => item.grayscaleFlag !== 1).length < 1}onClick={handleShowConfirm} style={{ marginRight: '16px' }}>
        批量设置灰度
      </Button>
      <Button value="批量取消灰度" disabled={selectedRow.filter(item => item.grayscaleFlag === 1).length < 1}type="default" onClick={handleShowConfirm}>
        批量取消灰度
      </Button>
      <Table
        rowKey={record => record.storeId}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        style={{ marginTop: 16 }}
        onChange={e => onPageChange(e)}
        loading={loading}
        bordered
        rowSelection={rowSelection}
        scroll={{ y: `calc(100vh - ${TABLE_HEIGHT})` }}
      />
    </div>
  );
};

List.propTypes = {
  loading: PropTypes.bool,
  selectArray: PropTypes.array,
  selectedRow: PropTypes.array,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onSetGray: PropTypes.func,
  onCancelGray: PropTypes.func,
  onBatchCancelGray: PropTypes.func,
  onBatchSetGray: PropTypes.func,
  onSelect: PropTypes.func,
  onPageChange: PropTypes.func,
};

export default List;

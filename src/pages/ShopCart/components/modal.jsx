
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Card } from 'antd';
import styles from './styles.less';

const modal = ({
  visible,
  item,
  onCancel,
  onOk,
}) => {
  const modalProps = {
    title: '加入购物车',
    width: 650,
    visible,
    onCancel,
    onOk,
    maskClosable: false,
    centered: true,
  };
  return (
    <Modal {...modalProps}>
      <Card title={item.title}>
        <div style={{ display: 'flex' }} >
          <img style={{ height: '200px', width: '200px' }} src={item.img} alt={item.name} />
          <div style={{ display: 'flex', flexFlow: 'column' }}>
            <span className={styles.myspan}> {`门店：${item.storeName}`} </span>
            <span style={{ marginLeft: 10, marginTop: 10, color: '#333' }} >{`简介：${item.des}`} </span>
            <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`单价：￥${item.price}`} </span>
            <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`数量：${item.count}`} </span>
            <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`总价：￥${item.count * item.price}`} </span>

            <div style={{ display: 'flex', marginLeft: 10, alignItems: 'center' }} />
          </div>
        </div>

      </Card>
    </Modal>
  );
};

modal.propTypes = {
  visible: PropTypes.bool,
  detailLoading: PropTypes.bool,
  currentDetail: PropTypes.array,
  currentPagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onCancel: PropTypes.func,
  item: PropTypes.object,
  onOk: PropTypes.func,
};
export default modal;

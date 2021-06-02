/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Card } from 'antd';

const modal = ({
  visible,
  item,
  onCancel,
  onOk,
}) => {
  const modalProps = {
    title: '请用支付宝或者微信扫码支付',
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
          <img style={{ height: '200px', width: '200px' }} src={require('../../../common/images/code.png')} alt={item.name} />
        </div>
        {/* <div>
          支付成功，请等待商家配送
        </div> */}
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

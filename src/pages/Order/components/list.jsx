/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import styles from './styles.less';

const DishView = ({
  dataSource,
}) => (
  <div>
    <div style={{ display: 'flex', flexFlow: 'column', marginBottom: 20 }}>

      <div className={styles.title}>
        订单中心
      </div>
    </div>
    <List
      grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    }}
      dataSource={dataSource}
      renderItem={item => (
        <List.Item>
          <Card title={item.title}>
            <div style={{ display: 'flex' }} >
              <img style={{ height: '200px', width: '200px' }} src={item.img} alt={item.name} />
              <div style={{ display: 'flex', flexFlow: 'column' }}>
                <span className={styles.myspan}> {`下单时间：${item.orderTime}`} </span>
                <span className={styles.myspan}> {`订单号：${item.orderNo}`} </span>
                <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`总价：￥${item.count * item.price}`} </span>
                <img style={{ marginLeft: 10, marginTop: 10, height: '50px', width: '50px' }} src={require('../../../common/images/code.png')} alt={item.name} />
              </div>
            </div>

          </Card>
        </List.Item>
    )}
    />
  </div>
);

DishView.propTypes = {
  dataSource: PropTypes.array,
};

export default DishView;

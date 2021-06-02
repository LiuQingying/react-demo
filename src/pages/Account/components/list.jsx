
import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button, Affix } from 'antd';
import styles from './styles.less';

const DishView = ({
  dataSource,
  onPay,
  onBack,
}) => (
  <div>
    <div style={{ display: 'flex', flexFlow: 'column', marginBottom: 20 }}>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Button type="primary" className={styles.account}>外卖配送</Button>
        <Button className={styles.account} style={{ marginLeft: 20 }}>到店就餐</Button>
      </div>
      <div style={{ color: '#f81212', marginBottom: 10 }}>
        总费用：￥282
      </div>
      <div style={{ marginBottom: 10 }}>
        配送地址：济南市历下区解放东路政法学院
      </div>
      <div>
        备注：不要辣椒，不要香菜，谢谢，请尽快送达。
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
                <span className={styles.myspan}> {`门店：${item.storeName}`} </span>
                <span style={{ marginLeft: 10, marginTop: 10, color: '#333' }} >{`简介：${item.des}`} </span>
                <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`单价：￥${item.price}`} </span>
                <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`数量：${item.count}`} </span>
                <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`总价：￥${item.count * item.price}`} </span>
              </div>


            </div>

          </Card>
        </List.Item>
    )}
    />
    <Affix offsetBottom={0} style={{ alignContent: 'center', alignItems: 'center' }}>
      <Button onClick={onBack} className={styles.account}>返回</Button>
      <Button onClick={onPay} className={styles.account} style={{ marginLeft: 20 }} type="primary">付款</Button>
    </Affix>
  </div>
);

DishView.propTypes = {
  dataSource: PropTypes.array,
  onPay: PropTypes.func,
  onBack: PropTypes.func,
};

export default DishView;

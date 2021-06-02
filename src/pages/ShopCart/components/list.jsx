
import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Button, Affix } from 'antd';
import styles from './styles.less';

const DishView = ({
  dataSource,
}) => (
  <div>

    <div style={{ margin: 10 }}>所有菜品</div>
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
      <Button className={styles.account}>返回</Button>
      <Button className={styles.account} style={{ marginLeft: 20 }} type="primary">去结算</Button>
    </Affix>
  </div>
);

DishView.propTypes = {
  dataSource: PropTypes.array,
};

export default DishView;

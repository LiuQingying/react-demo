
import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Input, Button } from 'antd';
import styles from './styles.less';

const DishView = ({
  dataSource,
  onClickAdd,
  onClickSub,
  onClickAddShopCart,
}) => (

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
              <span style={{ marginLeft: 10, marginTop: 10, color: '#333', whiteSpace: 'break' }} >{`简介：${item.des}`} </span>
              <span style={{ marginLeft: 10, marginTop: 10, color: '#f81212' }} >{`￥${item.price}`} </span>
              <div style={{ display: 'flex', marginLeft: 10, alignItems: 'center' }}>
                <span onClick={onClickSub}>-</span>
                <Input defaultValue="1" style={{ width: 100, margin: 10, textAlign: 'center' }} />
                <span onClick={onClickAdd}>+</span>
              </div>
              <Button style={{ marginLeft: 10, width: 100, color: '#fff', backgroundColor: '#dd6d18' }} onClick={() => onClickAddShopCart(item)}>加入购物车</Button>

            </div>


          </div>

        </Card>
      </List.Item>
    )}
  />

);

DishView.propTypes = {
  dataSource: PropTypes.array,
  onClickAdd: PropTypes.func,
  onClickSub: PropTypes.func,
  onClickAddShopCart: PropTypes.any,
};

export default DishView;

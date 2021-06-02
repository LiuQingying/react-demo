
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Input } from 'antd';

import styles from './styles.less';

const FormItem = Form.Item;

const Search = ({
  loading,
  searchData,
  onSearch,
  onReset,
  form: { getFieldDecorator, getFieldsValue, resetFields },
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(getFieldsValue());
  };
  const handleReset = () => {
    resetFields();
    onReset();
  };
  return (
    <div className="components-search search">
      <Form onSubmit={handleSearch} layout="inline">
        <Row>
          <Col span={24} xxl={24} style={{ marginLeft: 0, marginBottom: 20 }}>
            <div className={styles.welecom}>欢迎使用订餐系统</div>
          </Col>
        </Row>
        <Row>
          <Col span={8} xxl={6}>
            <FormItem label="菜品名称">
              {getFieldDecorator('dishName', {
                initialValue: searchData.dishName,
              })(<Input
                placeholder="请输入菜品名称"
              />)}
            </FormItem>
          </Col>
          <Col span={8} xxl={6}>
            <FormItem label="菜品价格范围">
              {getFieldDecorator('price', {
                initialValue: searchData.price,
              })(<Input
                placeholder="请输入菜品价格范围"
              />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8} xxl={6}>
            <FormItem label="位置">
              {getFieldDecorator('address', {
                initialValue: '济南',
              })(<Input
                placeholder="请输入菜品名称"
              />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8} xxl={12} style={{ marginLeft: 30, marginBottom: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '20px' }}
              loading={loading}
            >搜索</Button>
            <Button onClick={handleReset}>清除条件</Button>
          </Col>
        </Row>
        <Row>
          <Col span={8} xxl={12} style={{ marginLeft: 30, marginBottom: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '16px', backgroundColor: '#dd6d18', color: '#fff', borderColor: '#dd6d18' }}
              loading={loading}
            >去购物车</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '16px', backgroundColor: '#e44025', color: '#fff', borderColor: '#e44025' }}
              loading={loading}
            >订单中心</Button>
          </Col>
        </Row>
      </Form>

    </div>
  );
};

Search.propTypes = {
  loading: PropTypes.bool,
  searchData: PropTypes.object,
  form: PropTypes.object,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
};

export default Form.create()(Search);

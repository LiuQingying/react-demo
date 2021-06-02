
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, Button, Checkbox, message } from 'antd';


const FormItem = Form.Item;
const { Option } = Select;

const Search = ({
  loading,
  onSearch,
  onReset,
  form: { getFieldDecorator, getFieldsValue, resetFields },
  tenantList,
  dispatch,
  searchInfo,
  // onSearchStore,
  storeList,
}) => {
  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      md: { span: 11 },
    },
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (!getFieldsValue().tenantId) {
      message.warning('请选择商户');
      return;
    }
    onSearch(getFieldsValue());
  };
  const handleReset = () => {
    resetFields();
    onReset();
  };
  const pidLabel = (
    <span>
      <span
        style={{
          color: '#f5222d',
          marginRight: '4px',
          fontFamily: 'SimSun',
          lineHeight: '1',
          fontSize: '14px',
        }}
      >
        *
      </span>
      商户
    </span>
  );
  const onChange = (value) => {
    console.log('123456', value);
    if (searchInfo.tenantId !== value) {
      searchInfo.storeName = null;
      searchInfo.storeId = null;
      dispatch({
        type: 'grayPlat/updateState',
        searchInfo,
      });
    }
    searchInfo.tenantId = value.key;
    searchInfo.tenantName = value.label;
    dispatch({ type: 'grayPlat/queryStoreList',
      payload: { tenantId: value.key } });
    dispatch({ type: 'grayPlat/updateState',
      payload: { tenantId: value.key, searchInfo } });
  };
  const onSelectStoreChange = (value) => {
    searchInfo.storeId = value.key;
    searchInfo.storeName = value.label;
    dispatch({ type: 'grayPlat/updateState',
      payload: { storeId: value, searchInfo } });
  };
  return (
    <div className="components-search search">
      <div className="action-box">
        <Form onSubmit={handleSearch} layout="inline">
          <Row>
            <Col span={8} xl={8} xxl={8}>
              <FormItem {...formItemLayout} label={pidLabel}>
                {getFieldDecorator('tenantId', {
                  // initialValue: '',
                })(<Select
                  labelInValue
                  showSearch
                  onChange={onChange}
                  placeholder="请选择商户"
                  // onSearch={onSearchTenant}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {tenantList.map(item => (
                    <Option value={item.tenantId}>{item.tenantName}</Option>
                    ))}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8} xl={8} xxl={8}>
              <FormItem label="门店">
                {getFieldDecorator('storeId', {
                })(<Select
                  labelInValue
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="请选择门店"
                  showSearch
                  onChange={onSelectStoreChange}
                  // onSearch={onSearchStore}
                >
                  {storeList.map(item => (
                    <Option value={item.storeId}>{item.storeName}</Option>
                    ))}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={8} xl={8} xxl={8}>
              <FormItem {...formItemLayout} label="门店配置">
                {getFieldDecorator('storeConfig', {
                  initialValue: [],
                })(<Checkbox.Group>
                  <Checkbox value="before">先付</Checkbox>
                  <Checkbox value="preFood">预点餐</Checkbox>
                </Checkbox.Group>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8} xxl={8}>
              <FormItem {...formItemLayout} label="是否灰度">
                {getFieldDecorator('grayscaleFlag', {
                initialValue: 1,
              })(<Select placeholder="请选择状态">
                <Option value={1}>是</Option>
                <Option value={0}>否</Option>
              </Select>)}
              </FormItem>
            </Col>
            <Col span={16} xxl={16} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '16px' }}
                loading={loading}
              >搜索</Button>
              <Button onClick={handleReset}>清除条件</Button>
            </Col>
          </Row>
        </Form>
      </div>

    </div>
  );
};

Search.propTypes = {
  loading: PropTypes.bool,
  searchData: PropTypes.object,
  form: PropTypes.object,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
  tenantList: PropTypes.array,
  dispatch: PropTypes.func,
  searchInfo: PropTypes.object,
  onSearchStore: PropTypes.func,
  storeList: PropTypes.array,
};

export default Form.create()(Search);

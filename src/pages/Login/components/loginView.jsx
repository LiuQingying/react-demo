
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Input, Col } from 'antd';
import styles from './login.less';
import config from '../../../common/utils/config.js';

const FormItem = Form.Item;

const LoginView = ({
  loading,
  username,
  password,
  phoneNumber,
  count,
  onLogin,
  onBindPhone,
  onHandleForgetPassword,
  onSendMsg,
  loginModal,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  const handleSubmit = () => {
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onLogin(values);
      }
    });
  };
  const handleSendMsg = () => {
    validateFields(['phoneNumber'], (err, values) => {
      if (!err && count === '') {
        onSendMsg(values);
      }
    });
  };
  const handleBindPhone = () => {
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onBindPhone(values);
      }
    });
  };
  const handleForgetPassword = () => {
    onHandleForgetPassword();
  };
  return (
    <div className={styles.form}>
      <div className={styles.login}>
        {loginModal === 'pwLogin' && <div style={{ padding: '36px' }}>
          <div className={styles.logo}>
            <span className={styles.imgs} />
            <span>{config.name}</span>
          </div>
          <Form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                initialValue: username,
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input onPressEnter={handleSubmit} size="large" placeholder="用户名" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                initialValue: password,
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ],
              })(<Input onPressEnter={handleSubmit} size="large" type="password" placeholder="密码" />)}
            </FormItem>

            <Row>
              <FormItem>
                <Button type="primary" size="large" onClick={handleSubmit} loading={loading}>
                  登录
                </Button>
              </FormItem>
              <FormItem style={{ height: '20px', marginBottom: '10px' }}>
                <span onClick={handleForgetPassword} style={{ color: '#1890ff', textAlign: 'right', float: 'right' }}>忘记密码？</span>
              </FormItem>
              <p>
                <span>{config.footerText}</span>
              </p>
            </Row>
          </Form>
        </div>}
        {<div id="codeWrap" className={loginModal !== 'scanCodeLogin' ? styles.notShow : ''} style={{ background: '#fff' }} />}
        {loginModal === 'bindPhone' && <div style={{ padding: '36px' }}>
          <div style={{ padding: '15px 0' }}>请绑定手机号</div>
          <Form>
            <FormItem>
              {getFieldDecorator('phoneNumber', {
                initialValue: phoneNumber,
                validateTrigger: 'onSublime',
                rules: [
                  {
                    required: true,
                    message: '请输入正确的手机号',
                    pattern: '^(0|86|17951)?(13[0-9]|14[01456789]|15[0-9]|16[2567]|17[012345678]|18[0-9]|19[189])[0-9]{8}$',
                  },
                ],
              })(<Input size="large" placeholder="手机号" />)}
            </FormItem>
            <FormItem>
              <Row gutter={24}>
                <Col span={14}>
                  {getFieldDecorator('authCode', {
                    validateTrigger: 'onSubmit',
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ],
                  })(<Input size="large" placeholder="请输入验证码" />)}
                </Col>
                <Col span={10}>
                  <Button
                    size="large"
                    type="primary"
                    className={styles.authCode}
                    onClick={handleSendMsg}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
            <Row>
              <FormItem>
                <Button type="primary" size="large" onClick={handleBindPhone} loading={loading}>
                  确认绑定
                </Button>
              </FormItem>
              <p>
                <span>{config.footerText}</span>
              </p>
            </Row>
          </Form>
        </div>}
      </div>
    </div>
  );
};

LoginView.propTypes = {
  loading: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  form: PropTypes.object,
  onLogin: PropTypes.func,
  phoneNumber: PropTypes.string,
  count: PropTypes.string,
  onBindPhone: PropTypes.func,
  onHandleForgetPassword: PropTypes.func,
  onSendMsg: PropTypes.func,
  loginModal: PropTypes.string,
};

export default Form.create()(LoginView);

/*
 * @Author: LiuQingying
 * @Date: 2019-2-26 14:18:19
 * @Last Modified by: LiuQingying
 */

import React from 'react';
import PropTypes from 'prop-types';
import { AutoWrapper } from '@/components/AutoWrapper';
import model from './model';
import LoginView from './components/loginView';

@AutoWrapper({ KOSconfig: { model } })
class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { username, password, loginModal, phoneNumber, count, token, dispatch,
    } = this.props;
    const loginInfo = {
      username,
      password,
      loginModal,
      phoneNumber,
      count,
      onLogin(value) {
        dispatch({
          type: 'login/login',
          payload: {
            username: value.username,
            password: value.password,
            tenClass: '2',
          },
        });
      },
      onChangeLoginWay() {
        const way = loginModal === 'pwLogin' ? 'scanCodeLogin' : 'pwLogin';
        dispatch({
          type: 'login/updateState',
          payload: {
            loginModal: way,
          },
        });
        if (loginModal === 'pwLogin') {
          let DDObj = DDLogin(ddObj); // eslint-disable-line
        }
      },
      onSendMsg(value) {
        dispatch({
          type: 'login/sendPhoneNumber',
          payload: {
            mobile: value.phoneNumber,
          },
        });
        let time = 60;
        const timer = setInterval(() => {
          time = time <= 0 ? '' : time - 1;
          dispatch({
            type: 'login/updateState',
            payload: {
              count: time,
            },
          });
          if (time === '') {
            clearInterval(timer);
          }
        }, 1000);
      },
      onBindPhone(value) {
        dispatch({
          type: 'login/bindPhone',
          payload: {
            accessToken: token,
            verificationCode: value.authCode,
            mobile: value.phoneNumber,
          },
        });
      },
    };
    return (
      <div style={{ height: '100vh', overflowY: 'auto' }}>
        <LoginView {...loginInfo} />
      </div>
    );
  }
}

Index.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  loginModal: PropTypes.string,
  phoneNumber: PropTypes.string,
  count: PropTypes.string,
  token: PropTypes.string,
  dispatch: PropTypes.any,
};

export default Index;

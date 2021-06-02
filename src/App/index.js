import React from 'react';
import PropTypes from 'prop-types';
import KOS from 'kos-core';
import { Card } from 'antd';
// import { Helmet } from 'react-helmet';
// import pathToRegexp from 'path-to-regexp';
// import classNames from 'classnames';
import Error from '@/components/Error';
import model from '@/App/model';
// import { Header, Sider, Bread } from '@/App/layout';
import styles from './index.less';
import '../common/themes/index.less';
import config from '../common/utils/config';


const { openPages } = config;

@KOS.Wrapper({ model, autoReset: false })
class App extends React.PureComponent {
  render() {
    const {
      // dispatch,
      children,
      location,
      // user,
      // siderFold,
      // darkTheme,
      // isNavbar,
      // menuPopoverVisible,
      // navOpenKeys,
      // menu,
      // menuType,
      // isPersonal,
      // applicationName,
      // permissions,
      // firstMenu,
    } = this.props;
    // 根据menuType取得当前展示菜单跟permission
    let { pathname } = location;
    if (pathname === '/') window.location.href = '/index.html#/login';

    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

    // const menuData = menu.appPacks && menu.appPacks[applicationName] ? menu.appPacks[applicationName] : [];
    // const permissionsArray = permissions.visit.appPacks
    //   ? permissions.visit.appPacks[applicationName] : [];

    // const current = menuData.length > 0 ? menuData.filter(item => pathToRegexp(item.route || '').exec(pathname)) : [];
    // const hasPermission = current.length ? permissionsArray.includes(current[0].id) : false;
    const hasPermission = true;
    // const headerProps = {
    //   menu: menuData,
    //   firstMenu,
    //   isPersonal,
    //   location,
    //   user,
    //   siderFold,
    //   isNavbar,
    //   menuPopoverVisible,
    //   navOpenKeys,
    //   applicationName,
    //   // 退出主系统
    //   logout() {
    //     dispatch({
    //       type: 'logoutSystem',
    //     });
    //   },
    //   // 设置是否是个人中心，用来控制左侧菜单
    //   onChangePersonal() {
    //     dispatch({
    //       type: 'system/updateState',
    //       payload: {
    //         isPersonal: false,
    //       },
    //     });
    //   },
    //   // 右上角个人中心菜单
    //   changePersonalStatus() {
    //     dispatch({
    //       type: 'system/updateState',
    //       payload: {
    //         personalBtnStatus: true,
    //       },
    //     });
    //   },
    //   // 清除菜单项 key 数组
    //   onChangeMenu() {
    //     dispatch({
    //       type: 'system/changeFirstMenu',
    //     });
    //   },
    // };
    // const siderProps = {
    //   menu: menuData,
    //   isPersonal,
    //   siderFold,
    //   darkTheme,
    //   navOpenKeys,
    //   isNavbar,
    //   menuPopoverVisible,
    //   changeTheme() {
    //     dispatch({ type: 'switchTheme' });
    //   },
    //   // 菜单项 key 数组
    //   changeOpenKeys(openKeys) {
    //     dispatch({ type: 'handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    //   },
    //   switchMenuPopover() {
    //     dispatch({ type: 'switchMenuPopver' });
    //   },
    //   // 左侧菜单折叠
    //   switchSider() {
    //     dispatch({ type: 'switchSider' });
    //   },
    // };
    // const breadProps = {
    //   menu: menuData,
    //   location,
    // };
    if (openPages && openPages.includes(pathname)) {
      return (<div>
        {children}
      </div>);
    }
    return (
      <div>
        {/* <Helmet>
          <title>数据同步</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <Header {...headerProps} />
        <div
          className={classNames(styles.layout, { [styles.fold]: siderFold })}
        >
          <aside className={classNames(styles.sider, { [styles.light]: !darkTheme })}>
            <Sider {...siderProps} />
          </aside>
          <div className={styles.main}>
            <Bread {...breadProps} /> */}
        <div className={styles.container}>
          <Card bordered={false}>
            {
                  hasPermission ? children : <Error type="404" />
                }
          </Card>
        </div>
        {/* </div>
        </div> */}
      </div>
    );
  }
}

App.propTypes = {
  // dispatch: PropTypes.func,
  location: PropTypes.object,
  // user: PropTypes.object,
  // siderFold: PropTypes.bool,
  // darkTheme: PropTypes.bool,
  // isNavbar: PropTypes.bool,
  // menuPopoverVisible: PropTypes.bool,
  // navOpenKeys: PropTypes.array,
  // menu: PropTypes.array,
  // isPersonal: PropTypes.bool,
  // applicationName: PropTypes.string,
  // permissions: PropTypes.object,
  // firstMenu: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default App;

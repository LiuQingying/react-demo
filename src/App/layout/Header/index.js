import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import ChoiceCC from 'choice-cc';
import config from '@/common/utils/config';
import styles from './index.less';
import { getSession, arrayToTree } from './utils';

const isIncredible = '';
const Header = ({
  user,
  logout,
  // location,
  firstMenu,
  applicationName,
  changePersonalStatus,
  onChangePersonal,
  onChangeMenu,
}) => {
  // 菜单级别
  const levelMapSystem = {};
  const levelMapApp = {};
  // 递归生成菜单
  const getMenus = (menuTreeN, siderFoldN, menuType) => menuTreeN.map((item) => {
    if (item.children) {
      if (item.mpid) {
        if (menuType === 'system') {
          levelMapSystem[item.id] = item.mpid;
        } else if (menuType === 'app') {
          levelMapApp[item.id] = item.mpid;
        }
      }
      return (
        <Menu.SubMenu
          key={item.id}
          title={<span>
            {item.icon && <Icon type={item.icon} />}
            {(!siderFoldN || !menuTreeN.includes(item)) && item.name}
          </span>}
        >
          {getMenus(item.children, siderFoldN)}
        </Menu.SubMenu>
      );
    }

    let href = '#';
    const { origin } = window.location;
    // 兼容非会员系统（iframe嵌套的应用和 system）
    href = `${origin}/index.html#${item.route}`;
    // 如果是会员系统跳转到自己的系统
    if (item.id === 'member') {
      href = `${origin}/${applicationName}/index.html#${item.route}`;
    }
    // 如果是报表跳转到自己的系统
    if (item.id === 'ar' && item.route.indexOf('/appPacks/report') === -1) {
      href = `${origin}/reports/index.html#${item.route}`;
    }
    // 如果是扫码点餐系统
    if (item.id === 'standardOrder') {
      href = `${origin}/standardOrder/index.html#${item.route}`;
    }
    // 如果是数据同步系统
    if (item.id === 'data-sync') {
      href = `${origin}/data-sync/index.html#/syncRecord`;
    }
    return (
      <Menu.Item key={item.id}>
        {!['610000', 'member'].includes(item.id) ?
          <a href={href}>
            {item.icon && <Icon type={item.icon} />}
            {(!siderFoldN || !menuTreeN.includes(item)) && item.name}
          </a> : <a onClick={onChangeMenu}>
            {item.icon && <Icon type={item.icon} />}
            {(!siderFoldN || !menuTreeN.includes(item)) && item.name}
          </a>
        }
      </Menu.Item>
    );
  });
  // 生成系统菜单
  const menuSystem = firstMenu.system ? arrayToTree(firstMenu.system.filter(_ => _.mpid !== '-1'), 'id', 'mpid') : [];
  const menuSystemItems = getMenus(menuSystem, false, 'system');
  const menuApp = firstMenu.appPacks ? arrayToTree(firstMenu.appPacks.filter(_ => _.mpid !== '-1'), 'id', 'mpid') : [];
  const menuAppItems = getMenus(menuApp, false, 'app');
  const handleClickMenu = (e) => {
    if (e.key === 'logout') {
      logout();
    }
    if (e.key === 'personal') {
      // 个人中心
    }
  };
  const onFirstMenuChange = (e) => {
    if (e.key === 'set') {
      onChangePersonal(); // 修改是否个人中心状态
    }
    // 如果是供应链，则跳转到供应链
    if (e.key === '610000') {
      let res = {};
      // eslint-disable-next-line no-unused-expressions
      firstMenu.appPacks && JSON.parse(getSession('cloudMenuTree')).firstMenu.appPacks.forEach((item) => {
        if (item.id === '610000') {
          res = item;
        }
      });
      window.location = `${config.domainScm + res.route}?accessToken=${getSession('accessToken')}&refreshToken=${getSession('refreshToken')}`;
      // window.location = `${config.domainScm + res.route}?sessionId=${getSession('sessionId')}`;
    }
    // 如果是报表， 跳转
    if (e.key === 'ar') {
      let res = {};
      // eslint-disable-next-line no-unused-expressions
      firstMenu.appPacks &&
        JSON.parse(getSession('cloudMenuTree')).firstMenu.appPacks.forEach((item) => {
          if (item.id === 'ar') {
            res = item;
          }
        });
      if (res.route.indexOf('/appPacks/report/') === -1) { // 如果是新报表
        window.location = `${window.location.origin}/reports/index.html#${res.route}`;
      } else {
        window.location = `${window.location.origin}/index.html#${res.route}`;
      }
    }
  };

  const userMenu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item key="personal"><a rel="noopener noreferrer" onClick={changePersonalStatus} target="_self" href={`${window.location.origin}/index.html#/system/personal/baseInfo`}><i className="iconfont icon-cho-personal" /> 个人中心</a></Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout"><i className="iconfont icon-cho-exit" /> 退出登录</Menu.Item>
    </Menu>
  );
  const dropdownProps = {
    placement: 'bottomRight',
  };
  // 消息中心
  const InformCenterProps = {
    style: { width: 30, height: 30, fontSize: 20, lineHeight: '64px' },
    overflowCount: 99,
    offset: [-2, 15],
    absoluteRequestPath: true,
  };
  return (
    <div className={styles.header} id={isIncredible ? 'cloud-header' : ''}>
      <div className={classNames(styles.leftLogo, 'leftLogo')}><figure /></div>
      <div className={classNames(styles.leftMenus, 'leftMenus')}>
        <Menu
          onClick={onFirstMenuChange}
          selectedKeys={[applicationName]}
          mode="horizontal"
          style={{ fontSize: 16, lineHeight: '64px' }}
        >
          {menuAppItems}
        </Menu>
      </div>
      <div className={classNames(styles.rightMenus, 'rightMenus')}>
        <div onClick={() => (window.location.href = `http://${window.location.host}/index.html#/system/informcenter`)}>
          <ChoiceCC.InformCenter {...InformCenterProps} />
        </div>
        <Menu mode="horizontal" style={{ fontSize: 16, lineHeight: '64px' }}>
          {menuSystemItems}
        </Menu>
        <Dropdown overlay={userMenu} {...dropdownProps}>
          <div className={classNames(styles.user, 'user')}>
            <div className={styles.divider} />
            <div className={classNames(styles.info, 'info')}>
              <p className={classNames(styles.name, 'name')}>{user.username}</p>
              <p className={classNames(styles.store, 'store')}>{user.tenantName}</p>
            </div>
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
  firstMenu: PropTypes.object,
  applicationName: PropTypes.string,
  changePersonalStatus: PropTypes.func,
  onChangePersonal: PropTypes.func,
  onChangeMenu: PropTypes.func,
};

export default Header;

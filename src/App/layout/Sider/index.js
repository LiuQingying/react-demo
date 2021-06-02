import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Menus from './Menus';


const Sider = ({
  darkTheme,
  siderFold,
  location,
  switchSider,
  navOpenKeys,
  changeOpenKeys,
  menu,
  isPersonal,
}) => {
  const menusProps = {
    menu,
    isPersonal,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <div className="sider-box">
      <div className="toggle-side-btn">
        <button type="button" className="button" onClick={switchSider}>
          <Icon type={siderFold ? 'right' : 'left'} />
        </button>
      </div>
      <Menus {...menusProps} />
    </div>
  );
};


Sider.propTypes = {
  menu: PropTypes.array,
  menuType: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  navOpenKeys: PropTypes.array,
  isPersonal: PropTypes.bool,
  switchSider: PropTypes.func,
  changeOpenKeys: PropTypes.func,
};

export default Sider;

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import pathToRegexp from 'path-to-regexp';
import styles from './index.less';
import { queryArray } from './utils';


const Bread = ({
  menu,
  location,
}) => {
  const { pathname } = location;
  // 匹配当前路由
  const pathArray = [];
  let current;
  menu.map((item) => {
    if (item.route && pathToRegexp(item.route).exec(pathname)) {
      current = item;
    }
    return null;
  });
  const getPathArray = (item) => {
    pathArray.unshift(item);
    if (item.bpid) {
      getPathArray(queryArray(menu, item.bpid, 'id'));
    }
  };

  if (!current) {
    pathArray.push(menu[0] || {
      id: 1,
      icon: 'laptop',
      name: 'Dashboard',
    });
    pathArray.push({
      id: 404,
      name: 'Not Found',
    });
  } else {
    getPathArray(current);
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => (
    <Breadcrumb.Item key={key}>
      {item.name}
    </Breadcrumb.Item>
  ));

  return (
    <div className={styles.bread}>
      <Breadcrumb separator=">">
        {breads}
      </Breadcrumb>
    </div>
  );
};

Bread.propTypes = {
  menu: PropTypes.array,
  location: PropTypes.object,
};

export default Bread;

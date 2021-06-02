/* eslint-disable react/prop-types */
import React from 'react';
import KOS from 'kos-core';
import { Switch, Route, withRouter } from 'react-router-dom';

const RouterWrapper = ({ router, parentPath = '' }) => {
  if (!(router instanceof Array)) {
    throw new Error('router config is expected a Array!');
  }
  if (router.length <= 0) {
    return '';
  }

  return (
    <Switch>
      {router.map((item) => {
        const { Component, path } = item;
        let childPath = '';
        if (path.indexOf('/') === 0) {
          childPath = path;
        } else {
          childPath = `${parentPath}/${path}`;
        }
        return (
          <Route
            exact
            key={childPath}
            path={childPath}
            render={() => <Component parentPath={childPath} />}
          />
        );
      })}
    </Switch>
  );
};

const AutoWrapper = ({ KOSconfig = {}, router = [] }) => (Component) => {
  const KosWrapper = KOS.Wrapper({
    namespace: Symbol('namespace'),
    ...KOSconfig,
  })(Component);

  const Cp = (props) => {
    const { parentPath = '' } = props;
    const Rt = <RouterWrapper router={router} parentPath={parentPath} />;
    // 判断是否使用KOS
    if (KOSconfig.model) {
      const namespace =
        KOSconfig.namespace ||
        parentPath
          .split('/')
          .slice(1)
          .join('_');
      return <KosWrapper namespace={namespace} {...props} routers={Rt} />;
    }
    return <Component {...props} routers={Rt} />;
  };
  return withRouter(Cp);
};


module.exports = {
  AutoWrapper,
};

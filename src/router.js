import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Pages from '@/pages';
import Error404 from '@/pages/error/404';

// 路由配置
class RouteMap extends React.PureComponent {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/" component={Pages} />
            <Route render={() => <Error404 />} />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default RouteMap;

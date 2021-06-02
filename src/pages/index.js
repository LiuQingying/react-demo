import React from 'react';
import PropTypes from 'prop-types';
import { AutoWrapper } from '@/components/AutoWrapper';
import App from '@/App';
import router from './router';
import '../index.less';

@AutoWrapper({ router })
class RouteMap extends React.PureComponent {
  render() {
    console.log('2222222');
    return (
      <App {...this.props}>
        {this.props.routers}
      </App>
    );
  }
}
RouteMap.propTypes = {
  routers: PropTypes.array,
};

export default RouteMap;

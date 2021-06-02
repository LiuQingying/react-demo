import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import config from './typeConfig';
import styles from './index.less';

const Error = ({
  className, type, title, desc, img, ...rest
}) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        {/* <div className={styles.actions}>
          {
            actions ||
            createElement(linkElement, {
              to: '/',
              href: '/',
            }, <Button type="primary">返回首页</Button>)
          }
        </div> */}
      </div>
    </div>
  );
};

Error.propTypes = {
  linkElement: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  img: PropTypes.string,
  actions: PropTypes.string,
  className: PropTypes.string,
};

export default Error;

import _ from 'lodash';

/**
 * debounce
 * func (Function): 要防抖动的函数。
 * [wait=0] (number): 需要延迟的毫秒数。
 * [options={}] (Object): 选项对象。
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
const debounce = (func, wait = 350, options) => {
  const option = {
    leading: false,
    maxWait: 1000,
    trailing: true,
    ...options,
  };
  return _.debounce(func, wait, option);
};

/**
 * throttle
 * func (Function): 要节流的函数。
 * [wait=0] (number): 需要节流的毫秒。
 * [options={}] (Object): 选项对象。
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
const throttle = (func, wait = 300, options) => {
  const option = {
    leading: false,
    trailing: true,
    ...options,
  };
  return _.throttle(func, wait, option);
};

export default {
  debounce,
  throttle,
};

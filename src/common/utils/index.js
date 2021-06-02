/* eslint-disable no-nested-ternary */
import lodash from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
// import config from './config';

const { localStorage, sessionStorage, document } = window;

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 对象转数组，并于map结构
 * @param   {Object} data
 * @return  {Array}
 */
const objToArray = (data) => {
  const toArray = [];
  Object.entities(data).map((item) => {
    if (item[0]) {
      const arr = {
        code: item[0],
        name: item[1],
      };
      toArray.push(arr);
    }
    return null;
  });
  return toArray;
};

/**
 * 提取目标json数组里每项的某个字段为字符串
 * @param   {Array} dataArray
 * @param   {String} field json数组里的某个提取字段
 * @return  {String} 返回的是由该json数组里每个项里某个字段组成的以‘，’分割的字符串
 */
const codeToString = (dataArray, field) => {
  const codeArray = [];
  dataArray.map((item) => {
    if (item) {
      codeArray.push(item[field]);
    }
    return null;
  });
  return codeArray.join();
};

/**
 * 提取目标json数组里每项的某个字段为一个String数组
 * @param   {Array} dataArray
 * @param   {String} field json数组里的某个提取字段
 * @return  {Array} 返回的是由该json数组里每个项里某个字段组成String数组
 */
const codeToArray = (dataArray, field) => {
  const codeArray = [];
  dataArray.map((item) => {
    if (item) {
      codeArray.push(item[field]);
    }
    return null;
  });
  return codeArray;
};

/**
 * 传入codes字符串，删除目标json数组里的某个字段包含在该字符串中的项，返回新json数组
 * @param   {Array} codeArray
 * @param   {String} codes 字符串，传入要删除字符项字符串
 * @return  {Array} 返回删除codes字符串项后返回新数组
 */
const deleteCodes = (codeArray, codes) => {
  const dataArray = []; // 用于存放最终json数组对象
  codeArray.map((item) => {
    if (codes.split(',').indexOf(item) < 0) { // 如果该元素的code不在删除的code数组里，则新数组里有该项
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

/**
 * 传入codes字符串，删除目标json数组里的某个字段包含在该字符串中的项，返回新json数组
 * @param   {Array} arrayData
 * @param   {String} codes
 * @param   {String} field json数组里的某个比较字段
 * @return  {Array}
 */
const deleteArray = (arrayData, codes, field) => {
  const dataArray = []; // 用于存放最终json数组对象
  arrayData.map((item) => {
    if (codes.split(',').indexOf(item[field]) < 0) { // 如果该元素的code不在删除的code数组里，则新数组里有该项
      dataArray.push(item); // item加入dataArray数组
    }
    return null;
  });
  return dataArray;
};

/**
 * 传入json数组，提取某个字段为数组
 * @param   {Array} objectArray
 * @param   {String} field
 * @return  {Array}
 */
const filterArray = (objectArray, field) => {
  const dataArray = []; // 用于存放最终json数组对象
  objectArray.map((item) => {
    dataArray.push(item[field]);
    return null;
  });
  return dataArray;
};

// 去除每个子项的前后空格
const trimParam = data => data.toString().replace(/(^\s*)|(\s*$)/g, '');

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
};

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  const data = lodash.cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      if (!hashVP[children]) {
        hashVP[children] = [];
      }
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

// 获取浏览器可视高度
const getScreenHeight = () => window.innerHeight || window.document.documentElement.height;

const clearLocalStorage = () => {
  window.localStorage.removeItem('userInfo');
};
const toJson = str => JSON.parse(str);
const toStr = json => JSON.stringify(json);

const getLocal = name => localStorage.getItem(name);
const saveLocal = (name, data) => {
  localStorage.setItem(name, data);
};
const delLocal = (name) => {
  localStorage.removeItem(name);
};

const getSession = name => sessionStorage.getItem(name);
const saveSession = (name, data) => {
  sessionStorage.setItem(name, data);
};
const delSession = (name) => {
  sessionStorage.removeItem(name);
};

// 设置cookie
const setCookie = (name, value, seconds) => {
  const secondsParam = seconds || 0; // seconds有值就直接赋值，没有为0，这个根php不一样。
  let expires = '';
  if (secondsParam !== 0) { // 设置cookie生存时间
    const date = new Date();
    date.setTime(date.getTime() + (secondsParam * 1000));
    expires = `; expires=${date.toGMTString()}`;
  }
  document.cookie = `${name}=${escape(value)}${expires}; path=/`; // 转码并赋值
};

// 取得cookie
const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';'); // 把cookie分割成组
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]; // 取得字符串
    while (c.charAt(0) === ' ') { // 判断一下字符串有没有前导空格
      c = c.substring(1, c.length); // 有的话，从第二位开始取
    }
    if (c.indexOf(nameEQ) === 0) { // 如果含有我们要的name
      return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
    }
  }
  return false;
};

// 清除cookie
const clearCookie = (name) => {
  setCookie(name, '', -1);
};


const getFormData = (params) => {
  const formData = new window.FormData();
  Object.entries(params).map((item) => {
    if (item[1]) {
      formData.append(item[0], (typeof item[1] === 'object') ? JSON.stringify(item[1]) : item[1]);
    }
    return false;
  });
  return formData;
};
/**
 * 提取Array里每项的某个字段为一个String数组
 * @param   {Array} dataArray
 * @param   {String} field json数组里的某个提取字段
 * @return  {Array} 返回的是由该json数组里每个项里某个字段组成String数组
 */

const treeToArray = (dataArray, field, newArr = []) => {
  dataArray.map((item) => {
    if (item.children && item.children.length > 0) {
      treeToArray(item.children, field, newArr);
    }
    if (item[field] !== null) {
      newArr.push(item[field]);
    }
    return null;
  });
  return newArr;
};
/**
 * 格式化数据，门店名称显示为name+childrenNum,例如：北京（5家）
 */
const formatTree = (treeData) => {
  treeData.forEach((item) => {
    const item2 = item; // ESlint不允许直接修改参数的值，用item2引用item
    if (item2.childrenNum > 0) {
      item2.name = `${item2.name}(${item2.childrenNum})`;
      formatTree(item2.children);
    } else {
      delete item2.children;
    }
  });
  return treeData;
};

/**
 * 将时间段个格式化为 分钟:秒
 * @param   {Array} milliseconds 毫秒
 * @return  {String} 返回格式化的时间字符串，如34:56
 */
const durationFormat = (milliseconds) => {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  }
  const minutes = moment.duration(milliseconds).minutes();
  let seconds = moment.duration(milliseconds).seconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// 日期选择：今天之后的日期禁止选择
const disabledDate = currentDate => currentDate > moment().endOf('day');

// 周期列表
const cycleList = {
  1: [{ value: '1', label: '1月' }, { value: '2', label: '2月' }, { value: '3', label: '3月' }, { value: '4', label: '4月' }, { value: '5', label: '5月' }, { value: '6', label: '6月' }, { value: '7', label: '7月' }, { value: '8', label: '8月' }, { value: '9', label: '9月' }, { value: '10', label: '10月' }, { value: '11', label: '11月' }, { value: '12', label: '12月' }],
  2: [{ value: '1', label: '1号' }, { value: '2', label: '2号' }, { value: '3', label: '3号' }, { value: '4', label: '4号' }, { value: '5', label: '5号' }, { value: '6', label: '6号' }, { value: '7', label: '7号' }, { value: '8', label: '8号' }, { value: '9', label: '9号' }, { value: '10', label: '10号' }, { value: '11', label: '11号' }, { value: '12', label: '12号' }, { value: '13', label: '13号' }, { value: '14', label: '14号' }, { value: '15', label: '15号' }, { value: '16', label: '16号' }, { value: '17', label: '17号' }, { value: '18', label: '18号' }, { value: '19', label: '19号' }, { value: '20', label: '20号' }, { value: '21', label: '21号' }, { value: '22', label: '22号' }, { value: '23', label: '23号' }, { value: '24', label: '24号' }, { value: '25', label: '25号' }, { value: '26', label: '26号' }, { value: '27', label: '27号' }, { value: '28', label: '28号' }, { value: '29', label: '29号' }, { value: '30', label: '30号' }, { value: '31', label: '31号' }],
  3: [{ value: '1', label: '周一' }, { value: '2', label: '周二' }, { value: '3', label: '周三' }, { value: '4', label: '周四' }, { value: '5', label: '周五' }, { value: '6', label: '周六' }, { value: '7', label: '周日' }],
  4: [],
};
/**
 * storeTree 转换成storeList
 * @param   {Array} dataArray
 * @return  {Array} 返回的是门店list [{ label: '门店', id: 1 }]
 */

const treeToList = (storeTree, newArr = []) => {
  if (!Array.isArray(storeTree)) {
    return [];
  }
  storeTree.map((item) => {
    if (item.children && item.children.length > 0) {
      treeToList(item.children, newArr);
      return null;
    }
    if (item.name && item.id) {
      newArr.push({
        name: `${item.name} | ${item.bohCode}`,
        id: item.id,
        isPackage: item.isPackage || '',
        bohCode: item.bohCode || '',
      });
    }
    return null;
  });
  return newArr;
};

/**
 * dishTree 转换成dishList
 * @param   {Array} dataArray
 * @return  {Array} 返回的是门店list [{ label: '门店', id: 1 }]
 */

const dishTreeToList = (storeTree, newArr = []) => {
  if (!Array.isArray(storeTree)) {
    return [];
  }
  storeTree.map((item) => {
    if (item.children && item.children.length > 0) {
      dishTreeToList(item.children, newArr);
      return null;
    }
    if (item.name && item.id) {
      newArr.push({
        name: `${item.name} | ${item.code}`,
        id: item.id,
        isPackage: item.isPackage || '',
        code: item.code || '',
      });
    }
    return null;
  });
  return newArr;
};
// 向list中添加id属性
const listAddId = (list, pageSize = 10, current = 1) => {
  if (!Array.isArray(list)) {
    return [];
  }
  list.map((item, index) => {
    item.id = ((Number(current) - 1) * Number(pageSize)) + index + 1;
    return null;
  });
  return list;
};
const selectedAllStore = (treeData) => {
  const allStoreSelected = [];
  const selectedAll = (tree) => {
    tree.map((item) => {
      if (item.children.length === 0) {
        allStoreSelected.push({
          id: item.id,
          name: item.name,
        });
      }
      selectedAll(item.children);
      return null;
    });
    return allStoreSelected;
  };
  return selectedAll(treeData);
};

// 优惠券管理
const RANGE_TYPE = ['全场通用', '指定单品'];
const COUPON_TYPE = ['代金券', '折扣券', '兑换券'];

const mismatchUrl = (matchRules, url) => {
  const isMatch = matchRules.find((patternString) => {
    // eslint-disable-next-line no-useless-escape
    const noAuthReg = new RegExp(`\^${patternString.replace('*', '\\w+')}$`); // 支持*匹配
    return noAuthReg.test(url);
  });
  return !isMatch;
};

const dataDisplay = (list, selectdata) => {
  const arr = [];
  selectdata.map((item) => {
    list.map((subItem) => {
      const { id } = subItem;
      if (id === item) {
        arr.push(subItem);
      }
      return null;
    });
    return null;
  });
  return arr;
};

const payDataToRules = (data) => {
  const rules = [];
  data.map((item) => {
    let i = item.id;
    // eslint-disable-next-line no-plusplus
    while (Object.prototype.hasOwnProperty.call(item, --i)) {
      rules.push({
        paymentType: i,
        paymentTypeExclusion: item.id,
        exclusion: item[i],
      });
    }
    return null;
  });
  return rules;
};
const disDataToRules = (data) => {
  const rules = [];
  data.map((item) => {
    let i = item.id;
    // eslint-disable-next-line no-plusplus
    while (Object.prototype.hasOwnProperty.call(item, --i)) {
      rules.push({
        discountType: i,
        discountTypeExclusion: item.id,
        exclusion: item[i],
      });
    }
    return null;
  });
  return rules;
};
const rulesToPayData = (rules, types) => {
  const data = [];
  const makeIndexData = (pRules, xIndex, yIndex) => {
    const pTypes = pRules.filter(rule => rule.paymentTypeExclusion === xIndex);
    return pTypes.filter(type => type.paymentType === yIndex);
  };
  types.map((type) => {
    let i = 0;
    const item = {
      id: type.type,
      name: type.name,
    };
    while (i < types.length) {
      // eslint-disable-next-line no-plusplus
      item[++i] = type.type === i ? '--'
        : (makeIndexData(rules, type.type, i).length ? makeIndexData(rules, type.type, i)[0].exclusion : false);
    }
    data.push(item);
    return null;
  });
  return data;
};
const rulesToDisData = (rules, types) => {
  const data = [];
  const makeIndexData = (pRules, xIndex, yIndex) => {
    const pTypes = pRules.filter(rule => rule.discountTypeExclusion === xIndex);
    return pTypes.filter(type => type.discountType === yIndex);
  };
  types.map((type) => {
    let i = 0;
    const item = {
      id: type.type,
      name: type.name,
    };
    while (i < types.length) {
      // eslint-disable-next-line no-plusplus
      item[++i] = type.type === i ? '--'
        : (makeIndexData(rules, type.type, i).length ? makeIndexData(rules, type.type, i)[0].exclusion : false);
    }
    data.push(item);
    return null;
  });
  return data;
};
// 活动编辑时获取已选的checkbox选项：对应位置为1则为选中，例0000,代表四个选项未选中，0100代表带二个被选中
// const getCheckedItem = (value) => {
//   const res = [];
//   if (value) {
//     value.split('').forEach((item, index) => {
//       if (item === '1') {
//         res.push(`${index + 1}`);
//       }
//     });
//   }
//   return res;
// };
// 筛选出已选择门店--活动编辑时使用，从根据返回id数组（selectedIdArr）从树结构（tree）中获取对应item数据
const findSelected = (tree, selectedIdArr, newArr = []) => {
  if (!Array.isArray(tree)) {
    return [];
  }
  tree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      findSelected(item.children, selectedIdArr, newArr);
      return null;
    }
    if (selectedIdArr.includes(item.id)) {
      newArr.push(item);
    }
    return null;
  });
  return newArr;
};

const findRepeatItem = (arr) => {
  const newArr = [];
  const repeat = [];
  arr.map((item) => {
    newArr.includes(item) ? repeat.push(item) : newArr.push(item);
    return null;
  });
  return repeat;
};

// 生成全局唯一标识符
function newGuid() {
  let guid = '';
  for (let i = 1; i <= 32; i += 1) {
    const n = Math.floor(Math.random() * 16).toString(16);
    guid += n;
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) guid += '-';
  }
  return guid;
}

module.exports = {
  // config,
  classnames,
  queryURL,
  trimParam,
  queryArray,
  filterArray,
  arrayToTree,
  objToArray,
  codeToString,
  codeToArray,
  deleteArray,
  deleteCodes,
  clearLocalStorage,
  toJson,
  toStr,
  saveLocal,
  getLocal,
  delLocal,
  saveSession,
  getSession,
  delSession,
  getFormData,
  setCookie,
  getCookie,
  clearCookie,
  getScreenHeight,
  treeToArray,
  formatTree,
  durationFormat,
  disabledDate,
  formItemLayout,
  cycleList,
  treeToList,
  dishTreeToList,
  mismatchUrl,
  listAddId,
  selectedAllStore,
  RANGE_TYPE,
  COUPON_TYPE,
  dataDisplay,
  payDataToRules,
  disDataToRules,
  rulesToPayData,
  rulesToDisData,
  // getCheckedItem,
  findSelected,
  findRepeatItem,
  newGuid,
};

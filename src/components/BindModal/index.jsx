/**
 * Created by liukaiming on 2019-04-01 10:50:28
 */
// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Input, Tree, Table, message, Spin } from 'antd';
import _ from 'lodash';

let selectedTabClone = [];
let parentKeysArray = [];
const { Search } = Input;
const { TreeNode } = Tree;
let parentKeySum = []; // 所有父节点集合
let FIRST_SELECT = '001'; // 初始展开的节点
let dataList = [];
let searchVal = ''; // 搜索门店输入值
let usedTreeNode = [];

const bindModal = ({
  loading, // confirmLoading
  spinning, // 门店数加载状态
  codeColumn, // 右侧表格编号列字段名
  bindModalVisible, // 模态框是否可见
  selectedShops, // 所选中的门店
  allStore, // 所有门店列表
  expandedKeys, // 树形结构需要展开的key
  searchValue, // 查询关键字
  autoExpandParent, // 是否自定展开
  title, // 模态框title
  tableTitle, // 表格标题
  onCancel, // 取消方法
  onConfirm, // 提交方法
  onSelect, // 左侧树形结构选择方法
  onDelete, // 右侧删除方法
  onDeleteAll, // 右侧清除所有方法
  onSearch, // 搜索方法
  onExpand, // 展开/收起产生的事件
  disableSelect, // 不可勾选
  isTree, // 仅左侧树结构展示已勾选内容
  onResetSearch, // 清空搜索
}) => {
  const handleDeleteAll = () => {
    selectedTabClone = [];
    onDeleteAll();
  };

  const handleDelete = (record) => {
    _.remove(selectedTabClone, n => n.id === record.id);
    onDelete(record);
  };

  // 遍历门店树、组织机构数， dataList
  const generateList = (data) => {
    data.forEach((item) => {
      const key = item.id;
      if (!item.children && item[codeColumn]) {
        dataList.push({ key, title: `${item.name} | ${item[codeColumn]}`, id: key });
      } else {
        dataList.push({ key, title: item.name, id: key });
        if (item.children) {
          generateList(item.children, item.id);
        }
      }
    });
    // usedTreeNode = _.uniqBy(dataList, 'key'); // 搜索时候所有左侧能选中的节点
  };
  dataList = _.uniqBy(dataList, 'key');

  // 树节点预绘制
  const renderVirtualTreeNodes = (data, parentKeys, search, show) => {
    let showFlag = show;
    data.forEach((item) => {
      const index = item.name.indexOf(search);
      if (index > -1) showFlag = true;
      const isShow = parentKeys.length === 0 || (parentKeys.length > 0 && parentKeys.includes(item.id)) || show;
      if (isShow) {
        if (item.children && item.children.length > 0) {
          renderVirtualTreeNodes(item.children, parentKeys, search, showFlag);
        } else if (item.id) usedTreeNode.push({ id: item.id });
      }
    });
  };
  const getParentKey = (key, tree) => {
    let parentKey;
    tree.forEach((ele) => {
      const node = ele;
      if (node.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = node.id;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    });
    return parentKey;
  };

  // 获取父节点key总和array
  const getParentKeySum = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i += 1) {
      const node = tree[i];
      if (node.children && node.children.length > 0) {
        if (node.children.some(item => item.id === key)) {
          parentKeySum.push(node.id);
          parentKey = node.id;
        } else if (getParentKeySum(key, node.children)) {
          parentKey = getParentKeySum(key, node.children);
        }
      }
    }
    if (parentKey && parentKey !== FIRST_SELECT) getParentKeySum(parentKey, tree);
    parentKeySum.push(parentKey);
    return parentKey;
  };

  const handleConfirm = () => {
    parentKeysArray = [];
    parentKeySum = [];
    searchVal = '';
    onConfirm();
  };

  const handleCancel = () => {
    parentKeysArray = [];
    parentKeySum = [];
    searchVal = '';
    onCancel();
  };


  const modalOpts = {
    visible: bindModalVisible,
    title,
    okText: '确定',
    cancelText: '取消',
    width: 710,
    onCancel: handleCancel,
    onOk: handleConfirm,
    maskClosable: false,
    confirmLoading: loading || false,
    bodyStyle: {
      padding: '15px !important',
    },
  };

  let checkedIds;
  // eslint-disable-next-line no-confusing-arrow
  selectedShops.forEach(item => item.id.indexOf('-') > -1 ? item.id = item.id.substr(item.id.indexOf('-') + 1, item.id.length) : '');
  checkedIds = isTree
    ? _.concat(selectedShops.map(item => item.id), disableSelect) // 已选择的始终处于选中状态
    : selectedShops.map(item => item.id);
  checkedIds = _.uniq(checkedIds);
  // 监听搜索框
  const handleSearch = (value) => {
    searchVal = value;
    parentKeysArray = [];
    parentKeySum = [];
    if (value === '') {
      usedTreeNode = _.uniqBy(dataList, 'key');
      onResetSearch();
      return;
    }
    usedTreeNode = [];
    const dataArray = allStore;
    const keysArray = [];
    let Keys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          keysArray.push(item.key);
          return getParentKey(item.key, dataArray);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    Keys = _.uniq(_.concat(_.uniq(keysArray), Keys));
    Keys.forEach((item) => {
      getParentKeySum(item, dataArray);
    });
    // 父级ALL到顶，父级，本级
    parentKeysArray = [...parentKeySum, ...Keys].filter((item, i, self) => item && self.indexOf(item) === i) || [];
    // 修改树，右侧表格数据同步 usedTreeNode
    renderVirtualTreeNodes(dataArray, parentKeysArray, value);
    if (Keys.length) {
      onSearch(value, Keys);
    } else {
      message.warning('很抱歉，暂未搜索到结果');
      generateList(allStore);
    }
  };

    // 勾选中的门店
  dataList = [];
  if (allStore && allStore[0]) {
    FIRST_SELECT = allStore[0].id;
  }
  selectedTabClone = _.clone(selectedShops);
  generateList(allStore);
  // 渲染左侧门店树结构
  const loopTree = (data, show) => {
    let showFlag = show;
    return data.map((item) => {
      const temp = disableSelect || []; // 节点是否可选择
      let nameCodeStr;
      if ((!item.children || !item.children.length) && item[codeColumn]) {
        nameCodeStr = `${item.name} | ${item[codeColumn]}`;
      } else {
        nameCodeStr = item.name;
      }
      const index = nameCodeStr.indexOf(searchValue); // 判断查询的关键字是否在当前条目name中出现
      const beforeStr = nameCodeStr.substr(0, index); // name中关键字前面部分
      const afterStr = nameCodeStr.substr(index + searchValue.length); // 关键字后面部分
      const treeTitle =
        index > -1 ? ( // 对关键字进行标红处理
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {temp.indexOf(item.id) !== -1 ? `${afterStr}(已添加)` : afterStr}
          </span>
        ) : (
          <span>{temp.indexOf(item.id) !== -1 ? `${nameCodeStr}(已添加)` : nameCodeStr}</span>
        );
      if (index > -1 && !show) showFlag = true;
      const isShow = parentKeysArray.length === 0 || (parentKeysArray.length > 0 && parentKeysArray.includes(item.id)) || show;
      if (isShow) {
        if (item.children && item.children.length > 0) {
          const childrenIds = item.children.map(i => i.id); // 获取子级id数组用于判断当下所有子级是否全选中
          return (
            <TreeNode
              title={treeTitle}
              key={item.id}
              dataRef={item}
              className={_.difference(childrenIds, temp).length === 0 ? 'disabledSelect' : ''}
            >
              {loopTree(item.children, showFlag)}
            </TreeNode>
          );
        }
        return (<TreeNode
          title={treeTitle}
          key={item.id}
          dataRef={item}
          className={temp.indexOf(item.id) !== -1 ? 'disabledSelect' : ''}
        />);
      }
      return null;
    })
      .filter((item, i, self) => item && self.indexOf(item) === i);
  };
  if (searchVal === '') {
    usedTreeNode = _.uniqBy(dataList, 'key');
  }
  // 选择门店树结构触发的事件
  const handleSelect = (selectedKeys, info) => {
    let selectedArray = [];
    const { checkedNodes } = info;

    checkedNodes.forEach((item) => {
      if (!item.props.children) {
        selectedArray.push(item.props.dataRef);
      }
      return null;
    });
    const cloneArray = [];
    // const code = item.substr(indexStr + 1, item.length);
    usedTreeNode.map(item => (item && item.id.indexOf('-') > -1 ? cloneArray.push({ id: item.id.substr(item.id.indexOf('-') + 1, item.id.length) }) : ''));
    usedTreeNode = _.uniqBy(_.concat(usedTreeNode, cloneArray), 'id');
    // 每次勾选或者取消勾选， 表格中的门店 - 全部门店(搜索之前or搜索之后)) + 勾选中的门店
    let finalList = _.cloneDeep(selectedShops);
    _.pullAllBy(finalList, usedTreeNode, 'id');
    finalList = _.uniqBy(_.concat(finalList, selectedArray), 'id');
    selectedArray = finalList;

    onSelect(selectedArray);
  };
  const columns = [
    {
      title: '编号',
      dataIndex: codeColumn,
      key: codeColumn,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'operating',
      width: 60,
      render: record => (disableSelect && disableSelect.length && disableSelect.includes(record.id) ?
        '' : <button
          className="btn-link"
          onClick={() => {
            handleDelete(record);
          }}
        >
          删除
        </button>),
    },
  ];
  return (
    <Modal {...modalOpts}>
      <Row gutter={10}>
        <Col span={12}>
          <div style={{ border: '1px solid #ccc', padding: '5px 5px 5px 15px', height: '320px' }}>
            <Search
              placeholder="搜索"
              onSearch={value => handleSearch(value)}
              style={{ width: 280 }}
            />
            <Spin tip="加载中" spinning={spinning}>
              <div style={{ height: '260px', overflow: 'auto', marginTop: '20px' }}>
                {allStore.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#888' }}>暂无数据</div>
                  ) : (
                    <Tree
                      checkable="true"
                      onExpand={onExpand}
                      onCheck={handleSelect}
                      checkedKeys={checkedIds}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                    >
                      {loopTree(allStore)}
                    </Tree>
                    )}
              </div>
            </Spin>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ border: '1px solid #ccc', height: '320px', overflow: 'auto' }}>
            <div style={{ height: '38px', lineHeight: '38px', padding: '0 20px' }}>
              <span style={{ float: 'left' }}>
                {tableTitle} {selectedShops.length}
              </span>
              <button className="btn-link" style={{ float: 'right' }} onClick={handleDeleteAll}>
                清除
              </button>
            </div>
            <Table
              className="noExpand"
              columns={columns}
              dataSource={selectedShops}
              bordered
              loading={loading}
              rowKey={record => record[codeColumn]}
              pagination={{ size: 'small' }}
              style={{ marginLeft: '1px' }}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

bindModal.propTypes = {
  tabValue: PropTypes.string,
  bindModalVisible: PropTypes.bool,
  loading: PropTypes.bool,
  isTree: PropTypes.bool,
  isGroup: PropTypes.bool,
  isNoTabs: PropTypes.bool,
  spinning: PropTypes.bool,
  codeColumn: PropTypes.string,
  title: PropTypes.string,
  tableTitle: PropTypes.string,
  expandedKeys: PropTypes.array,
  autoExpandParent: PropTypes.bool,
  searchValue: PropTypes.string,
  selectedShops: PropTypes.array,
  filterVisible: PropTypes.bool,
  allStore: PropTypes.array,
  groupDate: PropTypes.array,
  disableSelect: PropTypes.array,
  // viewList: PropTypes.array,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteAll: PropTypes.func,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
  onResetSearch: PropTypes.func,
  onChangeTabValue: PropTypes.func,
};
export default bindModal;

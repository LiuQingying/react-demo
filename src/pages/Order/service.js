/*
 * @Author: Liu Kaiming
 * @since: 2019-09-16 14:18:47
 */

import request from '@/common/utils/request';

// 查询同步记录列表
export async function inquireRecordList(params) {
  return request('/api/koubeisync/record/list', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 同步 && 批量同步
export async function sync(params) {
  return request('/api/koubeisync/record/sync', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 删除 && 批量删除
export async function remove(params) {
  return request('/api/koubeisync/record/del', {
    method: 'DELETE',
    body: JSON.stringify(params),
  });
}

// 查看失败信息详情
export async function inquireDetail(params) {
  return request(`/api/koubeisync/record/errMsg?taskId=${params.taskId}&pageno=${params.pageno}&rowcount=${params.rowcount}`, {
    method: 'get',
  });
}

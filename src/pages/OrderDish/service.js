import request from '@/common/utils/request';

// 查询商户
export async function inquireTenantList(params) {
  return request('/qr/tenantList', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 查询门店
export async function inquireStoreList(tenantId) {
  return request(`/qr/${tenantId}/storeList`, {
    method: 'post',
  });
}

// 查询灰度发布列表
export async function inquireGrayPostList(params) {
  return request('/qr/storeListByPage', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

// 灰度设置
export async function graySet(params, gray) {
  return request(`/qr/graSet/${gray}`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

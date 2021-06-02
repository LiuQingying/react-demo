/*
 * @Author: wangtaidong
 * @Date: 2019-04-08 18:09:32
 */
import request from '@/common/utils/request';
import config from '@/common/utils/config';

export async function inquireStore(params) {
  return request(`${config.apiPrefix}/api/common/org/list`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function inquireDish(params) {
  return request(`${config.apiPrefix}/api/common/dish/list`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}


// 登出操作
export function quitSystem(params) {
  return request('/cloud/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}


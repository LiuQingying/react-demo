import request from '@/common/utils/request';

export async function enter(params) {
  return request('/usercenter/api/auth/login ', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function logout(params) {
  return request('/usercenter/api/auth/logout', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function ddLogin(params) {
  return request('/usercenter/api/dingtalk/redirect', {
    method: 'post',
    body: params,
  });
}

export async function sendMsg(params) {
  return request('/usercenter/api/account/sendSmsVerificationCode', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function bindMobile(params) {
  return request('/usercenter/api/dingtalk/bindMobile', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function ddNoSecretLogin(params) {
  return request('/usercenter/api/dingtalk/noSecretLanding', {
    method: 'get',
    params,
  });
}

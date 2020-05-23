import request from '@/utils/request';

export interface LoginParamsType {
  mail: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/server/user/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/server/user/login/captcha?mobile=${mobile}`);
}

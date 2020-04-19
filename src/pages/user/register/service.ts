import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/user/register', {
    method: 'POST',
    data: params,
  });
}

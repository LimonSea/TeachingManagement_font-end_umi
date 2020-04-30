import request from '@/utils/request';
import { UserRegisterParams } from './index';

export async function Register(params: UserRegisterParams) {
  return request('/server/user/register', {
    method: 'POST',
    data: params,
  });
}

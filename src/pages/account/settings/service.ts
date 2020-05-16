import request from '@/utils/request';

export interface UpdateParamsType {
  id: number;
  avatar: string;
  mail: string;
  mobile: string;
  name: string;
  signature: string;
}

export async function queryCurrent() {
  return request('/server/user/currentUser');
}

export async function updateUser(params: UpdateParamsType) {
  return request('/server/user/update', {
    method: 'POST',
    data: params,
  });
}

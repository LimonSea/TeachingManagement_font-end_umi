import request from '@/utils/request';

export async function queryDetail(params: { id: number, userId: number }) {
  return request('/server/user/getTaskDetail', { params });
}


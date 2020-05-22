import request from '@/utils/request';

export async function queryDetail() {
  return request('/server/group/member');
}

// 添加成员
export async function addMember(params: { id: Number }) {
  return request('/server/group/addMember', {
    method: 'POST',
    data: params,
  });
}

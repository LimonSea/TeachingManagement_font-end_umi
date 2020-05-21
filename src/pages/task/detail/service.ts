import request from '@/utils/request';

export async function queryDetail(params: { id: number, userId: number }) {
  return request('/server/user/getTaskDetail', { params });
}

export async function studentSubmit(params: { id: number, studentContent: number }) {
  return request('/server/task/studentSubmit', {
    method: 'POST',
    data: params,
  });
}

export async function teacherSubmit(params: { id: number, teacherContent: number }) {
  return request('/server/task/teacherSubmit', {
    method: 'POST',
    data: params,
  });
}

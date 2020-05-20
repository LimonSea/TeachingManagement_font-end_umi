import request from '@/utils/request';
import { BasicListItemDataType, Member } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  id: number;
  groupId: number;
  title: string;
  content: string;
  deadline: string;
  updatedAt: string;
  createdAt: string;
  users?: Member[];
}

export async function queryList(params: { count: number, currentPage: number }) {
  return request('/server/task/search', { params });
}

// 查询工作室所有成员
export async function queryMember(params: { groupId: Number }) {
  return request('/server/group/member', { params });
}

// 新建项目
export async function submit(params: ParamsType) {
  return request('/server/task/create', {
    method: 'POST',
    data: params,
  });
}

// 更新项目
export async function update(params: ParamsType) {
  return request('/server/task/update', {
    method: 'POST',
    data: params,
  });
}

// 删除项目
export async function deleteTask(params: { id: number }) {
  return request('/server/task/delete', {
    method: 'POST',
    data: params,
  });
}

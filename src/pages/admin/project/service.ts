import request from '@/utils/request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  id?: number;
  groupId: number;
  title: string;
  cover: string;
  desc: string;
  github: string;
  status: string;
  createdAt: number;
  users?: [];
}

export async function queryList(params: { groupId: number, count: number, currentPage: number }) {
  return request('/server/project/search', { params });
}

// 查询工作室所有成员
export async function queryMember(params: { groupId: Number }) {
  return request('/server/group/member', { params });
}

// 新建项目
export async function submit(params: ParamsType) {
  return request('/server/project/create', {
    method: 'POST',
    data: params,
  });
}

// 更新项目
export async function update(params: ParamsType) {
  return request('/server/project/update', {
    method: 'POST',
    data: params,
  });
}

export async function deleteProject(params: { id: number }) {
  return request('/server/project/delete', {
    method: 'POST',
    data: params,
  });
}


export async function updateList(params: ParamsType) {
  return request('/server/project/update', {
    method: 'POST',
    data: params,
  });
}

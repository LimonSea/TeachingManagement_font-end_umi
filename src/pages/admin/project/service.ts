import request from 'umi-request';
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
  members?: [];
}

export async function queryList(params: { groupId: number, count: number, currentPage: number }) {
  return request('/server/project/search', { params });
}

export async function removeList(params: { id: number }) {
  return request('/server/project/delete', {
    method: 'POST',
    data: params,
  });
}

export async function addList(params: ParamsType) {
  return request('/server/project/create', {
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

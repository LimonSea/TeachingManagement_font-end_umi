import request from '@/utils/request';
import { CardListItemDataType } from './data.d';

interface ParamsType extends Partial<CardListItemDataType> {
  id?: number;
  groupId: number;
  title: string;
  cover: string;
  desc: string;
  download?: string;
  href: string;
  type: string;
}

export async function queryList() {
  return request('/server/resource/search');
}


// 新建资源
export async function submit(params: ParamsType) {
  return request('/server/resource/create', {
    method: 'POST',
    data: params,
  });
}

// 更新资源
export async function update(params: ParamsType) {
  return request('/server/resource/update', {
    method: 'POST',
    data: params,
  });
}

// 删除资源
export async function deleteResource(params: { id: number }) {
  return request('/server/resource/delete', {
    method: 'POST',
    data: params,
  });
}

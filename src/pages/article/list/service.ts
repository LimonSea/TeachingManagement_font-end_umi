import request from 'umi-request';
import { ListItemDataType } from './data.d';

export async function queryList(params: {count: number, currentPage: number}) {
  return request('/server/writing/searchArticle', {
    params,
  });
}

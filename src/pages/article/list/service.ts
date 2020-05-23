import request from '@/utils/request';

export async function queryList(params: {count: number, currentPage: number}) {
  return request('/server/writing/searchArticle', {
    params,
  });
}

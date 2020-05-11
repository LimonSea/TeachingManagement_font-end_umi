import request from 'umi-request';

export async function queryCurrent(params: { id: number }) {
  return request('/server/user/userCenterInfo', {
    params,
  });
}

export async function queryArticleList(params: { count: number, authorId: number, currentPage: number }) {
  return request('/server/writing/searchArticle', {
    params,
  });
}

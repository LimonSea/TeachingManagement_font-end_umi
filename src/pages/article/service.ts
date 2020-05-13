import request from 'umi-request';

export async function showArticle(params: any) {
  return request('/server/writing/showArticle', { params });
}

export async function submitComment(params: any) {
  return request('/server/writing/submitComment', {
    method: 'POST',
    data: params,
  });
}

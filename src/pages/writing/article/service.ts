import request from '@/utils/request';

export async function SubmitForm(params: any) {
  return request('/server/writing/submitArticle', {
    method: 'POST',
    data: params,
  });
}

import { Effect } from 'umi';
import { message } from 'antd';
import { SubmitForm } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitForm: Effect;
  };
}
const Model: ModelType = {
  namespace: 'articleForm',

  state: {},

  effects: {
    *submitForm({ payload }, { call }) {
      const response = yield call(SubmitForm, payload);
      if (response.status === 'ok') message.success('发布成功');
      else message.error('发布失败');
    },
  },
};

export default Model;

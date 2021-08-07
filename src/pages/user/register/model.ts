import { Effect, Reducer } from 'umi';

import { Register } from './service';
import { message } from 'antd';

export interface StateType {
  status?: 'ok' | 'error' | number;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      if (response.status === 'ok') {
        message.success('注册成功！');
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }
      else message.error(response.msg);
    },
    *clear({ payload }, { call, put }) {
      yield put({
        type: 'clearRegister',
      });
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    clearRegister(state, { payload }) {
      return null;
    }
  },
};

export default Model;

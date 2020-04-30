import { Effect, Reducer } from 'umi';

import { Register } from './service';

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
      yield put({
        type: 'registerHandle',
        payload: response,
      });
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

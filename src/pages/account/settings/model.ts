import { Effect, Reducer } from 'umi';
import { CurrentUser } from './data.d';
import { queryCurrent, updateUser } from './service';
import { message } from 'antd';

export interface ModalState {
  currentUser?: Partial<CurrentUser>;
  isLoading?: boolean;
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
    updateBaseInfo: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'accountAndsettings',

  state: {
    currentUser: {},
    isLoading: false,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateBaseInfo({ payload }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'saveCurrentUser',
          payload,
        });
        message.success('修改成功');
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: {
          ...state?.currentUser,
          ...action.payload
        },
      };
    },
  }
};

export default Model;

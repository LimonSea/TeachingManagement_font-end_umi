import { Effect, Reducer } from 'umi';
import { queryDetail } from './service';

import { BasicListItemDataType } from './data.d';

export interface StateType {
  detail: BasicListItemDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchDetail: Effect;
  };
  reducers: {
    queryDetail: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'taskAnddetail',

  state: {
    detail: {},
  },

  effects: {
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload);
      yield put({
        type: 'queryDetail',
        payload: response,
      });
    },
  },

  reducers: {
    queryDetail(state, action) {
      return {
        ...(state as StateType),
        detail: action.payload.data,
      };
    },
  },
};

export default Model;

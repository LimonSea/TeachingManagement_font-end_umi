import { Effect, Reducer } from 'umi';
import { queryList } from './service';

import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: BasicListItemDataType[];
  totalCount: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'taskAndList',

  state: {
    list: [],
    totalCount: 0,
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...(state as StateType),
        list: action.payload.data,
        totalCount: action.payload.totalCount,
      };
    },
  },
};

export default Model;

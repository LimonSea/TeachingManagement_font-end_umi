import { Effect, Reducer } from 'umi';
import { addList, queryList, removeList, updateList } from './service';

import { BasicListItemDataType } from './data.d';

export interface StateType {
  list: BasicListItemDataType[];
  totalCount: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    submit: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminAndproject',

  state: {
    list: [],
    totalCount: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'appendList',
        payload: response,
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeList : updateList;
      } else {
        callback = addList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data,
        totalCount: action.payload.totalCount,
      };
    },
    appendList(state = { list: [], totalCount: 0 }, action) {
      return {
        ...state,
        list: state.list.concat(action.payload.data),
      };
    },
  },
};

export default Model;

import { Effect, Reducer } from 'umi';
import { ListItemDataType } from './data.d';
import { queryList } from './service';

export interface StateType {
  list: ListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminAndlist',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'appendList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: (state as StateType).list.concat(action.payload.data),
      };
    },
  },
};

export default Model;

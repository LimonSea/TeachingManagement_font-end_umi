import { Reducer, Effect } from 'umi';
import { CurrentUser, ListItemDataType } from './data.d';
import { queryCurrent, queryArticleList } from './service';

export interface ModalState {
  currentUser: Partial<CurrentUser>;
  list: ListItemDataType[];
  articleCount: number,
  projectCount: number,
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
    fetch: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
    queryList: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'accountAndcenter',

  state: {
    currentUser: {},
    list: [],
    articleCount: 0,
    projectCount: 0,
  },

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...(state as ModalState),
        currentUser: action.payload || {},
      };
    },
    queryList(state, action) {
      return {
        ...(state as ModalState),
        list: action.payload.data,
        articleCount: action.payload.totalCount,
      };
    },
  },
};

export default Model;

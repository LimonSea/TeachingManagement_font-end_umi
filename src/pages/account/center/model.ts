import { Reducer, Effect } from 'umi';
import { CurrentUser, ListItemDataType, ProjectListItemDataType } from './data.d';
import { queryCurrent, queryArticleList, queryProjectList } from './service';

export interface ModalState {
  currentUser: Partial<CurrentUser>;
  pageCurrentUser: Partial<CurrentUser>;
  isMe: boolean,
  list: ListItemDataType[];
  projectList: ProjectListItemDataType[];
  articleCount: number,
  projectCount: number,
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchCurrent: Effect;
    fetchArticle: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
    saveArticleList: Reducer<ModalState>;
    saveProjectList: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'accountAndcenter',

  state: {
    currentUser: {},
    isMe: false,
    list: [],
    projectList: [],
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
      // 请求项目组数据
      const responseProject = yield call(queryProjectList, {groupId: response.groupId});
      if (responseProject.status === 'ok') {
        yield put({
          type: 'saveProjectList',
          payload: responseProject,
        });
      }
    },
    *fetchArticle({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      yield put({
        type: 'saveArticleList',
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
    saveArticleList(state, action) {
      return {
        ...(state as ModalState),
        list: action.payload.data,
        articleCount: action.payload.totalCount,
      };
    },
    saveProjectList(state, action) {
      return {
        ...(state as ModalState),
        projectList: action.payload.data,
        projectCount: action.payload.totalCount,
        isMe: true,
      };
    },
  },
};

export default Model;

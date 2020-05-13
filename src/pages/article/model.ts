import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { showArticle, submitComment } from './service';

export interface ModalState {
  article: any;
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    showArticle: Effect;
    submitComment: Effect;
  };
  reducers: {
    saveArticle: Reducer<ModalState>;
    saveComment: Reducer<ModalState>;
  };
}
const Model: ModelType = {
  namespace: 'articleDetail',

  state: {
    article: {}
  },

  effects: {
    *showArticle({ payload }, { call, put }) {
      const response = yield call(showArticle, payload);
      yield put({
        type: 'saveArticle',
        payload: response,
      });
    },
    *submitComment({ payload }, { call, put }) {
      const response = yield call(submitComment, payload);
      if (response.status === 'ok') {
        message.success('评论成功');
        yield put({
          type: 'saveComment',
          payload: response.comment,
        });
      }
    },
  },

  reducers: {
    saveArticle(state, action) {
      return {
        ...(state as ModalState),
        article: action.payload || {},
      };
    },
    saveComment(state, action) {
      return {
        ...(state as ModalState),
        article: {
          ...(state as ModalState).article,
          comments: [...(state as ModalState).article.comments, action.payload],
          commentsCount: (state as ModalState).article.commentsCount + 1,
        },
      };
    },
  }

};

export default Model;

import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { queryDetail, studentSubmit, teacherSubmit } from './service';
import { TaskDetailDataType, UserDataType } from './data.d';

export interface StateType {
  detail: TaskDetailDataType;
  user: UserDataType;
  publisher: UserDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchDetail: Effect;
    studentSubmit: Effect;
    teacherSubmit: Effect;
  };
  reducers: {
    queryDetail: Reducer<StateType>;
    updateUserTask: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'taskAnddetail',

  state: {
    detail: {},
    user: {},
    publisher: {},
  },

  effects: {
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'queryDetail',
          payload: response,
        });
      }
    },
    *studentSubmit({ payload }, { call, put }) {
      const response = yield call(studentSubmit, payload);
      if (response.status === 'ok') {
        message.success('提交成功');
        const values = { ...payload, status: 'submitted' };
        delete values.id;
        yield put({
          type: 'updateUserTask',
          payload: values,
        });
      }
    },
    *teacherSubmit({ payload }, { call, put }) {
      const response = yield call(teacherSubmit, payload);
      if (response.status === 'ok') {
        message.success('提交成功');
        const values = { ...payload, status: 'revised' };
        delete values.id;
        delete values.userId;
        yield put({
          type: 'updateUserTask',
          payload: values,
        });
      }
    },
  },

  reducers: {
    queryDetail(state, action) {
      return {
        ...(state as StateType),
        detail: action.payload.data,
        user: action.payload.user,
        publisher: action.payload.publisher,
      };
    },
    updateUserTask(state, action) {
      return {
        ...(state as StateType),
        detail: {
          ...(state as StateType).detail,
          usertask: {
            ...(state as StateType).detail.usertask,
            ...action.payload,
          }
        },
      };
    },
  },
};

export default Model;

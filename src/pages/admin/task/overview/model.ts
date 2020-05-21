import { Effect, Reducer } from 'umi';
import { queryDetail } from './service';
import { TaskDetailDataType, UserDataType } from './data.d';

export interface StateType {
  detail: TaskDetailDataType;
  submitted: UserDataType[];
  notSubmitted: UserDataType[];
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
  namespace: 'adminAndTaskOverview',

  state: {
    detail: {},
    submitted: [],
    notSubmitted: [],
  },

  effects: {
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryDetail, payload);
      if (response.status === 'ok') {
        const submitted: any[] = [];
        const notSubmitted: any[] = [];
        response.users.forEach((item: { usertask: { status: string; }; }) => {
          if (item.usertask.status === 'published') notSubmitted.push(item);
          else submitted.push(item);
        });
        yield put({
          type: 'queryDetail',
          payload: {
            detail: response.task,
            submitted,
            notSubmitted,
          },
        });
      }
    },
  },

  reducers: {
    queryDetail(state, action) {
      return {
        ...(state as StateType),
        ...action.payload
      };
    },
  },
};

export default Model;

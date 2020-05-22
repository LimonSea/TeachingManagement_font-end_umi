import { Effect, Reducer } from 'umi';
import { queryDetail, addMember } from './service';
import { GroupDetailDataType, MemberDataType } from './data.d';
import { message } from 'antd';

export interface StateType {
  detail: GroupDetailDataType;
  members: MemberDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchDetail: Effect;
    addMember: Effect;
  };
  reducers: {
    queryDetail: Reducer<StateType>;
    addToMembers: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminAndGroup',

  state: {
    detail: {},
    members: [],
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
    *addMember({ payload }, { call, put }) {
      const response = yield call(addMember, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'addToMembers',
          payload: response,
        });
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
    },
  },

  reducers: {
    queryDetail(state, action) {
      const {id, name, cover, createdAt, users} = action.payload;
      return {
        ...(state as StateType),
        detail: { id, name, cover, createdAt },
        members: users,
      };
    },
    addToMembers(state, action) {
      return {
        ...(state as StateType),
        members: [action.payload.result, ...(state as StateType).members],
      };
    },
  },
};

export default Model;

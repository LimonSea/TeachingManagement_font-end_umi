import { Effect, Reducer } from 'umi';
import { submit, update, queryList, deleteTask, queryMember } from './service';

import { BasicListItemDataType, Member } from './data.d';
import { message } from 'antd';

export interface StateType {
  list: BasicListItemDataType[];
  totalCount: number;
  users: Member[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchList: Effect;
    fetchMember: Effect;
    submitAndUpdate: Effect;
    delete: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    queryMember: Reducer<StateType>;
    addToList: Reducer<StateType>;
    updateList: Reducer<StateType>;
    deleteItem: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminAndtask',

  state: {
    list: [],
    totalCount: 0,
    users: [],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchMember(_, { call, put }) {
      const response = yield call(queryMember);
      if (response.status === 'ok') {
        yield put({
          type: 'queryMember',
          payload: response,
        });
      }
    },
    *submitAndUpdate({ payload }, { call, put }) {
      // 更新
      if (payload.id) {
        const response = yield call(update, payload);
        if (response.status === 'ok') {
          // 假写
          yield put({
            type: 'updateList',
            payload,
          });
          message.success('修改成功');
        }
      } else {
        const response = yield call(submit, payload);
        if (response.status === 'ok') {
          // 假写
          yield put({
            type: 'addToList',
            payload,
          });
          message.success('发布成功');
        }

      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteTask, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'deleteItem',
          payload,
        });
      }
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
    queryMember(state, action) {
      return {
        ...(state as StateType),
        users: action.payload.users,
      };
    },
    addToList(state, action) {
      return {
        ...(state as StateType),
        list: [ action.payload, ...(state as StateType).list],
      };
    },
    updateList(state, action) {
      const newList = (state as StateType).list.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      })
      return {
        ...(state as StateType),
        list: newList,
        totalCount: (state as StateType).totalCount + 1,
      };
    },
    deleteItem(state, action) {
      const newList = (state as StateType).list;
      const index = newList.findIndex(item => item.id === action.payload.id);
      newList.splice(index, 1);
      return {
        ...(state as StateType),
        list: newList,
        totalCount: (state as StateType).totalCount - 1,
      };
    }
  },
};

export default Model;

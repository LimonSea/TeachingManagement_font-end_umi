import { Effect, Reducer } from 'umi';

import { queryList, update, submit, deleteResource } from './service';
import { CardListItemDataType } from './data';
import { message } from 'antd';

export interface StateType {
  list: { [key: string]: CardListItemDataType[] };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchList: Effect;
    submitAndUpdate: Effect;
    delete: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    addToList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'resourceList',

  state: {
    list: {},
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      if (response.status === 'ok') {
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },
    *submitAndUpdate({ payload }, { call, put }) {
      // 更新
      if (payload.id) {
        const response = yield call(update, payload);
        if (response.status === 'ok') {
          message.success('修改成功');
          const list = yield call(queryList, payload);
          if (list.status === 'ok') {
            yield put({
              type: 'queryList',
              payload: list,
            });
          }
        }
      } else {
        const response = yield call(submit, payload);
        if (response.status === 'ok') {
          message.success('添加成功');
          // 假写
          yield put({
            type: 'addToList',
            payload: response,
          });
        }

      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteResource, payload);
      if (response.status === 'ok') {
        message.success('删除成功');
        const list = yield call(queryList, payload);
        if (list.status === 'ok') {
          yield put({
            type: 'queryList',
            payload: list,
          });
        }
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    addToList(state, action) {
      const { data } = action.payload;
      const newList = (state as StateType).list;
      if (!newList[data.type]) newList[data.type] = [];
      newList[data.type].push(data);
      return {
        ...(state as StateType),
        list: newList,
      };
    }
  },
};

export default Model;

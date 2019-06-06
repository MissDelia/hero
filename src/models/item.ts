import { queryItemList, queryItemDetail } from '@/services/api';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface ItemModelState {
  items: [];
  filterKey: Number;
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save:  Reducer<ItemModelState>;
  };
  subscriptions: { setup: Subscription };
}


const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    items: [],
    filterKey: 0,
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield call(queryItemList);
      const remoteData = yield call(queryItemDetail, { item_id: 1112 });
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          items: data || remoteData,
        },
      });

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/item') {
          dispatch({
            type: 'fetch'
          })
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ItemModel;

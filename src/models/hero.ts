import { queryHeroList, getHeroDetails, getFreeHeros } from '@/services/api';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { request } from 'alita';
export interface HeroModelState {
  heros: [];
  filterKey: Number;
  freeheros: [];
  itemHover: Number;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save:  Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}


const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heros: [],
    freeheros: [],
    filterKey: 0,
    itemHover: 0,
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield call(queryHeroList);
      const remoteData = yield call(getHeroDetails, { ename: 110 });
      const freeheros = yield call(getFreeHeros, { number: 13 });
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          heros: data || remoteData,
          freeheros: freeheros,
        },
      });

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            // type: 'query'
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

export default HeroModel;

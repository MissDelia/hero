import { querySummonerList, querySummonerDetail } from '@/services/api';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface SummonerModelState {
  name: string;
  summoners: [];
}

export interface SummonerModelType {
  namespace: 'summoner';
  state: SummonerModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save:  Reducer<SummonerModelState>;
  };
  subscriptions: { setup: Subscription };
}


const SummonerModel: SummonerModelType = {
  namespace: 'summoner',

  state: {
    name: '',
    summoners: [],
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield call(querySummonerList);
      const remoteData = yield call(querySummonerDetail, { summoner_id: 80108 });
      console.log(data)
      yield put({
        type: 'save',
        payload: {
          summoners: remoteData || data,
        },
      });

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/summoner') {
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

export default SummonerModel;

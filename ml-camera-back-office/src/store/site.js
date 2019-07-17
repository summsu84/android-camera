import 'core-js/fn/promise/finally';
import siteApi from '../api/site';

import {
  SITE_MENU_LIST,
  SITE_SUB_MENU_LIST,
  LOADING_STATE,
} from './types';

// Vuex 에서 관리하기 위한 코드 리스트 정보
// Emotion Code, Filter Code, Common Code
const initialState = {
  SiteList: [],
  SIteSubMenuList: [],
  loadingState: false,
};

// Getter 설정
const getters = {
  getSiteList: state => state.SiteList,
  getSiteSubMenuList: state => state.SIteSubMenuList,
  getLoadingState: state => state.loadingState,
};

/* Code Action Process */
const actions = {
  /* Site Menu */
  fetchSiteMenuList({ commit }) {
    commit(LOADING_STATE, true);
    return siteApi.selectSiteMenuList()
      .then((res) => {
        commit(LOADING_STATE, false);
        commit(SITE_MENU_LIST, res.data);
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
  fetchSiteMenuPost({ commit, dispatch }, payload) {
    commit(LOADING_STATE, true);
    return siteApi.postSiteMenu(payload)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchSiteMenuList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
  /* Site Sub Menu */
  fetchSiteSubMenuList({ commit }, payload) {
    commit(LOADING_STATE, true);
    return siteApi.selectSiteSubMenuList(payload)
      .then((res) => {
        commit(LOADING_STATE, false);
        commit(SITE_SUB_MENU_LIST, res.data);
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
  fetchSiteSubMenuPost({ commit, dispatch }, payload) {
    commit(LOADING_STATE, true);
    return siteApi.postSiteSubMenu(payload)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchSiteMenuList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
};

// Mutation 정의 - State 값을 변경하는 로직 정의
const mutations = {
  [SITE_MENU_LIST](state, payload) {
    state.SiteList = payload;
  },
  [SITE_SUB_MENU_LIST](state, payload) {
    state.SIteSubMenuList = payload;
  },
  [LOADING_STATE](state, payload) {
    // 로딩 스테이트
    state.loadingState = payload;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};

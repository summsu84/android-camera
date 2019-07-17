import 'core-js/fn/promise/finally';
import contentApi from '../api/content';

import {
  SPEECH_CONTENT_LIST,
  SELECTED_SPEECH_CONTENT_LIST,
  EMOTION_SPEECH_MAPPING_LIST,
  SELECTED_EMOTION_SPEECH_MAPPING_LIST,
  LOADING_STATE,
} from './types';

// Vuex 에서 관리하기 위한 컨텐츠 및 컨텐츠 맵핑 정보

const initialState = {
  ContentList: [],
  SelectedContent: '',
  EmoSpchMapList: [],
  APIKey: '',
  loadingState: false,
};

// Getter 설정
const getters = {
  getContentList: state => state.ContentList,
  getSelectedContent: state => state.SelectedEmotionCode,
  getEmoSpchMapList: state => state.EmoSpchMapList,
  getAPIKey: state => state.APIKey,
  getLoadingState: state => state.loadingState,
};

/* Content Action Process */
const actions = {
  /* CONTENT LIST */
  fetchContentList({ commit }) {
    commit('LOADING_STATE', true);
    return contentApi.selectContentList()
      .then((res) => {
        commit('LOADING_STATE', false);
        commit('SPEECH_CONTENT_LIST', res.data);
      })
      .catch(() => {
        commit('LOADING_STATE', false);
      });
  },
  /* Content List Distinct */
  fetchContentListDistinct({ commit }) {
    commit('LOADING_STATE', true);
    return contentApi.selectContentListDistinct()
      .then((res) => {
        commit('LOADING_STATE', false);
        commit('SPEECH_CONTENT_LIST', res.data);
      })
      .catch(() => {
        commit('LOADING_STATE', false);
      });
  },
  fetchContentPost({ commit, dispatch }, payload) {
    // 어플리케이션을 등록한다.
    commit('LOADING_STATE', true);
    return contentApi.postContent(payload)
      .then(() => {
        commit('LOADING_STATE', false);
        dispatch('fetchContentList');
      })
      .catch(() => {
        commit('LOADING_STATE', false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  fetchContentPut({ commit, dispatch }, payload) {
    // 어플리케이션을 수정한다.
    commit('LOADING_STATE', true);
    return contentApi.putContent(payload, payload.filter_cd)
      .then(() => {
        commit('LOADING_STATE', false);
        dispatch('fetchContentList');
      })
      .catch(() => {
        commit('LOADING_STATE', false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  /* EMO SPCH MAP LIST */
  fetchEmoSpchMapList({ commit }) {
    // EMO SPCH MAPPING 조회 한다.
    commit('LOADING_STATE', true);
    return contentApi.selectEmoSpchMappingList()
      .then((res) => {
        commit('LOADING_STATE', false);
        commit('EMOTION_SPEECH_MAPPING_LIST', res.data);
      })
      .catch(() => {
        commit('LOADING_STATE', false);
      });
  },
  fetchEmoSpchMapPost({ commit, dispatch }, payload) {
    // EMO SPCH MAPPING 등록한다.
    commit('LOADING_STATE', true);
    return contentApi.postEmoSpchMapping(payload)
      .then(() => {
        commit('LOADING_STATE', false);
        dispatch('fetchEmoSpchMapList');
      })
      .catch(() => {
        commit('LOADING_STATE', false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  fetchEmoSpchMapPut({ commit, dispatch }, payload) {
    // 어플리케이션을 수정한다.
    commit('LOADING_STATE', true);
    return contentApi.putEmoSpchMapping(payload, payload.filter_cd)
      .then(() => {
        commit('LOADING_STATE', false);
        dispatch('fetchEmoSpchMapList');
      })
      .catch(() => {
        commit('LOADING_STATE', false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
};

// Mutation 정의 - State 값을 변경하는 로직 정의
const mutations = {
  [SPEECH_CONTENT_LIST](state, payload) {
    // Speech Content List 추가
    state.ContentList = payload;
  },
  [SELECTED_SPEECH_CONTENT_LIST](state, payload) {
    // Selected Speech Content
    state.SelectedContent = payload;
  },
  [EMOTION_SPEECH_MAPPING_LIST](state, payload) {
    // Speech Content List 추가
    state.EmoSpchMapList = payload;
  },
  [SELECTED_EMOTION_SPEECH_MAPPING_LIST](state, payload) {
    // Selected Speech Content
    state.SelectedContent = payload;
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

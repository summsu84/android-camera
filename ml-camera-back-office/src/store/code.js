import 'core-js/fn/promise/finally';
import axios from 'axios';
import codeApi from '../api/code';

import {
  EMOTION_CODE_LIST,
  FILTER_CODE_LIST,
  COMMON_CODE_LIST,
  SPEECH_CODE_LIST,
  SELECTED_EMOTION_CODE,
  SELECTED_FILTER_CODE,
  SELECTED_COMMON_CODE,
  SELECTED_SPEECH_CODE,
  LOADING_STATE,
} from './types';

// Vuex 에서 관리하기 위한 코드 리스트 정보
// Emotion Code, Filter Code, Common Code
const initialState = {
  EmotionCodeList: [],
  FilterCodeList: [],
  CommonCodeList: [],
  SpeechCodeList: [],
  SelectedEmotionCode: '',
  SelectedFilterCode: '',
  SelectedCommonCode: '',
  SelectedSpeechCode: '',
  APIKey: '',
  loadingState: false,
};

// Getter 설정
const getters = {
  getEmotionCodeList: state => state.EmotionCodeList,
  getFilterCodeList: state => state.FilterCodeList,
  getCommonCodeList: state => state.CommonCodeList,
  getSpeechCodeList: state => state.SpeechCodeList,
  getSelectedEmotionCode: state => state.SelectedEmotionCode,
  getSelectedFilterCode: state => state.SelectedFilterCode,
  getSelectedCommonCode: state => state.SelectedCommonCode,
  getSelectedSpeechCode: state => state.SelectedSpeechCode,
  getAPIKey: state => state.APIKey,
  getLoadingState: state => state.loadingState,
};

/* Code Action Process */
const actions = {
  /* EMOTION CODE LIST */
  fetchEmotionCodeList(context, callback) {
    const strurl = 'http://localhost:8000/api/emotion/';
    const param = {
      method: 'get',
      url: strurl,
    };
    axios(param).then((res) => {
      context.commit(EMOTION_CODE_LIST, res.data);
      callback();
    }).catch((error) => {
      console.log(error);
    });
  },
  fetchEmotionCodePost({ commit, dispatch }, payload) {
    // 어플리케이션을 등록한다.
    commit(LOADING_STATE, true);
    return codeApi.postEmotionCode(payload)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchEmotionCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  fetchEmotionCodeLPut({ commit, dispatch }, payload) {
    // 어플리케이션을 수정한다.
    commit(LOADING_STATE, true);
    return codeApi.putEmotionCode(payload, payload.cd_emo_ctgrz)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchEmotionCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  /* Filter Code */
  fetchFilterCodeList({ commit }) {
    commit(LOADING_STATE, true);
    return codeApi.selectFilterList()
      .then((res) => {
        commit(LOADING_STATE, false);
        commit(FILTER_CODE_LIST, res.data);
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
  fetchFilterCodePost({ commit, dispatch }, payload) {
    // 어플리케이션을 등록한다.
    commit(LOADING_STATE, true);
    return codeApi.postFilterCode(payload)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchFilterCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  fetchFilterCodeLPut({ commit, dispatch }, payload) {
    // 어플리케이션을 수정한다.
    commit(LOADING_STATE, true);
    return codeApi.putFilterCode(payload, payload.filter_cd)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchFilterCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  /* Common Code */
  fetchCommonCodeList({ commit }) {
    commit(LOADING_STATE, true);
    return codeApi.selectCommonCodeList()
      .then((res) => {
        commit(LOADING_STATE, false);
        commit(COMMON_CODE_LIST, res.data);
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
  fetchCommonCodePost({ commit, dispatch }, payload) {
    // 어플리케이션을 등록한다.
    commit(LOADING_STATE, true);
    return codeApi.postCommonCode(payload)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchCommonCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  fetchCommonCodeLPut({ commit, dispatch }, payload) {
    // 어플리케이션을 수정한다.
    commit(LOADING_STATE, true);
    return codeApi.putCommonCode(payload, payload.filter_cd)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchCommonCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  /* Speech Code */
  fetchSpeechCodeList({ commit }) {
    commit(LOADING_STATE, true);
    return codeApi.selectSpeechCodeList()
      .then((res) => {
        commit(LOADING_STATE, false);
        commit(SPEECH_CODE_LIST, res.data);
      })
      .catch(() => {
        commit(LOADING_STATE, false);
      });
  },
  fetchSpeechCodePost({ commit, dispatch }, payload) {
    // 어플리케이션을 등록한다.
    commit(LOADING_STATE, true);
    return codeApi.postSpeechCode(payload)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchSpeechCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
  fetchSpeechCodeLPut({ commit, dispatch }, payload) {
    // 어플리케이션을 수정한다.
    commit(LOADING_STATE, true);
    return codeApi.putSpeechCode(payload, payload.filter_cd)
      .then(() => {
        commit(LOADING_STATE, false);
        dispatch('fetchSpeechCodeList');
      })
      .catch(() => {
        commit(LOADING_STATE, false);
        // commit(LUIS_REQUEST_FAILURE);
      });
  },
};

// Mutation 정의 - State 값을 변경하는 로직 정의
const mutations = {
  [EMOTION_CODE_LIST](state, payload) {
    // Emotion COde List 추가
    state.EmotionCodeList = payload;
  },
  [FILTER_CODE_LIST](state, payload) {
    // Filter COde List 추가
    state.FilterCodeList = payload;
  },
  [COMMON_CODE_LIST](state, payload) {
    // Common COde List 추가
    state.CommonCodeList = payload;
  },
  [SPEECH_CODE_LIST](state, payload) {
    // Speech Code List 추가
    state.SpeechCodeList = payload;
  },
  [SELECTED_EMOTION_CODE](state, payload) {
    // Emotion COde List 추가
    state.EmotionCodeList = payload;
  },
  [SELECTED_FILTER_CODE](state, payload) {
    // Filter COde List 추가
    state.FilterCodeList = payload;
  },
  [SELECTED_COMMON_CODE](state, payload) {
    // Common COde List 추가
    state.CommonCodeList = payload;
  },
  [SELECTED_SPEECH_CODE](state, payload) {
    // Common COde List 추가
    state.CommonCodeList = payload;
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

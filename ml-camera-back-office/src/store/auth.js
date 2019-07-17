import 'core-js/fn/promise/finally';
import jwtDecode from 'jwt-decode';
import auth from '../api/auth';
import session from '../api/session';
import router from '../router';

import {
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
  SET_REFRESH_TOKEN,
  REFRESH_TOKEN_BEGIN,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
} from './types';


const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';
const TOKEN_REFRESH_STORAGE_KEY = 'TOKEN_REFRESH_STORAGE_KEY';
// expired 시간이 100 초 이하로 남은 경우, api call 시 refresh 하도록 처리
const TOKEN_AUTO_REFRESH_TIME = 100;

const initialState = {
  authenticating: false,
  error: false,
  token: null,
  rToken: null,
  serverTime: null,
};

const getters = {
  isAuthenticated: state => !!state.token,
  getToken: state => state.token,
  getRefreshToken: state => state.rToken,
  serverTime: state => state.serverTime,
};

const actions = {
  login({ commit, dispatch }, { username, password }) {
    dispatch('inspectToken');
    commit(LOGIN_BEGIN);
    return auth.login(username, password)
      .then(({ data }) => {
        // commit(SET_TOKEN, data.access);
        commit(SET_TOKEN, data.token);
        commit(SET_REFRESH_TOKEN, data.refresh);
      })
      .then(() => {
        commit(LOGIN_SUCCESS);
      })
      .catch((err) => {
        console.log(err);
        commit(LOGIN_FAILURE);
      });
  },
  loginRefresh({ commit }) {
    const rToken = localStorage.getItem(TOKEN_REFRESH_STORAGE_KEY);
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    console.log(`loginRefresh rToken: ${rToken}`);
    console.log(`loginRefresh token: ${token}`);

    commit(REFRESH_TOKEN_BEGIN);
    /*
    return auth.loginRefresh(rToken)
      .then(({ data }) => commit(SET_TOKEN, data.access))
      .then(() => commit(REFRESH_TOKEN_SUCCESS))
      .catch(() => commit(REFRESH_TOKEN_FAILURE));
     */
  },
  logout({ commit, dispatch }) {
    dispatch('inspectToken');
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token == null) {
      router.push('/login');
      return null;
    }
    return auth.logout(token)
      .then(() => commit(LOGOUT))
      .finally(() => commit(REMOVE_TOKEN));
  },
  inspectToken() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    // eslint-disable-next-line
    // console.log(`store/auth/inspectToken token: ${token}`);
    if (token) {
      // commit('SET_SERVER_TIME');
      let nowtime = Date.now() / 1000;
      // 서버에서 현재 시간을 가져오는데, expired 된 토큰을 Authorization 헤더로 보내면 401 에러가 발생
      // 서버 시간 조회 API는 인증이 필요 없게 설정했음에도 불구하고, 401 리턴 됨
      const authToken = session.defaults.headers.common.Authorization;
      delete session.defaults.headers.common.Authorization;
      auth.serverTime()
        .then(({ data }) => {
          nowtime = data.servertime;
          // console.log(`api unix servertime: ${nowtime}`);
          const decoded = jwtDecode(token);
          const exp = decoded.exp;
          // eslint-disable-next-line
          // console.log(`expiration unix datetime: ${exp}`);
          // eslint-disable-next-line
          // console.log(`now unix datetime: ${nowtime}`);
          const remainTime = exp - nowtime;
          // eslint-disable-next-line
          // console.log(`remain unix datetime: ${remainTime} seconds`);
          // 토큰 만료 전 유효한 토크으로 새로운 토큰을 받아 온다
          if (((remainTime) > 0)
            &&
            ((remainTime) < TOKEN_AUTO_REFRESH_TIME)) {
            // eslint-disable-next-line
            // console.log(`inspectToken status 1 - token is valid, but You will need new token soon within ${ exp - nowtime } seconds`);
            this.dispatch('auth/loginRefresh');
          } else if ((remainTime) > 0) {
            session.defaults.headers.common['Content-Type'] = 'application/json';
            session.defaults.headers.common.Authorization = authToken;
            // eslint-disable-next-line
            // console.log(`inspectToken status 2 - token is valid`);
          } else {
            // eslint-disable-next-line
            console.log(`inspectToken status 3 - token expired, You need new token now`);
            // 만료된 토큰을 함께 보내면 에러 발생 토큰을 지워준다
            // delete session.defaults.headers.Authorization;
            this.dispatch('auth/loginRefresh');
          }
        })
        .catch((error) => {
          console.log(`store/auth/inspectToken/error: ${error}`);
          this.dispatch('auth/loginRefresh');
        });
    }
  },
  initialize({ commit }) {
    // dispatch('inspectToken');
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    // eslint-disable-next-line
    // console.log(`store/auth/initialize token: ${token}`);
    if (token) {
      commit(SET_TOKEN, token);
    } else {
      commit(REMOVE_TOKEN);
    }
  },
};

const mutations = {
  [LOGIN_BEGIN](state) {
    state.authenticating = true;
    state.error = false;
  },
  [LOGIN_FAILURE](state) {
    state.authenticating = false;
    state.error = true;
  },
  [LOGIN_SUCCESS](state) {
    state.authenticating = false;
    state.error = false;
  },
  [LOGOUT](state) {
    state.authenticating = false;
    state.error = false;
  },
  [SET_TOKEN](state, token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    session.defaults.headers.Authorization = `token ${token}`;
    state.token = token;
  },
  [SET_REFRESH_TOKEN](state, rToken) {
    localStorage.setItem(TOKEN_REFRESH_STORAGE_KEY, rToken);
    state.rToken = rToken;
  },
  [REMOVE_TOKEN](state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    delete session.defaults.headers.Authorization;
    state.token = null;
    state.rToken = null;
  },
  [REFRESH_TOKEN_BEGIN]() {
  },
  [REFRESH_TOKEN_FAILURE]() {
  },
  [REFRESH_TOKEN_SUCCESS]() {
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};

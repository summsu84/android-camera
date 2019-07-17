import auth from '../api/auth';
import users from '../api/users';
import {
  ACTIVATION_BEGIN,
  ACTIVATION_CLEAR,
  ACTIVATION_FAILURE,
  ACTIVATION_SUCCESS,
  REGISTRATION_BEGIN,
  REGISTRATION_CLEAR,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  USERS_SEARCH_BEGIN,
  USERS_SEARCH_SUCCESS,
  USERS_SEARCH_FAILURE,
} from './types';

export default {
  namespaced: true,
  state: {
    activationCompleted: false,
    activationError: false,
    activationLoading: false,
    registrationCompleted: false,
    registrationError: false,
    registrationLoading: false,
    usersComplete: false,
    usersError: false,
    usersLoading: false,
    usersItems: [],
  },
  getters: {
    usersItems: state => state.usersItems,
  },
  actions: {
    selectAccounts({ commit }) {
      this.dispatch('auth/inspectToken');
      commit(USERS_SEARCH_BEGIN);
      return users.selectUsers()
        .then(({ data }) => commit(USERS_SEARCH_SUCCESS, data))
        .catch(() => commit(USERS_SEARCH_FAILURE));
    },
    createAccount({ commit }, { username, password1, password2, email }) {
      this.dispatch('auth/inspectToken');
      commit(REGISTRATION_BEGIN);
      return auth.createAccount(username, password1, password2, email)
        .then(() => commit(REGISTRATION_SUCCESS))
        .catch(() => commit(REGISTRATION_FAILURE));
    },
    activateAccount({ commit }, { key }) {
      commit(ACTIVATION_BEGIN);
      return auth.verifyAccountEmail(key)
        .then(() => commit(ACTIVATION_SUCCESS))
        .catch(() => commit(ACTIVATION_FAILURE));
    },
    clearRegistrationStatus({ commit }) {
      commit(REGISTRATION_CLEAR);
    },
    clearActivationStatus({ commit }) {
      commit(ACTIVATION_CLEAR);
    },
  },
  mutations: {
    [ACTIVATION_BEGIN](state) {
      state.activationLoading = true;
    },
    [ACTIVATION_CLEAR](state) {
      state.activationCompleted = false;
      state.activationError = false;
      state.activationLoading = false;
    },
    [ACTIVATION_FAILURE](state) {
      state.activationError = true;
      state.activationLoading = false;
    },
    [ACTIVATION_SUCCESS](state) {
      state.activationCompleted = true;
      state.activationError = false;
      state.activationLoading = false;
    },
    [REGISTRATION_BEGIN](state) {
      state.registrationLoading = true;
    },
    [REGISTRATION_CLEAR](state) {
      state.registrationCompleted = false;
      state.registrationError = false;
      state.registrationLoading = false;
    },
    [REGISTRATION_FAILURE](state) {
      state.registrationError = true;
      state.registrationLoading = false;
    },
    [REGISTRATION_SUCCESS](state) {
      state.registrationCompleted = true;
      state.registrationError = false;
      state.registrationLoading = false;
    },
    [USERS_SEARCH_BEGIN](state) {
      state.usersComplete = false;
      state.usersError = false;
      state.usersLoading = true;
    },
    [USERS_SEARCH_SUCCESS](state, usersItems) {
      state.usersComplete = true;
      state.usersError = false;
      state.usersLoading = false;
      state.usersItems = usersItems;
    },
    [USERS_SEARCH_FAILURE](state) {
      state.usersComplete = false;
      state.usersError = true;
      state.usersLoading = false;
    },
  },
};

import axios from 'axios';
import store from '../store';

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  baseURL: 'http://localhost:8000/',
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME,
});

/* eslint no-underscore-dangle: 0 */
session.interceptors.response.use(
  response => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('auth/loginRefresh')
        .then(() => {
          const token = store.getters['auth/getToken'];
          session.defaults.headers.common['Content-Type'] = 'application/json';
          session.defaults.headers.common.Authorization = `token ${token}`;
          originalRequest.headers['Content-Type'] = 'application/json';
          originalRequest.headers.Authorization = `token ${token}`;
          return session(originalRequest);
        })
        .catch((errorDispath) => {
          console.log(`errorDispath: ${errorDispath}`);
          Promise.reject(error);
        });
    }
    return Promise.reject(error);
  },
);

export default session;

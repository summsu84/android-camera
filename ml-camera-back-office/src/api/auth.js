import session from './session';

// return session.post('http://127.0.0.1:8000/registration/', { username, password1, password2, email });

export default {
  serverTime() {
    return session.get('/servertime/', { });
  },
  login(username, password) {
    return session.post('/api-token-auth/', { username, password });
  },
  loginRefresh() {
    // return session.post('/api-token-refresh/', { refresh });
    // no jobs
  },
  loginVerify(access) {
    return session.post('/api-token-verify/', { access });
  },
  logout(token) {
    const type = 'logout';
    return session.post('/api-logout/', { token, type });
  },
  logout_backup() {
    return session.post('/auth/logout/', {});
  },
  createAccount(username, password1, password2, email) {
    return session.post('/registration/', { username, password1, password2, email });
  },
  changeAccountPassword(password1, password2) {
    return session.post('/auth/password/change/', { password1, password2 });
  },
  sendAccountPasswordResetEmail(email) {
    return session.post('/auth/password/reset/', { email });
  },
  resetAccountPassword(uid, token, new_password1, new_password2) { // eslint-disable-line camelcase
    return session.post('/auth/password/reset/confirm/', { uid, token, new_password1, new_password2 });
  },
  getAccountDetails() {
    return session.get('/auth/user/');
  },
  updateAccountDetails(data) {
    return session.patch('/auth/user/', data);
  },
  verifyAccountEmail(key) {
    return session.post('/registration/verify-email/', { key });
  },
};

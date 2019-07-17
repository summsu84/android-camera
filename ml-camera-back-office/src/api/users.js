import session from './session';

export default {
  selectUsers() {
    return session.get('/users/', { });
  },
};

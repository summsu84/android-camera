/* eslint-disable arrow-parens,prefer-template */
import session from './session';

export default {
  /* Site Mng */
  postSiteMenu(data) {
    // SiteMenu 등록
    return session.post('/api/site/menu', data);
  },
  selectSiteMenuList() {
    return session.get('/api/site/menu', { });
  },
  /* Site Sub Mng */
  postSiteSubMenu(data) {
    // SiteMenu 등록
    return session.post('/api/site/menu', data);
  },
  selectSiteSubMenuList(menuCd) {
    return session.get(`/api/site/menu/sub/${menuCd}`, { });
  },
};

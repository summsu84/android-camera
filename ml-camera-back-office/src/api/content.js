/* eslint-disable arrow-parens,prefer-template */
import session from './session';

/**
 *  Author : JJW
 *  Date : 2018.12.04
 *  Desc : 컨텐츠 관리 API
 */
export default {
  /* Content Code Mng */
  postContent(data) {
    // SPCH Content 등록
    return session.post('/api/spch_cont/', data);
  },
  putContent(data, code) {
    // SPCH Content 수정
    return session.put(`/api/spch_cont/${code}/`, data);
  },
  selectContentList() {
    return session.get('/api/spch_cont/', { });
  },
  selectContentListDistinct() {
    return session.get('/api/spch_cont_dict/', { });
  },
  selectContent(code) {
    return session.get(`/api/spch_cont/${code}`, { });
  },
  /* Content Code Mng */
  postEmoSpchMapping(data) {
    // SPCH Content 등록
    return session.post('/api/emo_spch_mp/', data);
  },
  putEmoSpchMapping(data, code) {
    // SPCH Content 수정
    return session.put(`/api/emo_spch_mp/${code}/`, data);
  },
  selectEmoSpchMappingList() {
    return session.get('/api/emo_spch_mp/', { });
  },
  selectEmoSpchMapping(code) {
    return session.get(`/api/emo_spch_mp/${code}`, { });
  },
};

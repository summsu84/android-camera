/* eslint-disable arrow-parens,prefer-template */
import session from './session';

export default {
  selectLUISApplicationList() {
    const params = {
      // Request parameters
      skip: 0,
      take: 100,
    };
    const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    return session.get(`/luis-application/?${queryString}`, { });
  },
  postEmotionCode(data) {
    // Emotion 등록
    return session.post('/emotion/', data);
  },
  putEmotionCode(data, code) {
    // Emotion 수정
    return session.put(`/api/emotion/${code}/`, data);
    // return session.get(`/luis-application/${appId}/`, { });
  },
  selectEmotionList() {
    return session.get('/api/emotion/', { });
  },
  selectEmotion(code) {
    return session.get(`/api/emotion/${code}`, { });
  },
  /* Filter Code Mng */
  postFilterCode(data) {
    // Emotion 등록
    return session.post('/api/filter/', data);
  },
  putFilterCode(data, code) {
    // Emotion 수정
    return session.put(`/api/filter/${code}/`, data);
    // return session.get(`/luis-application/${appId}/`, { });
  },
  selectFilterList() {
    return session.get('/api/filter/', { });
  },
  selectFilter(code) {
    return session.get(`/api/filter/${code}`, { });
  },
  /* Common Code Mng */
  postCommonCode(data) {
    // CommonCode 등록
    return session.post('/api/common_cd/', data);
  },
  putCommonCode(data, code) {
    // Emotion 수정
    return session.put(`/api/common_cd/${code}/`, data);
    // return session.get(`/luis-application/${appId}/`, { });
  },
  selectCommonCodeList() {
    return session.get('/api/common_cd/', { });
  },
  selectCommonCode(code) {
    return session.get(`/api/common_cd/${code}`, { });
  },
  /* Speech Code Mng */
  postSpeechCode(data) {
    // Speech Code 등록
    return session.post('/api/speech_cd/', data);
  },
  putSpeechCode(data, code) {
    // Speech Code 수정
    return session.put(`/api/speech_cd/${code}/`, data);
    // return session.get(`/luis-application/${appId}/`, { });
  },
  selectSpeechCodeList() {
    return session.get('/api/speech_cd/', { });
  },
  selectSpeechCode(code) {
    return session.get(`/api/speech_cd/${code}`, { });
  },
};

/**
 * BackEnd 요청을 위한 URL을 생성한다.
 * @param requestName
 */
function generateCodeRequestUrl(data, requestType, code) {
  const param = {
    method: '',
    url: '',
  };
  let url = '';
  const baseUrl = 'http://localhost:8000/api/';
  switch (requestType) {
    /* Emotion Code */
    case 'REQUEST_LIST_EMOTION_CODE' :
      url = `${baseUrl}emotion`;
      param.method = 'get';
      break;
    case 'REQUEST_EMOTION_CODE' :
      url = `${baseUrl}emotion/${code}`;
      param.method = 'get';
      break;
    case 'REQUEST_PUT_EMOTION_CODE' :
      url = `${baseUrl}emotion/${code}`;
      param.method = 'put';
      break;
    case 'REQUEST_POST_EMOTION_CODE' :
      url = `${baseUrl}emotion/`;
      param.method = 'post';
      break;
    case 'REQUEST_DELETE_EMOTION_CODE' :
      url = `${baseUrl}emotion/${code}`;
      param.method = 'delete';
      break;
    default:
  }
  param.url = url;
  if (data != null) {
    param.data = data;
  }
  return param;
}

exports.generateCodeRequestUrl = generateCodeRequestUrl;

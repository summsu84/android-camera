/* eslint-disable no-prototype-builtins,prefer-const,no-restricted-syntax,no-cond-assign,prefer-rest-params,one-var-declaration-per-line,no-plusplus,no-var,space-infix-ops,no-use-before-define,spaced-comment,guard-for-in,curly,keyword-spacing,max-len,brace-style,vars-on-top,camelcase,prefer-template,no-undef,eqeqeq,no-new-object,one-var,func-names,semi */
function getTomorrow() {
  var today = new Date();
  var tomorrow = new Date(today.valueOf() + (24 * 60 * 60 * 1000));

  return tomorrow;
}

function parsingHeader(resultData) {
  let parsingParam = ['header_key', 'header_value', 'use_yn'];
  return parsingHeaderAndQueryString(resultData, parsingParam);
}

function createHeaderInfo(data) {
  let tmpHeader = '';
  let k;
  //헤더 정보
  for (k in data)
  {
    let tmp = data[k];
    if(tmp.header_key.length > 0)
      tmpHeader += `${tmpHeader}&${tmp.header_key}=${tmp.header_value}`;
  }
  return tmpHeader.substring(1);
}

function createQueryStringInfo(data) {
  let tmpQueryString = '';
  let k;
  for (k in data)
  {
    let tmp = data[k];
    if(tmp.key.length > 0)
      tmpQueryString += `${tmpQueryString}&${tmp.key}=${tmp.value}`;
  }
  return tmpQueryString.substring(1);
}

function parsingQueryString(resultData)
{
  let parsingParam = ['key', 'value'];
  return parsingHeaderAndQueryString(resultData, parsingParam);
}

function parsingHeaderAndQueryString(data, parsingParam)
{
  //1. data를 '&'를 기준으로 분해한다.
  let dataList = data.split('&');

  //헤더 정보 파싱
  let dataObjList = [];
  for(var i in dataList)
  {
    let tmp = dataList[i];
    if(tmp.length > 0)
    {
      //'='으로 분해한다.
      let tmpKeyValue = tmp.split('=');
      let obj = new Object();
      /*let idx = 0;*/
      for(var k in parsingParam)
      {
        if(parsingParam[k] == 'use_yn')
        {
          obj[parsingParam[k]] = true;
        }else {
          obj[parsingParam[k]] = (tmpKeyValue[k] != undefined ? tmpKeyValue[k] : '');
        }
      }
      dataObjList.push(obj);
    }
  }

  return dataObjList;
}

function removeAllObject() {

}

function copyRemoveAndCopy(src, dst) {
  src.splice(0, src.length);

  for(var i in dst)
  {
    src.push(dst[i]);
  }
}
/**
 * YYY
 * @param date
 * @returns {string}
 */
function toYYYY_MM_DD(date)
{
  var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  if (month.length < 2) month = '0' + month; if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

function removeSpace(data) {
  var retVal = data.replace(/(\s*)/g, '');
  return retVal;
}

function removeArrayByValue(arr)
{
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

//  Copy
function iterationCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }
  return target;
}

exports.getTomorrow = getTomorrow;
exports.parsingHeader = parsingHeader;
exports.parsingQueryString = parsingQueryString;
exports.removeAllObject = removeAllObject;
exports.copyRemoveAndCopy = copyRemoveAndCopy;
exports.createQueryStringInfo = createQueryStringInfo;
exports.createHeaderInfo = createHeaderInfo;
exports.toYYYY_MM_DD = toYYYY_MM_DD;
exports.removeSpace = removeSpace;
exports.removeArrayByValue = removeArrayByValue;
exports.iterationCopy = iterationCopy;


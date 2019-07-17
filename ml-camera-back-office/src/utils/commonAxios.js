/* eslint-disable no-param-reassign,no-unused-expressions */
import axios from 'axios';

export default {
  install: (Vue) => {
    Vue.prototype.$commonAxiosRequest = (param, successCallback, failedCallback) => {
      axios(param)
        .then((res) => {
          console.log('axios common request...');
          successCallback(res);
        }, (res) => {
          failedCallback(res);
        });
    };
    Vue.prototype.$commonAxiosPostRequest = (url, data, successCallback, failedCallback) => {
      axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        successCallback(res);
      }, (res) => {
        if (typeof failedCallback === 'undefined') {
          console.log(`failed... ${res.message}`);
        }
      });
    };
    Vue.prototype.$commonAxiosPutRequest = (url, data, successCallback, failedCallback) => {
      axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        successCallback(res);
      }, (res) => {
        if (typeof failedCallback === 'undefined') {
          console.log(`failed... ${res.message}`);
        }
      });
    };
    Vue.prototype.$commonAxiosDeleteRequest = (url, data, successCallback, failedCallback) => {
      axios.delete(url, {}).then((res) => {
        successCallback(res);
      }, (res) => {
        if (typeof failedCallback === 'undefined') {
          console.log(`failed... ${res.message}`);
        }
      });
    };
  },
};

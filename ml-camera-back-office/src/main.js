/* eslint-disable import/newline-after-import */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise';
import 'core-js/es6/string';
import 'core-js/es7/array';

import 'jquery/dist/jquery.min';
import 'pace-progress/pace.min';
import 'perfect-scrollbar/dist/perfect-scrollbar.min';
import 'popper.js/dist/popper.min';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'vue-awesome/icons/flag';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg';

// import vue wysiwyg
import wysiwyg from 'vue-wysiwyg';

import App from './App';
import router from './router';
import store from './store';

import commonAxiosRequest from './utils/commonAxios';

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min');

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');
require('froala-editor/css/froala_style.min.css');
// common module 구현 테스트용 - JJW
Vue.use(commonAxiosRequest, '$commonAxiosRequest');

// aws-sdk
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(require('aws-sdk'));
Vue.use(VueFroala);
Vue.use(wysiwyg, {
  hideModules: {
    bold: false,
  },
});
Vue.component('icon', Icon);

export default new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {
    App,
  },
});


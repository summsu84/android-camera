import Vue from 'vue';
import Router from 'vue-router';

// Containers
import DefaultContainer from '@/containers/DefaultContainer';

import About from '../views/About';
import Home from '../views/Home';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Lost from '../views/Lost';
import PasswordReset from '../views/PasswordReset';
import PasswordResetConfirm from '../views/PasswordResetConfirm';
import Register from '../views/Register';
import VerifyEmail from '../views/VerifyEmail';
import UserManagement from '../views/UserManagement';
import AlarmUserManagement from '../views/AlarmUserManagement';
import LUISAppSearch from '../views/EmotionCodeManagement';
import FilterCodeSearch from '../views/FilterCodeManagement';
import SpeechContentRegView from '../views/SpeechContentManagement';
import SpeechContentDetailView from '../views/SpeechContentManagementDetail';
import EmotionSpeechMappingView from '../views/EmotionSpeechMapping';
import CameraImageView from '../views/CameraImageComponent';
import CommonCodeView from '../views/CommonCodeManagement';
import SpchCodeView from '../views/SpeechCodeManagement';
import SiteContentsManagementView from '../views/ContentsManagement';
import SiteImageMangementView from '../views/ImageManagementComponent';
import TeamMain from '../views/Main';
import SiteMenuManagementView from '../views/MenuManagement';
import SiteSubMenuManagementView from '../views/MenuManagementDetail';
import store from '../store';

const requireAuthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (!store.getters['auth/isAuthenticated']) {
        next('/login');
      } else {
        next();
      }
    });
};

const requireUnauthenticated = (to, from, next) => {
  store.dispatch('auth/initialize')
    .then(() => {
      if (store.getters['auth/isAuthenticated']) {
        next('/login');
      } else {
        next();
      }
    });
};

const redirectLogout = (to, from, next) => {
  store.dispatch('auth/logout')
    .then(() => next('/login'));
};

Vue.use(Router);

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  saveScrollPosition: true,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: requireUnauthenticated,
    },
    {
      path: '/teamjw',
      name: 'teamjw',
      component: TeamMain,
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'main',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Main Dashboard',
          redirect: 'dashboard',
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'dashboard/conversation',
          name: 'Dashboard Conversation',
          component: Dashboard,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'dashboard/tech',
          name: 'Dashboard Tech',
          component: Dashboard,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'dashboard/web',
          name: 'Dashboard Web',
          component: Dashboard,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'logout',
          name: 'Logout',
          beforeEnter: redirectLogout,
        },
        {
          path: 'about',
          name: 'About',
          component: About,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'home',
          name: 'Home',
          component: Home,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'password_reset',
          name: 'Password Reset',
          component: PasswordReset,
        },
        {
          path: 'password_reset/:uid/:token',
          name: 'Password Reset Detail',
          component: PasswordResetConfirm,
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
        },
        {
          path: 'register/:key',
          name: 'Register Key',
          component: VerifyEmail,
        },
        {
          path: 'user-management',
          name: 'User Management',
          component: UserManagement,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'alarm-user-management',
          name: 'Alarm User Management',
          component: AlarmUserManagement,
          beforeEnter: requireAuthenticated,
        },
        {
          path: 'code/emotion',
          name: 'Emotion Code Management',
          component: LUISAppSearch,
        },
        {
          path: 'code/filter',
          name: 'Filter Code Management',
          component: FilterCodeSearch,
        },
        {
          path: 'code/common',
          name: 'Common Code Management',
          component: CommonCodeView,
        },
        {
          path: 'code/spch',
          name: 'Spch Code Management',
          component: SpchCodeView,
        },
        {
          path: 'emotion_speech/registration',
          name: 'Emotion Speech Registration',
          component: SpeechContentRegView,
        },
        {
          path: 'emotion_speech/registration/:spch_cont_id',
          name: 'Emotion Speech Registration Detail',
          component: SpeechContentDetailView,
        },
        {
          path: 'emotion_speech/mapping',
          name: 'Emotion Speech Registration',
          component: EmotionSpeechMappingView,
        },
        {
          path: 'picture/load',
          name: 'CameraImage',
          component: CameraImageView,
        },
        {
          path: '/site/content',
          name: 'SiteContentsManagementView',
          component: SiteContentsManagementView,
        },
        {
          path: '/site/image',
          name: 'SiteImageMangementView',
          component: SiteImageMangementView,
        },
        {
          path: '/site/menu',
          name: 'SiteMenuManagementView',
          component: SiteMenuManagementView,
        },
        {
          path: '/site/menu/sub/:menu_cd',
          name: 'SiteSubMenuManagementView',
          component: SiteSubMenuManagementView,
        },
        {
          path: '*',
          component: Lost,
        },
      ],
    },
  ],
});

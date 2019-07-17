<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// import Navbar from './components/Navbar';
// components Navbar,
export default {
  name: 'app',
  components: {
  },
  computed: mapGetters('auth', [
    'isAuthenticated',
  ]),
};
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '../node_modules/@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '../node_modules/flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
  // pace progress
  @import '../node_modules/pace-progress/templates/pace-theme-center-simple.tmpl.css';

</style>

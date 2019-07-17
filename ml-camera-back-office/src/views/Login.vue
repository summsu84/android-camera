<template>
  <div id="login-wrapper border border-light">
    <b-form class="form-signin" @submit.prevent="submit">
    <h2 class="form-signin-heading">ML CAMERA 관리 페이지</h2>
    <b-form-group
        id="fieldset1"
        description=""
        label="Enter your email"
        label-for="username"
        :invalid-feedback="invalidFeedbackUserName"
        :valid-feedback="validFeedbackUserName"
        :state="stateUserName">
    <b-form-input v-model="inputs.username" type="text" id="username"
        placeholder="email" class="form-control"></b-form-input>
    </b-form-group>
    <b-form-group
        id="fieldset2"
        description=""
        label="Enter your password"
        label-for="password"
        :invalid-feedback="invalidFeedbackPassword"
        :valid-feedback="validFeedbackPassword"
        :state="statePassword">
    <b-form-input v-model="inputs.password" type="password" id="password"
        placeholder="password" class="form-control"></b-form-input>
    </b-form-group>
    <b-button @click="login(inputs)" id="login-button"
        class="btn btn-lg btn-primary btn-block">
    login
    </b-button>
    <div>
    <router-link to="/register">create account</router-link> |
    <router-link to="/password_reset">reset password</router-link>
    </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        username: '',
        password: '',
      },
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    login({ username, password }) {
      this.$store.dispatch('auth/login', { username, password })
        .then(() => this.$router.push('/'));
    },
    init() {
      this.$store.dispatch(('auth/initialize', {}));
    },
  },
  computed: {
    stateUserName() {
      // return this.inputs.username.length >= 4 ? true : false;
      return this.inputs.username.length >= 4;
    },
    statePassword() {
      // return this.inputs.username.length >= 4 ? true : false;
      return this.inputs.password.length >= 4;
    },
    invalidFeedbackUserName() {
      if (this.inputs.username.length > 4) {
        return '';
      } else if (this.inputs.username.length > 0) {
        return 'Enter at least 4 characters';
      }
      return '';
    },
    validFeedbackUserName() {
      return this.stateUserName === true ? 'Thank you' : '';
    },
    invalidFeedbackPassword() {
      if (this.inputs.password.length > 4) {
        return '';
      } else if (this.inputs.password.length > 0) {
        return 'Enter at least 4 characters';
      }
      return '';
    },
    validFeedbackPassword() {
      return this.statePassword === true ? 'Thank you' : '';
    },
  },
};
</script>

<style>
body {
  background: #bfe1ff;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 550px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading{
    text-align: center;
    margin-bottom: 10px;
    color: #0074D9;
}
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

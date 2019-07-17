<template>
  <div id="login-view">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">한진 챗봇 관리 페이지</h3>
                    </div>
                    <div class="panel-body">
                        <form @submit.prevent="submit" role="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" v-model="inputs.username"
                                        type="text" id="username" placeholder="username"
                                        autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control"  v-model="inputs.password"
                                        type="password" id="password" placeholder="password">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me">
                                        Remember Me
                                    </label>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button @click="login(inputs)"
                                    class="btn btn-lg btn-success btn-block"
                                    id="login-button">
                                로그인
                                </button>
                                 <div>
                                  <router-link to="/register">create account</router-link> |
                                  <router-link to="/password_reset">reset password</router-link>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
  methods: {
    login({ username, password }) {
      this.$store.dispatch('auth/login', { username, password })
        .then(() => this.$router.push('/'));
    },
  },
};
</script>

<style>
form input {
  display: block
}
</style>

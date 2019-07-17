<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12" md="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i> <strong>계정 조회</strong>
              <small><code>관리</code></small>
            </div>
            <div role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <h5 class="mb-0">
                    <a data-toggle="collapse" href="#"
                    v-b-toggle.accordion1 variant="info">
                    계정 등록
                    </a>
                    </h5>
                </b-card-header>
                <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <div id="register-view">
                        <template v-if="registrationLoading">
                        loading...
                        </template>
                        <template v-else-if="!registrationCompleted">
                        <b-form @submit.prevent="submit" @reset="onReset">
                            <b-form-group id="exampleInputGroup1"
                                        label="아이디:"
                                        label-for="exampleInput1">
                            <b-form-input id="exampleInput1"
                                        type="text"
                                        v-model="inputs.username"
                                        required
                                        placeholder="아이디를 입력 해주세요.">
                            </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup1"
                                            label="이메일:"
                                            label-for="exampleInput2"
                                            description="이메일 주소를 입력 해주세요.">
                                <b-form-input id="exampleInput2"
                                            type="email"
                                            v-model="inputs.email"
                                            required
                                            placeholder="이메일 주소를 입력 해주세요.">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                description="복잡한 비밀키를 입력 해주세요."
                                label="비밀키"
                                label-for="basicPassword1"
                                :label-cols="2"
                                :horizontal="true">
                                <b-form-input id="basicPassword1" type="password"
                                v-model="inputs.password1"
                                placeholder="비밀키를 입력해주세요."
                                autocomplete="current-password"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                description="위 비밀키와 같은 비밀키를 입력 해주세요."
                                label="비밀키 확인"
                                label-for="basicPassword2"
                                :label-cols="2"
                                :horizontal="true">
                                <b-form-input id="basicPassword2" type="password"
                                v-model="inputs.password2"
                                placeholder="비밀키를 입력해주세요."
                                autocomplete="current-password"></b-form-input>
                            </b-form-group>
                        </b-form >
                        <!--
                        <button @click="createAccount(inputs)">
                            계정 생성
                        </button>
                        -->
                        <b-button type="submit" variant="primary"
                        @click="createAccount(inputs)">계정 생성</b-button>
                        <b-button type="reset" variant="danger">
                            새화면</b-button>
                        <span class="error" v-show="registrationError">
                            저장 중 에러 발생
                        </span>
                        </template>
                        <template v-else>
                        <div>
                            <b-btn @click="afterConfirmReset()"
                            v-b-toggle.accordion2 variant="info">
                              등록 완료
                            </b-btn>
                        </div>
                        </template>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <h5 class="mb-0">
                    <a data-toggle="collapse" href="#"
                    v-b-toggle.accordion2 variant="info">
                    계정 조회
                    </a>
                    </h5>
                </b-card-header>
                <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <template v-if="usersLoading">
                        loading...
                    </template>
                    <template v-else-if="usersComplete">
                    <b-row>
                    <b-col lg="12">
                        <c-table caption="<i class='fa fa-align-justify'></i> 계정 목록">
                        </c-table>
                    </b-col>
                    </b-row>
                    <b-row>
                    </b-row>
                    </template>
                    <template v-else-if="usersComplete">
                    </template>
                    <template v-else>
                      화면 초기화
                    </template>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </b-card>
        </b-col>

      </b-row>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import cTable from './usermanagement/Table';

export default {
  components: { cTable },
  data() {
    return {
      inputs: {
        username: '',
        password1: '',
        password2: '',
        email: '',
      },
      show: true,
    };
  },
  computed: mapState('signup', [
    'registrationCompleted',
    'registrationError',
    'registrationLoading',
    'usersLoading',
    'usersError',
    'usersComplete',
  ]),
  methods: {
    ...mapActions(
      'signup', ['createAccount', 'clearRegistrationStatus'],
    ),
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.inputs.username = '';
      this.inputs.email = '';
      this.inputs.password1 = '';
      this.inputs.password2 = '';
      this.$store.dispatch('signup/clearRegistrationStatus');
      this.$store.dispatch('signup/selectAccounts');
    },
    afterConfirmReset() {
      this.inputs.username = '';
      this.inputs.email = '';
      this.inputs.password1 = '';
      this.inputs.password2 = '';
      this.$store.dispatch('signup/clearRegistrationStatus');
      this.$store.dispatch('signup/selectAccounts');
    },
  },
  beforeMount() {
    // eslint-disable-next-line
    console.log(`UserManagement beforeMount`);
    this.$store.dispatch('signup/selectAccounts');
  },
  beforeRouteLeave(to, from, next) {
    this.clearRegistrationStatus();
    next();
  },
};
</script>

<style>
form input {
  display: block
}

.error {
  color: crimson;
  font-size: 12px;
}
</style>

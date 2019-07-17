<template xmlns:v-model="http://www.w3.org/1999/xhtml">
  <div>
    <!-- Main UI -->
    <!-- Modal Component -->
    <b-modal id="modalPrevent"
             ref="modal"
             title="localTitle"
             @ok="handleOk"
             @shown="clearName">
      <form @submit.stop.prevent="handleSubmit" id="form">
        <div class="form-group" v-for="data in dataArray" v-bind:key="data.id">
          <template v-if="data.type == 'text'">
            <label v-bind:for="data.id" class="col-form-label">{{data.title}}</label>
            <input type="text" class="form-control"
                   v-bind:id="data.id"
                   v-model="formInfo[data.id]"
                   :disabled="disabledInfo[data.id] == true">
          </template>
          <template v-else>
            <label v-bind:for="data.id" class="col-form-label">{{data.title}}</label>
            <select class="form-control"
                    v-bind:id="data.id"
                    v-model="formInfo[data.id]"
                    :disabled="disabledInfo[data.id] == true">
              <option v-for="option in data.options" v-bind:value="option.value"
                      v-bind:key="option.value">
                {{ option.text }}
              </option>
            </select>
          </template>

        </div>
        <input type="text" class="form-control" v-model="testForm" hidden>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'CommonModalComponent',
  props: [
    'dataArray',
    'title',
  ],
  data() {
    return {
      formInfo: {},
      disabledInfo: {},
      testForm: '',
      localTitle: this.title,
    };
  },
  computed: {
    getOptions(id) {
      return this.formInfo[id];
    },
  },
  created() {
    // formInfo를 재정의한다.
    // 생성될때, vuex로 부터 감시된 dataArray가 변경되었기때문에, 변경된 내용이 반영된다.
    this.dataArray.forEach((object) => {
      this.formInfo[object.id] = '';
    });
  },
  methods: {
    showModal() {
      this.$refs.modal.show();
    },
    showModalWithData(dataParam, disableParam) {
      // 특정 키값에 데이터를 저장하고, Modal을 오픈 시킨다.
      // Array인경우.. 20181210 - JJW - 추가
      if (Array.isArray(dataParam)) {
        dataParam.forEach((object, index) => {
          this.formInfo[index] = object;
          this.testForm = object;
        });
      } else {
        const self = this;
        Object.keys(dataParam).forEach((key, value) => {
          self.formInfo[key] = dataParam[key];
          self.testForm = value;
        });
      }
      // disabled 정보가 있는 경우 disabled 시킨다.
      if (typeof disableParam !== 'undefined') {
        disableParam.forEach((param) => {
          this.disabledInfo[param] = true;
        });
      }
      this.$refs.modal.show();
    },
    handleOk(evt) {
      evt.preventDefault();
      // 부모에서 처리하도록 재정의 한다.
      // form으로부터 데이터를 가져온다. --> v-model로 부터 시리얼라이즈 한다.
      this.$emit('doneModalInfo', this.formInfo);
      this.$refs.modal.hide();
    },
    clearName() {
    },
  },
};
</script>

<style scoped>

</style>

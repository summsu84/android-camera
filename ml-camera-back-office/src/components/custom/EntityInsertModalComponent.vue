<template xmlns:v-model="http://www.w3.org/1999/xhtml">
  <div>
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
            <input type="text" class="form-control" v-bind:id="data.id" v-model="formInfo[data.id]">
          </template>
          <template v-else>
            <label v-bind:for="data.id" class="col-form-label">{{data.title}}</label>
            <select class="form-control" v-bind:id="data.id"
                    v-model="formInfo[data.id]"
                    @change="onChangeSelect(formInfo[data.id])"
                    :disabled="disabledInfo[data.id] == true">
              <option v-for="option in data.options" v-bind:value="option.value"
                      v-bind:key="option.value">
                {{ option.text }}
              </option>
            </select>
          </template>

        </div>
        <input type="text" class="form-control" v-model="testForm" hidden>
        <div class="m-col-12-of-12" v-if="getSelectModel == 'hierarchical'">
          <!--template bindings={}-->
          <div class="form-group" v-for="(child, index) in childList" v-bind:key="child.key">
            <label class="col-form-label">자식 엔티티</label>
            <div class="form-inline">
            <input type="text" class="form-control" v-model="child['value']">
            <button class="btn btn-danger btn-xs" @click="removeRow(index)" >X</button>
            </div>
          </div>
          <a class="m-anchor" href="#" preventclick="" @click="onClickAddSpan">
          <span _ngcontent-noy-118=""
                class="m-icon m-icon-Add m-add-icon"></span> Add a child entity
          </a>
        </div>
        <div class="m-col-12-of-12" v-if="getSelectModel == 'composite'">
          <!--template bindings={}-->
          <div class="form-group" v-for="(child, index) in childList" v-bind:key="child.key">
            <label class="col-form-label">자식 엔티티</label>
            <div class="form-inline">
              <select class="form-control" v-model="child['value']">
                <option v-for="option in getEntityList" v-bind:value="option.value"
                        v-bind:key="option.value" >
                  {{ option.text }}
                </option>
              </select>
              <button class="btn btn-danger btn-xs" @click="removeRow(index)" >X</button>
            </div>
          </div>
          <a class="m-anchor" href="#" preventclick="" @click="onClickAddSpan">
            <span _ngcontent-noy-118="" class="m-icon m-icon-Add m-add-icon">
            </span> Add a child entity
          </a>
        </div>

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
      entityType: 0,
      childList: [],
    };
  },
  computed: {
    getOptions(id) {
      return this.formInfo[id];
    },
    getSelectModel() {
      return this.entityType;
    },
    getEntityList() {
      // EntityList를 가져온다.
      const entityList = this.$store.getters.getSelectedLUISApplicationEntityList;
      const entitySelectModelList = [];
      if (entityList.length === 0) {
        // 새로 가져온다.
      } else {
        entityList.forEach((object) => {
          const option = {
            value: object.name,
            text: object.name,
          };
          entitySelectModelList.push(option);
        });
      }
      return entitySelectModelList;
    },
  },
  created() {
    // formInfo를 재정의한다.
    // 생성될때, vuex로 부터 감시된 dataArray가 변경되었기때문에, 변경된 내용이 반영된다.
    this.dataArray.forEach((object) => {
      const tmp = object;
      this.formInfo[tmp.id] = '';
    });
  },
  methods: {
    showModal() {
      // 초기화
      this.formInfo.forEach((object) => {
        this.formInfo[object] = '';
      });
      this.disabledInfo = {};
      this.$refs.modal.show();
    },
    showModalWithData(dataParam, disableParam) {
      // 특정 키값에 데이터를 저장하고, Modal을 오픈 시킨다.
      dataParam.forEach((object, index) => {
        const tmp = object;
        this.testForm = tmp;
        this.formInfo[index] = tmp;
      });
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
      // 엔티티 전용이므로 여기서 데이터를 구조화 한다.
      const param = {
        name: '',
      };
      param.name = this.formInfo['modal-entity-name'];
      if (this.entityType === 1) {
        // no jobs
      } else if (this.entityType === 3 || this.entityType === 4) {
        const childNameList = [];
        this.childList.forEach((object) => {
          childNameList.push(object.value);
        });
        param.children = childNameList;
      } else if (this.entityType === 5) {
        // 리스트의 경우,
        param.subLists = [];
        param.id = '';
      }
      // 수정 모드인 경우, entityId를 같이 전송한다.
      if (Object.prototype.hasOwnProperty.call(this.formInfo, 'modal-entity-id')) {
        param.entityId = this.formInfo['modal-entity-id'];
      }
      // 해당 ModalInfo는 두개의 파라미터를 넘긴다.
      this.$emit('doneModalInfo', param, this.entityType);

      this.$refs.modal.hide();
    },
    clearName() {

    },
    onChangeSelect(param) {
      // select를 변경했을 때 발생되는 함수
      this.entityType = param;
    },
    onClickAddSpan() {
      // Span 버튼 클릭 시 발생
      console.log('onClickAddSpan');
      const object = {
        value: '',
        id: '',
      };
      this.childList.push(object);
    },
    removeRow(index) {
      // 자식 키워드를 제거한다.
      this.childList.splice(index, 1);
    },
  },
};
</script>

<style scoped>

</style>

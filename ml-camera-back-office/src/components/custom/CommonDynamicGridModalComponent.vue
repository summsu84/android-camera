<template xmlns:v-model="http://www.w3.org/1999/xhtml">
  <div>
    <!-- 의도 및 키워드 등록 관련 모달 UI -->
    <!-- Modal Component -->
    <b-modal id="modalPrevent"
             ref="modal"
             size="lg"
             title="titleName"
             @ok="handleOk"
             @shown="clearName">
      <!--<form @submit.stop.prevent="handleSubmit" id="form">-->
      <div>
        <div class="form-group" v-for="data in dataArray" v-bind:key="data.id">
          <template v-if="data.type == 'text'">
            <label v-bind:for="data.id" class="col-form-label">{{data.title}}</label>
            <input type="text" class="form-control" v-bind:id="data.id"
                   v-model="formInfo[data.id]"
                   :disabled="isUpdate == true">
          </template>
          <template v-else>
            <label v-bind:for="data.id" class="col-form-label">{{data.title}}</label>
            <select class="form-control" v-bind:id="data.id" v-model="formInfo[data.id]">
              <option v-for="option in data.options" v-bind:key="option.value" >
                {{ option.text }}
              </option>
            </select>
          </template>

        </div>
        <input type="text" class="form-control" v-model="testForm" hidden>
        <!-- Dynamic Grid-->
        <dynamic-table-grid-component
          :data="gridData"
          :columns="gridColumns"
          :propOptions="getEntityList"
          :titleName="headerTitleName"
          v-on:changeSelectInfo="onChangeSelectInfo"
        >
        </dynamic-table-grid-component>
      <!--</form>-->
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable */

import DynamicTableGridTemplate from './DynamicTableGridTemplate';

export default {
  name: 'CommonDynamicGridModalComponent',
  components: {
    'dynamic-table-grid-component': DynamicTableGridTemplate,
  },
  props: [
    'dataArray',
    'titleName',
  ],
  computed: {
    getEntityList() {
      // Entity 리스트를 가져온다.
      const entityList = this.$store.getters.getSelectedLUISApplicationEntityList;
      if (entityList.length === 0) {
        // 새로 가져온다.
      } else {
        const entitySelectModelList = [];
        entityList.forEach((object) => {
          const option = {
            value: object.name,
            text: object.name,
            typeId: object.typeId,
          };
          entitySelectModelList.push(option);
          if (object.hasOwnProperty('children') && object['typeId'] === 3) {
            const children = object['children'];
            children.forEach(child => {
              const childOption = {
                value: `${object['name']}::${child['name']}`,
                text: `--${child['name']}`,
                typeId: child['typeId'],
              };
              entitySelectModelList.push(childOption);
            });
          }
        });
        return entitySelectModelList;
      }
    },
  },
  data() {
    return {
      formInfo: {},
      gridColumns: [
        { width: 35, key: 'name', value: '키워드', type: 'input' },
        { width: 35, key: 'entityName', value: '관련 키워드', type: 'select' },
        { width: 10, key: 'entityTypeName', value: '타입', type: 'input' },
        { width: 10, key: 'startTokenIndex', value: '처음 위치', type: 'input' },
        { width: 10, key: 'endTokenIndex', value: '마지막 위치', type: 'input' },
        { width: 10, key: 'delete', value: '삭제', type: 'delete' },
      ],
      gridData: [
      ],
      headerTitleName: '키워드 등록',
      testForm: '',
      isUpdate: false,
    };
  },
  created() {
    // formInfo를 재정의한다.
    this.dataArray.forEach((array) => {
      this.formInfo[array.id] = '';
    });
  },
  methods: {
    clearName() {
      this.name = '';
    },
    showModal() {
      this.isUpdate = false;
      let i;
      for (i in this.formInfo) {
        this.formInfo[i] = '';
      }
      this.gridData = [];
      this.$refs.modal.show();
    },
    setDataGrid(gridDataList) {
      this.gridData.splice(0, this.gridData.length);
      if (gridDataList != null) {
        // DataGrid를 설정한다.
        let i;
        for (i in gridDataList) {
          this.gridData.push(gridDataList[i]);
        }
      }
    },
    /**
     * 그리드 값과 함께 모달을 셋팅한다.
     * @param dataParam
     * @param gridDataList
     */
    showModalWithData(dataParam, gridDataParam) {
      // 특정 키값에 데이터를 저장하고, Modal을 오픈 시킨다.
      this.isUpdate = true;
      if (typeof gridDataParam !== 'undefined') {
        this.setDataGrid(gridDataParam);
      }
      let i;
      for (i in dataParam) {
        const tmp = dataParam[i];
        this.testForm = this.formInfo[i] = tmp;
      }
      this.$refs.modal.show();
    },
    handleOk() {
      // Utterance 등록은 신규 추가/수정이 같은 POST 명령어를 사용하게 된다.
      const utterance = this.formInfo['modal-utterance-name'];
      for (const i in this.gridData) {
        const tmp = this.gridData[i];
        if (typeof tmp['name'] === 'undefined') {
          continue;
        }
        const startIndex = utterance.indexOf(tmp['name']);
        if (startIndex === -1) {
          alert(`입력하신 키워드 "${tmp['name']}"를 확인해주세요.`);
          return;
        }
        const lastIndex = startIndex + tmp['name'].length;
        tmp['startTokenIndex'] = startIndex;
        tmp['endTokenIndex'] = lastIndex;
      }
      this.formInfo['gridData'] = this.gridData;
      this.$emit('doneModalInfo', this.formInfo);
    },
    onChangeSelectInfo(_value) {
      // 텍스트를 검사한다.
      const value = _value;
      const utterance = this.formInfo['modal-utterance-name'];
      if (typeof value['name'] === 'undefined') {
        alert('키워드를 입력 해주세요');
        return;
      }
      const startIndex = utterance.indexOf(value['name']);
      if (startIndex === -1) {
        alert(`입력하신 키워드 "${value['name']}"를 확인해주세요.`);
        return;
      }
      const lastIndex = startIndex + value['name'].length;
      value['startTokenIndex'] = startIndex;
      value['endTokenIndex'] = lastIndex;

      const entityList = this.$store.getters.getSelectedLUISApplicationEntityList;
      let entityType;
      let i;
      for (i in entityList) {
        const tmpEntity = entityList[i];

        if (tmpEntity['name'] === value['entityName']) {
          entityType = tmpEntity['typeId'];
          break;
        }
        if (tmpEntity.hasOwnProperty('children')) {
          for (const j in tmpEntity['children']) {
            const tmpChild = tmpEntity['children'][j];
            if (tmpChild['name'] === value['entityName']) {
              entityType = tmpEntity['typeId'];
              break;
            }
          }
        }
      }
      value.entityTypeName = entityType;
    },
  },
};
</script>

<style scoped>

</style>

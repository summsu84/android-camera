<template>
    <div class="wrapper">
        사진 홈
      <div class="animated fadeIn">
        <b-row>
          <b-col cols="12" md="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i> <strong>어플리케이션 조회</strong>
              </div>
              <div id="api-search-view">
                <div id="search">
                  <label for="filterLabel">검색: </label>
                  <select id="filterLabel" name="select"
                          v-model="selectedFilter"
                          class="form-group">
                    <option v-for="column1 in gridColumns"
                            :value="column1.key"
                            v-bind:key="column1.key">
                      {{ column1.value }}
                    </option>
                  </select>
                  <span v-if="selectedFilter">
                    <label for="filteredText" class="hidden">{{ selectedFilter }}</label>
                    <input id="filteredText" type="text"
                           name="textfield"
                           v-model="filteredText"/>
                  </span>
<!--                  Search <input name="query" v-model="searchQuery">-->
                  <!--<button class="btn btn-primary" @click="sendSearch" >조회</button>-->
                  <button class="btn btn-primary" @click="sendRegister" >등록</button>
                  <!--<button class="btn btn-primary" @click="sendDelete" >삭제</button>-->
                </div>
                <table-grid-component
                  :data="filteredData"
                  :columns="gridColumns"
                  :filter-key="searchQuery"
                  v-on:clickRowEvent="onClickRowEvent"
                  v-on:actionEditRowEvent="onActionEditRowEvent"
                  v-on:actionRemoveRowEvent="onActionRemoveRowEvent"
                >
                </table-grid-component>
<!--                <common-pagination-component
                  :listDataTotalCount="listDataTotalCount"
                  :maxSize="maxSize">
                </common-pagination-component>-->
                <!--modal-->
                <common-modal-component
                  @close="showModal = false"
                  :dataArray="modalInsertApp"
                  :title="modalTitle"
                  v-on:doneModalInfo="onDoneModalInfo"
                  ref="refCommonModalComponent"
                >
                </common-modal-component>-
              </div>
            </b-card>
          </b-col>

        </b-row>
      </div>
    </div>
</template>
<script>
import tableGridTemplate from '../components/custom/TableGridTemplate';
import commonPaginationComponent from '../components/custom/CommonPaginationComponent';
import commonModalComponent from '../components/custom/CommonModalComponent';
import CommonLUISModule from '../utils/doLUISAync-util';

export default {
  name: 'LUISAppSearch',
  components: {
    'table-grid-component': tableGridTemplate,
    'common-pagination-component': commonPaginationComponent,
    'common-modal-component': commonModalComponent,
  },
  computed: {
    getLUISApplicationList() {
      return this.$store.getters.getLUISApplicationList;
    },
    filteredData() {
      const x = this.selectedFilter;
      const filter = new RegExp(this.filteredText, 'i');
      return this.getLUISApplicationList.filter((el) => {
        if (el[x] !== undefined) {
          return el[x].match(filter);
        }
        return true;
      });
    },
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted..');
    // 여기에 LUIS 리스트를 가져온다.
    const appList = this.$store.getters.getLUISApplicationList;
    if (appList.length === 0) {
      this.requestLUISGetApplicationList();
    }
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: [
        { width: 5, key: 'num', value: '번호', type: 'text' },
        { width: 20, key: 'id', value: '아이디', type: 'text' },
        { width: 20, key: 'name', value: '이름', type: 'text' },
        { width: 10, key: 'activeVersion', value: '버전', type: 'text' },
        { width: 10, key: 'culture', value: '언어', type: 'text' },
        { width: 10, key: 'endpointHitsCount', value: 'Hits', type: 'text' },
        { width: 15, key: 'ownerEmail', value: '생성자', type: 'text' },
        { width: 10, key: 'action', value: '액션', type: 'action' },
      ],
      listDataTotalCount: 19,
      maxSize: 3,
      modalInsertApp: [
        { id: 'modal-app-name', type: 'text', title: '이름' },
        { id: 'modal-app-culture',
          type: 'select',
          title: '언어',
          options: [
            { text: '한국', value: 'ko-kr' },
            { text: '영어', value: 'en-us' },
            { text: '일본', value: 'text' },
          ] },
        { id: 'modal-app-desc', type: 'text', title: '설명' },
      ],
      modalTitle: '어플리케이션 등록',
      showModal: false,
      dataArray: [
        { id: 'modal-app-id', type: 'text', title: '이름' },
        { id: 'modal-app-culture',
          type: 'select',
          title: '언어',
          options: [
            { text: '한국', value: 'ko-kr' },
            { text: '영어', value: 'en-us' },
            { text: '일본', value: 'text' },
          ] },
        { id: 'modal-app-desc', type: 'text', title: '설명' },
      ],
      processType: '',
      selectedFilter: '',
      filteredText: '',
    };
  },
  methods: {
    onRowClicked() {
      // this.$router.push('interface/openapi/');
    },
    onDoneModalInfo(param) {
      // CommonModalComponent에서 OK를 클릭시 이벤트 발생 처리
      // LUIS를 등록 한다.
      if (this.processType === 'insert') {
        this.requestLUISPostApplication(param);
      } else {
        this.requestLUISPutApplication(param);
      }
    },
    onActionEditRowEvent(param) {
      // 테이블 그리드로 부터 수정 Action Event 발생 시
      // 해당 APP을 수정 한다.
      this.processType = 'update';
      const dataParams = {
        'modal-app-name': param.name,
        'modal-app-desc': param.description,
        'modal-app-culture': param.culture,
        'modal-app-id': param.id,
      };
      const disabledParam = ['modal-app-culture'];
      this.$refs.refCommonModalComponent.showModalWithData(dataParams, disabledParam);
    },
    onActionRemoveRowEvent(param) {
      // 테이블 그리드로 부터 삭제 Action Event 발생 시
      // 해당 APP을 삭제 한다.
      this.requestLUISDeleteApplication(param);
    },
    sendSearch() {
      this.requestLUISGetApplicationList();
    },
    sendDelete() {
      // check 여부 확인
    },
    sendRegister() {
      this.showModal = true;
      this.processType = 'insert';
      this.$refs.refCommonModalComponent.showModal();
    },
    onClickRowEvent() {
      // code no jobs
    },
    // Get Application List
    requestLUISGetApplicationList() {
      this.$store.dispatch('fetchLUISApplicationList');
    },
    requestLUISPutApplication(paramObj) {
      // 어플리케이션을 수정한다.
      const data =
      {
        name: paramObj['modal-app-name'],
        description: paramObj['modal-app-desc'],
      };
      const id = paramObj['modal-app-id'];
      const param = CommonLUISModule.generateLUISUrl(data, 'REQUEST_LUIS_APP_UPDATE', id);
      this.$store.dispatch('fetchLUISApplicationPut', param);
    },
    requestLUISDeleteApplication(paramObj) {
      // 어플리케이션을 삭제한다. - 작업 필요
      const id = paramObj.id;
      CommonLUISModule.generateLUISUrl('', 'REQUEST_LUIS_APP_DELETE', id);
    },
    requestLUISPostApplication(paramObj) {
      // LUIS 어플리케이션을 등록 한다.
      const data =
      {
        name: paramObj['modal-app-name'],
        description: paramObj['modal-app-desc'],
        culture: paramObj['modal-app-culture'],
      };
      const param = CommonLUISModule.generateLUISUrl(data, 'REQUEST_LUIS_APP_INSERT');
      this.$store.dispatch('fetchLUISApplicationPost', param);
    },
  },
};
</script>

<style>

</style>


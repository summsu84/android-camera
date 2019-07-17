<template>
    <div class="wrapper">
        Emotion Speech Mapping Management
      <div class="animated fadeIn">
        <b-row>
          <b-col cols="12" md="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i> <strong>Speech Content Management</strong>
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
                <loading-component
                  v-if="getLoadingState"
                >
                </loading-component>
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
                  :dataArray="getModalInfo"
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
/* eslint-disable vue/no-side-effects-in-computed-properties */

import tableGridTemplate from '../components/custom/TableGridTemplate';
import commonPaginationComponent from '../components/custom/CommonPaginationComponent';
import commonModalComponent from '../components/custom/CommonModalComponent';
import LoadingComponent from '../components/custom/LoadingComponent';

export default {
  name: 'SpeechContManagement',
  components: {
    'table-grid-component': tableGridTemplate,
    'common-pagination-component': commonPaginationComponent,
    'common-modal-component': commonModalComponent,
    'loading-component': LoadingComponent,
  },
  computed: {
    getEmoSpchMapList() {
      return this.$store.getters['content/getEmoSpchMapList'];
    },
    filteredData() {
      const x = this.selectedFilter;
      const filter = new RegExp(this.filteredText, 'i');
      return this.getEmoSpchMapList.filter((el) => {
        if (el[x] !== undefined) {
          return el[x].match(filter);
        }
        return true;
      });
    },
    getLoadingState() {
      return this.$store.getters['content/getLoadingState'];
    },
    getModalInfo() {
      // 컨텐츠 코드와 맵핑 시키기 위한 computed
      const contentCode = this.$store.getters['content/getContentList'];
      // 재 가공 한다.
      const tmpList = [];
      contentCode.forEach((object) => {
        const option = {
          value: object.filter_cd,
          text: object.filter_name,
        };
        tmpList.push(option);
      });
      this.modalInsertApp[5].options = tmpList;
      return this.modalInsertApp;
    },
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted..');
    // 여기에 컨텐츠 리스트를 가져온다.
    const appList = this.$store.getters['content/getEmoSpchMapList'];
    if (appList.length === 0) {
      this.requestEmotionSpeechMappingList();
    }
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: [
        { width: 5, key: 'num', value: '번호', type: 'text' },
        { width: 20, key: 'mp_emo_cd', value: '감정 코드', type: 'text' },
        { width: 20, key: 'mp_age', value: '나이', type: 'text' },
        { width: 20, key: 'mp_sex', value: '성별', type: 'text' },
        { width: 20, key: 'mp_spch_cont_id', value: '맵핑코드', type: 'text' },
      ],
      listDataTotalCount: 19,
      maxSize: 3,
      modalInsertApp: [
        { id: 'modal-mp_emo_cd', type: 'text', title: '감정 코드' },
        { id: 'modal-mp_age', type: 'text', title: '나이' },
        {
          id: 'modal-mp_sex',
          type: 'select',
          title: '성별',
          options: [
            { text: '남', value: 'M' },
            { text: '여', value: 'W' },
          ],
        },
      ],
      modalTitle: 'FILTER CODE 등록',
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
      // Code를 등록 한다.
      if (this.processType === 'insert') {
        this.requestPostEmotionSpeechMapping(param);
      } else {
        this.requestPutEmotionSpeechMapping(param);
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
      this.requestLUISDeleteApplication(param);
    },
    sendSearch() {
      this.requestSpeechContentList();
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
    // Get Emotion Spch Mapping List
    requestEmotionSpeechMappingList() {
      this.$store.dispatch('content/fetchEmoSpchMapList');
    },
    requestPutEmotionSpeechMapping(paramObj) {
      // 어플리케이션을 수정한다.
      const data =
      {
        filter_cd: paramObj['modal-mp_emo_cd'],
        filter_name: paramObj['modal-mp_age'],
        filter_desc: paramObj['modal-mp_emo_cd'],
      };
      this.$store.dispatch('code/fetchFilterCodePut', data);
    },
    requestDeleteEmotionCode() {
      // 어플리케이션을 삭제한다. - 작업 필요
      // const id = paramObj.id;
      // CommonLUISModule.generateLUISUrl('', 'REQUEST_LUIS_APP_DELETE', id);
    },
    requestPostEmotionSpeechMapping(paramObj) {
      const data =
        {
          spch_cont_id: paramObj['modal-spch_cont_id'],
          spch_cont_sub_id: paramObj['modal-spch_cont_sub_id'],
          spch_cont_msg: paramObj['modal-spch_cont_msg'],
          spch_use_yn: paramObj['modal-spch_use_yn'],
          spch_del_yn: paramObj['modal-spch_del_yn'],
          spch_fc: paramObj['modal-spch_fc'],
        };
      this.$store.dispatch('content/fetchContentPost', data);
    },
    requestFilterCodeList() {
      // 여기에 LUIS 리스트를 가져온다.
      const appList = this.$store.getters['code/getFilterCodeList'];
      if (appList.length === 0) {
        this.$store.dispatch('code/fetchFilterCodeList');
      }
    },
  },
};
</script>

<style>

</style>


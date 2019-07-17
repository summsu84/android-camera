<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12" md="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i> <strong>메시지 정보</strong>
              <div class="float-right">
                <b-btn
                  size="sm" variant="primary"
                  @click="sendRegister">
                  등록
                </b-btn>
              </div>
            </div>
            <div id="api-search-view">
              <h3>선택한 의도(Intent) - {{getSpchCode}}</h3>
              <div id="search">
                <!--예제어 <input name="query" style="width:80%" v-model="searchQuery">-->
                <!--필터링 - 나중에 콤포넌트로 빼기 -->
                <b-row>
                  <b-col cols="12" md="12">
                    <b-input-group prepend="검색" variant="outline-success" size="sm" append="조건">
                      <b-form-input id="filteredText" type="text"
                                    name="textfield"
                                    v-model="filteredText"
                                    placeholder="조건을 선택 후 검색어를 입력하세요."
                                    class="mb-8">
                      </b-form-input>
                      <b-form-select id="filterLabel" name="select"
                                     v-model="selectedFilter"
                                     class="form-group" >                                    >
                        <option v-for="column1 in gridColumns"
                                :value="column1.key"
                                v-bind:key="column1.key">
                          {{ column1.value }}
                        </option>
                      </b-form-select>
                      <b-input-group-append>
                        <!--<label for="filterLabel">
                        </label>-->
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
              </div>
              <table-grid-component
                :data="gridData"
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
              </common-modal-component>
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
// import commonAxios from '../utils/commonAxios';

export default {
  name: 'SpeechContManagement',
  components: {
    'table-grid-component': tableGridTemplate,
    'common-pagination-component': commonPaginationComponent,
    'common-modal-component': commonModalComponent,
    'loading-component': LoadingComponent,
  },
  computed: {
    getSpeechContentDetail() {
      return this.gridData;
    },
    filteredData() {
      const x = this.selectedFilter;
      const filter = new RegExp(this.filteredText, 'i');
      return this.getSpeechContentDetail.filter((el) => {
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
      // Filter 정보를 Computed 하여, 업데이트 시 같이 업데이트 시키기 위하여
      const filterCdList = this.$store.getters['code/getFilterCodeList'];
      // 재 가공 한다.
      const tmpList = [];
      filterCdList.forEach((object) => {
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
    this.requestSpeechContentDetail();
    this.requestFilterCodeList();
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: [
        { width: 5, key: 'num', value: '번호', type: 'text' },
        { width: 20, key: 'spch_cont_id', value: '컨텐츠 코드', type: 'key' },
        { width: 20, key: 'spch_cont_sub_id', value: '컨텐츠 서브 코드', type: 'key' },
        { width: 20, key: 'spch_cont_msg', value: '컨텐츠 메시지', type: 'text' },
        { width: 10, key: 'spch_use_yn', value: '사용여부', type: 'text' },
        { width: 10, key: 'spch_del_yn', value: '삭제여부', type: 'text' },
        { width: 10, key: 'spch_fc', value: '필터코드', type: 'text' },
      ],
      gridData: [],
      listDataTotalCount: 19,
      maxSize: 3,
      modalInsertApp: [
        { id: 'modal-spch_cont_id', type: 'text', title: '컨텐츠 코드' },
        { id: 'modal-spch_cont_sub_id', type: 'text', title: '컨텐츠 서브 코드' },
        { id: 'modal-spch_cont_msg', type: 'text', title: '컨텐츠 메시지' },
        { id: 'modal-spch_use_yn',
          type: 'select',
          title: '사용여부',
          options: [
            { text: '네', value: 'Y' },
            { text: '아니오', value: 'N' },
          ],
        },
        { id: 'modal-spch_del_yn',
          type: 'select',
          title: '삭제여부',
          options: [
            { text: '네', value: 'Y' },
            { text: '아니오', value: 'N' },
          ],
        },
        { id: 'modal-spch_fc',
          type: 'select',
          title: '필터코드',
          options: [
            { text: 'audrey', value: 'FC_001' },
          ] },
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
      intentName: 'Test',
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
        this.requestPostSpeechContent(param);
      } else {
        this.requestPutSpeechContent(param);
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
      this.requestSpeechContentDetail();
    },
    sendDelete() {
      // check 여부 확인
    },
    sendRegister() {
      this.showModal = true;
      this.processType = 'insert';
      const code = this.getSpchCode();

      const dataParams = {
        'modal-spch_cont_id': code,
        'modal-spch_cont_sub_id': '000',
        'modal-spch_cont_msg': '',
        'modal-spch_use_yn': '',
        'modal-app-title': '',
      };
      const disabledParam = [];
      this.$refs.refCommonModalComponent.showModalWithData(dataParams, disabledParam);
    },
    onClickRowEvent(param) {
      // 테이블 ROW 클릭 시 Event 처리
      const paramEdit = param;
      paramEdit.processType = `${paramEdit.name} 수정`;
      this.processType = 'update';
      const dataParams = {
        'modal-spch_cont_id': paramEdit.spch_cont_id,
        'modal-spch_cont_sub_id': paramEdit.spch_cont_sub_id,
        'modal-spch_cont_msg': paramEdit.spch_cont_msg,
        'modal-spch_use_yn': paramEdit.spch_use_yn,
        'modal-app-title': paramEdit.processType,
      };
      const disabledParam = ['modal-spch_cont_id'];
      this.$refs.refCommonModalComponent.showModalWithData(dataParams, disabledParam);
    },
    // Get Emotion Code List
    requestSpeechContentDetail() {
      this.$store.dispatch('content/fetchContentList');
      // vuex가 아닌 axios를 사용한다?
      const spchContId = this.$route.params.spch_cont_id;
      const requestUrl = `http://localhost:8000/api/speech_cont/${spchContId}`;
      const param = {
        method: 'GET',
        url: requestUrl,
      };
      this.$commonAxiosRequest(param, (res) => {
        this.gridData = res.data;
      }, () => {

      });
    },
    requestPutSpeechContent(paramObj) {
      // 어플리케이션을 수정한다.
      const data =
      {
        filter_cd: paramObj['modal-filter_cd'],
        filter_name: paramObj['modal-filter_name'],
        filter_desc: paramObj['modal-filter_desc'],
      };
      this.$store.dispatch('code/fetchFilterCodePut', data);
    },
    requestDeleteEmotionCode() {
      // 어플리케이션을 삭제한다. - 작업 필요
      // const id = paramObj.id;
      // CommonLUISModule.generateLUISUrl('', 'REQUEST_LUIS_APP_DELETE', id);
    },
    requestPostSpeechContent(paramObj) {
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
    getSpchCode() {
      const code = this.$route.params.spch_cont_id;
      return code;
    },
  },
};
</script>

<style>

</style>


<template>
    <div class="wrapper">
        Common Code Management
      <div class="animated fadeIn">
        <b-row>
          <b-col cols="12" md="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i> <strong>Common Code Management</strong>
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
import LoadingComponent from '../components/custom/LoadingComponent';

export default {
  name: 'CommonCodeManagement',
  components: {
    'table-grid-component': tableGridTemplate,
    'common-pagination-component': commonPaginationComponent,
    'common-modal-component': commonModalComponent,
    'loading-component': LoadingComponent,
  },
  computed: {
    getEmotionCodeList() {
      return this.$store.getters['code/getCommonCodeList'];
    },
    filteredData() {
      const x = this.selectedFilter;
      const filter = new RegExp(this.filteredText, 'i');
      return this.getEmotionCodeList.filter((el) => {
        if (el[x] !== undefined) {
          return el[x].match(filter);
        }
        return true;
      });
    },
    getLoadingState() {
      return this.$store.getters['code/getLoadingState'];
    },
  },
  created() {
  },
  mounted() {
    const appList = this.$store.getters['code/getCommonCodeList'];
    if (appList.length === 0) {
      this.requestCommonCodeList();
    }
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: [
        { width: 5, key: 'num', value: '번호', type: 'text' },
        { width: 20, key: 'common_cd', value: '코드명', type: 'key' },
        { width: 20, key: 'common_name', value: '코드이름', type: 'text' },
      ],
      listDataTotalCount: 19,
      maxSize: 3,
      modalInsertApp: [
        { id: 'modal-common_cd', type: 'text', title: '코드명' },
        { id: 'modal-common_name', type: 'text', title: '코드이름' },
      ],
      modalTitle: 'EMOTION CODE 등록',
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
        this.requestPostCommonCode(param);
      } else {
        this.requestPutCommonCode(param);
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
      this.requestCommonCodeList();
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
    // Get Common Code List
    requestCommonCodeList() {
      this.$store.dispatch('code/fetchCommonCodeList');
    },
    // Put Common Code
    requestPutCommonCode(paramObj) {
      // 어플리케이션을 수정한다.
      const data =
      {
        common_cd: paramObj['modal-common_cd'],
        common_name: paramObj['modal-common_name'],
      };
      this.$store.dispatch('code/fetcCommonCodePut', data);
    },
    requestDeleteEmotionCode() {
      // 어플리케이션을 삭제한다. - 작업 필요
      // const id = paramObj.id;
      // CommonLUISModule.generateLUISUrl('', 'REQUEST_LUIS_APP_DELETE', id);
    },
    requestPostCommonCode(paramObj) {
      const data =
        {
          common_cd: paramObj['modal-common_cd'],
          common_name: paramObj['modal-common_name'],
        };
      this.$store.dispatch('code/fetchCommonCodePost', data);
    },
  },
};
</script>

<style>

</style>


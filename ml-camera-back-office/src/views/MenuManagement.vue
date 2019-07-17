<template>
    <div class="wrapper">
        메뉴 관리
      <div class="animated fadeIn">
        <b-row>
          <b-col cols="12" md="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i> <strong>메뉴 관리</strong>
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
import commonModalComponent from '../components/custom/CommonModalComponent';
import LoadingComponent from '../components/custom/LoadingComponent';

export default {
  name: 'SiteMenuManagement',
  components: {
    'table-grid-component': tableGridTemplate,
    'common-modal-component': commonModalComponent,
    'loading-component': LoadingComponent,
  },
  computed: {
    getSiteMenuList() {
      return this.$store.getters['site/getSiteList'];
    },
    filteredData() {
      const x = this.selectedFilter;
      const filter = new RegExp(this.filteredText, 'i');
      return this.getSiteMenuList.filter((el) => {
        if (el[x] !== undefined) {
          return el[x].match(filter);
        }
        return true;
      });
    },
    getLoadingState() {
      return this.$store.getters['site/getLoadingState'];
    },
  },
  created() {
    // no jobs
  },
  mounted() {
    const appList = this.$store.getters['site/getSiteList'];
    if (appList.length === 0) {
      this.requestSiteMenuList();
    }
  },
  data() {
    return {
      searchQuery: '',
      gridColumns: [
        { width: 5, key: 'num', value: '번호', type: 'text' },
        { width: 10, key: 'menu_cd', value: '메뉴코드', type: 'key' },
        { width: 10, key: 'menu_cate', value: '메뉴구분', type: 'text' },
        { width: 10, key: 'hi_menu_cd', value: '상위메뉴', type: 'text' },
        { width: 10, key: 'menu_krn_nm', value: '한글메뉴', type: 'text' },
        { width: 10, key: 'menu_eng_nm', value: '영문메뉴', type: 'text' },
        { width: 10, key: 'use_yn', value: '사용여부', type: 'text' },
        { width: 10, key: 'sys_ctgrz_cd', value: '시스템', type: 'text' },
        { width: 10, key: 'menu_seq', value: '메뉴번호', type: 'text' },
        { width: 10, key: 'menu_url', value: 'URL', type: 'text' },
        { width: 10, key: 'dlt_yn', value: '삭제여부', type: 'text' },
        { width: 10, key: 'rgst_dtim', value: '생성일', type: 'text' },
        { width: 10, key: 'bltn_cret_yn', value: '게시판', type: 'text' },
        { width: 10, key: 'cnt_cret_yn', value: '컨텐츠', type: 'text' },
      ],
      listDataTotalCount: 19,
      maxSize: 3,
      modalInsertApp: [
        { id: 'modal-menu_cd', type: 'text', title: '메뉴코드' },
        { id: 'modal-menu_cate', type: 'text', title: '메뉴구분' },
        { id: 'modal-hi_menu_cd', type: 'text', title: '상위메뉴' },
        { id: 'modal-menu_krn_nm', type: 'text', title: '한글메뉴' },
        { id: 'modal-menu_eng_nm', type: 'text', title: '영문메뉴' },
        { id: 'modal-use_yn', type: 'text', title: '사용여부' },
        { id: 'modal-sys_ctgrz_cd', type: 'text', title: '시스템' },
        { id: 'modal-menu_seq', type: 'text', title: '메뉴번호' },
        { id: 'modal-menu_url', type: 'text', title: 'URL' },
        { id: 'modal-dlt_yn', type: 'text', title: '삭제여부' },
        { id: 'modal-rgst_dtim', type: 'text', title: '코드이름' },
        { id: 'modal-bltn_cret_yn', type: 'text', title: '게시판' },
        { id: 'modal-cnt_cret_yn', type: 'text', title: '컨텐츠' },
      ],
      modalTitle: '메뉴 등록',
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
        this.requestPostEmotionCode(param);
      } else {
        this.requestPutEmotionCode(param);
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
      this.requestEmotionCodeList();
    },
    sendDelete() {
      // check 여부 확인

    },
    sendRegister() {
      this.showModal = true;
      this.processType = 'insert';
      this.$refs.refCommonModalComponent.showModal();
    },
    onClickRowEvent(param) {
      // code no jobs
      console.log(`onclick Row event : ${param.menu_cd}`);
      const strUrl = `/site/menu/sub/${param.menu_cd}`;
      this.$router.push(strUrl);
    },
    requestSiteMenuList() {
      this.$store.dispatch('site/fetchSiteMenuList');
    },
    // Put Emotion Code
    requestPutEmotionCode(paramObj) {
      // 어플리케이션을 수정한다.
      const data =
      {
        cd_emo_ctgrz: paramObj['modal-cd_emo_ctgrz'],
        cd_emo_ctgrz_nm: paramObj['modal-cd_emo_ctgrz_nm'],
        cd_emo_ctgrz_nm_eng: paramObj['modal-cd_emo_ctgrz_nm_eng'],
      };
      // const param = CommonModule.generateCodeRequestUrl(data, 'REQUEST_PUT_EMOTION_CODE',
      // data.cd_emo_ctgrz);
      this.$store.dispatch('code/fetchEmotionCodePut', data);
    },
    requestDeleteEmotionCode() {
      // 어플리케이션을 삭제한다. - 작업 필요
      // const id = paramObj.id;
      // CommonLUISModule.generateLUISUrl('', 'REQUEST_LUIS_APP_DELETE', id);
    },
    requestPostEmotionCode(paramObj) {
      // LUIS 어플리케이션을 등록 한다.
      const data =
        {
          cd_emo_ctgrz: paramObj['modal-cd_emo_ctgrz'],
          cd_emo_ctgrz_nm: paramObj['modal-cd_emo_ctgrz_nm'],
          cd_emo_ctgrz_nm_eng: paramObj['modal-cd_emo_ctgrz_nm_eng'],
        };
      // const param = CommonModule.generateCodeRequestUrl(data, 'REQUEST_POST_EMOTION_CODE');
      this.$store.dispatch('code/fetchEmotionCodePost', data);
    },
  },
};
</script>

<style>

</style>


<template>
  <div id="content-app">
    <div>
<!--      <b-dropdown v-model="menuCode" text="Dropdown Button"
                  class="m-md-2" v-for="menu in menuList"
                  v-bind:key="menu.menu_id">
        <b-dropdown-item>{{menu.menu_krn_nm}}</b-dropdown-item>
      </b-dropdown>-->
      <b-dropdown text="메뉴 리스트"
                  class="m-md-2">
        <b-dropdown-item  v-for="menu in menuList"
                          v-bind:key="menu.menu_cd"
                          @click="getContentInfo(menu.menu_cd)"
        >{{menu.menu_krn_nm}}</b-dropdown-item>
      </b-dropdown>
    </div>
    <htmlEditorView
      v-on:doneHtmlEditor="onDoneHtmlEditor"
      ref="refHtmlEditorView"
    ></htmlEditorView>
  </div>
</template>
<script>
import htmlEditorComponent from '../components/custom/HtmlEditorComponent';

export default {
  data() {
    return {
      content: null,
      menuList: [],
      menuCode: '',
    };
  },
  components: {
    htmlEditorView: htmlEditorComponent,
  },
  mounted() {
    // no jobs
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      // Menu 정보를 가져온다.
      const requrl = 'http://localhost:8000/api/site/menu';
      const param = {
        method: 'get',
        url: requrl,
      };
      const vm = this;
      this.$commonAxiosRequest(param,
        (res) => {
          vm.menuList = res.data;
        },
        (res) => {
          console.log(res);
        });
    },
    getContentInfo(paramMenuCode) {
      // Menu Code에 따른 컨텐츠 정보를 가져온다.
      this.menuCode = paramMenuCode;
      const requrl = `http://localhost:8000/api/site/content/${this.menuCode}`;
      const param = {
        method: 'get',
        url: requrl,
      };
      const vm = this;
      this.$commonAxiosRequest(param,
        (res) => {
          // 받은 CLOB 데이터를 전송 한다.
          vm.$refs.refHtmlEditorView.setHtmlText(res.data.ctn_dtls);
        },
        (res) => {
          console.log(res);
          vm.$refs.refHtmlEditorView.setHtmlText('');
        });
    },
    saveContents(htmlParam) {
      // Menu 정보를 가져온다.
      const requrl = 'http://localhost:8000/api/site/content/';
      const param = {
        method: 'post',
        url: requrl,
        menu_cd: this.menuCode,
        ctn_dtls: htmlParam,
        rgst_tim: '',
      };
      const vm = this;
      this.$commonAxiosRequest(param,
        (res) => {
          vm.menuList = res.data;
        },
        (res) => {
          console.log(res);
        });
    },
    onDoneHtmlEditor(param) {
      this.saveContents(param);
    },
  },
};
</script>

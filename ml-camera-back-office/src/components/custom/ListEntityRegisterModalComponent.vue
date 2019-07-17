<template xmlns:v-model="http://www.w3.org/1999/xhtml">
  <div>
    <!-- 리스트 엔티티 등록 모달 -->
    <!-- Modal Component -->
    <b-modal id="modalPrevent"
             ref="modal"
             size="lg"
             title="titleName"
             @ok="handleOk"
             @shown="clearName">
      <div>
        <div class="form-group">
          <label for="inputListEntityName" class="col-form-label">키워드명</label>
          <input type="text" class="form-control" id="inputListEntityName"
                 v-model="formInfo['entity-name']"
                 :disabled="isUpdate == true">
        </div>
        <input type="text" class="form-control" v-model="testForm" hidden>
        <!-- Dynamic Grid-->
        <dynamic-table-grid-component
          :data="gridData"
          :columns="gridColumns"
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
import DynamicTableGridTemplate from './DynamicTableGridTemplate';

export default {
  components: {
    'dynamic-table-grid-component': DynamicTableGridTemplate,
  },
  props: [
  ],
  data() {
    return {
      formInfo: {
        'entity-name': '',
      },
      gridColumns: [
        { width: 60, key: 'entityName', value: '유사어', type: 'input' },
        { width: 20, key: 'delete', value: '삭제', type: 'delete' },
      ],
      gridData: [],
      headerTitleName: '유사어 등록',
      isUpdate: false,
      testForm: '',
    };
  },
  methods: {
    openDetail(rowObj) {
      console.log(rowObj);
      this.$emit('clickRowEvent', rowObj);
    },
    actionEditRow(rowObj) {
      this.$emit('actionEditRowEvent', rowObj);
    },
    actionRemoveRow(rowObj) {
      this.$emit('actionRemoveRowEvent', rowObj);
    },
    handleOk() {
      // const entityName = this.formInfo['entity-name'];
      const entityList = [];
      // 유사어 정보를 가져온다.
      this.gridData.forEach((object) => {
        const tmp = object;
        if (typeof tmp.entityName !== 'undefined') {
          entityList.push(tmp.entityName);
        }
      });
      this.formInfo.gridData = entityList;
      this.$emit('doneModalInfo', this.formInfo);
    },
    onChangeSelectInfo() {
    },
    clearName() {
    },
    showModal() {
      this.$refs.modal.show();
    },
  },
};
</script>
<style>

</style>

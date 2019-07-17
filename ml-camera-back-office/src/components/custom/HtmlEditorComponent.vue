<template>
  <!--vue-ysiwyg 에디터를 이용한 콤포넌트-->
  <div>
    <div class="text-right">
      <button class="btn btn-secondary" @click="handleOk">Save</button>
    </div>
     <wysiwyg v-model="myHTML" />
     <textarea v-model="myHTML" class="editr"></textarea>
  </div>
</template>

<script>
export default {
  name: 'HtmlEditorComponent',
  data() {
    return {
      myHTML: '',
    };
  },
  methods: {
    handleOk() {
      this.$emit('doneHtmlEditor', this.myHTML);
    },
    setHtmlText(htmlText) {
      this.myHTML = htmlText;
    },
  },
};
</script>
<style>
/*@import "~vue-wysiwyg/dist/vueWysiwyg.css";*/
@import '../../assets/main/css/vueWysiwyg.css';
/*@import '../../assets/main/lib/bootstrap/css/bootstrap.min.css';
@import '../../assets/main/lib/font-awesome/css/font-awesome.min.css';
@import '../../assets/main/lib/animate/animate.min.css';
@import '../../assets/main/lib/magnific-popup/magnific-popup.css';
@import '../../assets/main/css/style.css';*/
</style>

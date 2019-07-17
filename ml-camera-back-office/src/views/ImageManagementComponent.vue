<template>
    <div class="wrapper">
        이미지 등록하기
      <div class="animated fadeIn">
        <b-row>
          <b-col cols="12" md="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i> <strong>이미지 등록하기</strong>
              </div>
              <div id="image-management-view">
                <image-upload-component>

                </image-upload-component>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
</template>
<script>
/* eslint-disable arrow-body-style,no-plusplus,no-unused-vars,prefer-const */
import ImageUploadComponent from '../components/custom/ImageUploadComponent';


export default {
  name: 'ImageMangement',
  components: {
    'image-upload-component': ImageUploadComponent,
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted..');
  },
  data() {
    return {
      uploadFile: [],
      selectedFile: '',
    };
  },
  methods: {
    // no jobs
  },
};
</script>

<style>
</style>


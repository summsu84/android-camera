<template>
  <div>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';

export default {
  name: 'ImageDropComponent',
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'http://localhost:8000/send',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
      },
    };
  },
};
</script>
<style>
@import './../../../node_modules/vue2-dropzone/dist/vue2Dropzone.min.css';
</style>

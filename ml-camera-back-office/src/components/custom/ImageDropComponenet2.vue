<template>
  <div>
    <!--이미지를 드랍 하는 컴포넌트-->
    <form class="dropzone">
      <!-- Not displayed, just for Dropzone's `dictDefaultMessage` option -->
      <div id="dropzone-message" style="display: none">
        <span class="dropzone-title">Drop files here or click to select</span>
        <span class="dropzone-info">You can upload multiple files at once</span>
      </div>
    </form>
  </div>
</template>

<script>
import Dropzone from 'dropzone';
import '../../../node_modules/dropzone/dist/dropzone.css';

Dropzone.autoDiscover = false;

export default {
  name: 'ImageDropComponenet',
  mounted() {
    // const vm = this;
    // Instantiate Dropzone
    // const options = {};
    // this.dropzone = new Dropzone(this.$el, options);
    // Set signed upload URL for each file
    /*
    vm.dropzone.on('processing', (file) => {
      vm.dropzone.options.url = file.uploadURL;
    });
    */
  },
};
</script>

<style>

form.dropzone {
  transition: all 0.2s linear;
  border: 2px dashed #ccc;
  background-color: #fafafa;
  min-height: initial;
}
.dz-message
.dropzone-title {
  color: #3498db;
}
.dz-message {
  color: #666;
}
span {
  line-height: 1.8;
  font-size: 13px;
  letter-spacing: 0.4px;
}
span.dropzone-title {
  display: block;
  color: #888;
  font-size: 1.25em;
}

span.dropzone-info {
  display: block;
  color: #a8a8a8;
}


</style>

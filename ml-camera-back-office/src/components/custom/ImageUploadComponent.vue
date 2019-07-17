<template>
  <!-- 이미지 업로드 콤포넌트 -->
  <div>
    <div id="camera-image-view">
      <loading-component
        v-if="getLoadingState"
      >
      </loading-component>
      <!-- 이미지 불러오기 -->
      <div style="display:none;" id="myDiv" class="animate-bottom">
        <h2>Tada!</h2>
        <p>Some text in my newly loaded page..</p>
      </div>
      <div>
        <label for="btnFile">파일 선택 : </label>
        <input type="file" name="uploadFile" id="btnFile"
               v-on:change="processImage2"  ref="myFiles"/> <br>
      </div>
      <div>
        <label for="inputUrl">URL 주소 : </label>
        <input type="input" name="uploadFile" id="inputUrl"/> <br>
      </div>
      <div>
        <!--<input type="submit" name="upload" hidden />
        <input type="button" name="upload2" id="btnSend" value="수동 전송" />-->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars,prefer-const,arrow-body-style,no-plusplus */
import axios from 'axios';
import LoadingComponent from './LoadingComponent';

export default {
  props: [
    'appType',
    'imgSrc',
  ],
  name: 'ImageRequestComponent',
  components: {
    'loading-component': LoadingComponent,
  },
  computed: {
    getLoadingState() {
      return this.$store.getters['content/getLoadingState'];
    },
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
      selectedUrl: this.imgSrc,
      localAppType: this.appType,
    };
  },
  methods: {
    requestImageProcess() {
      this.processImageByURL(this.selectedUrl);
    },
    loadImage(callback) {
      // no jobs
      this.uploadFile = this.$refs.myFiles.files;
      const reader = new FileReader();
      const self = this;
      reader.onload = (event) => {
        self.selectedFile = event.target.result;
        // this.uploadImage();
        callback();
      };
      reader.readAsDataURL(this.uploadFile[0]);
      // this.selectedFile = this.uploadFile[0];
    },
    uploadImage(imageByte, self) {
      const reqUrl = 'http://localhost:8000/api/site/image/';
      const control = document.getElementById('btnFile');
      const file = control.files[0];
      let formData = new FormData();

      const blob = new Blob([imageByte]);

      formData.append('image_nm', 'test');
      formData.append('image_ext', 'jpg');
      formData.append('image_size', '120');
      formData.append('image_blob', blob);

      // Blob 전송
      // const blob = new Blob()
      const http = new XMLHttpRequest();
      http.open('POST', reqUrl, true);
      // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          // Api.setResponsePayload(http.responseText);
          console.log(http.responseText);
        }
      };
      http.send(formData);

      // Built http request
      /*
      const http = new XMLHttpRequest();
      http.open('POST', reqUrl, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          // Api.setResponsePayload(http.responseText);
          console.log(http.responseText);
        }
      };
      const params = JSON.stringify(requestParam);
      // Stored in variable (publicly visible through Api.getRequestPayload)
      // to be used throughout the application
      // Send request
      http.send(params);
      */
    },
    processImage2() {
      const reqUrl = 'http://localhost:8000/api/site/image2/';
      const control = document.getElementById('btnFile');
      const file = control.files[0];
      let formData = new FormData();

      formData.append('image_nm', 'test');
      formData.append('image_ext', 'jpg');
      formData.append('image_size', '120');
      formData.append('image_blob', file, file.name);
      axios.post(reqUrl, formData);
    },
    processImage() {
      const control = document.getElementById('btnFile');
      const file = control.files[0];
      // Load base64 encoded image
      const reader = new FileReader();
      reader.onload = (() => {
        return (e) => {
          const img = document.createElement('img');
          let image = null;
          img.src = e.target.result;
          let jpg = true;
          try {
            image = atob(e.target.result.split('data:image/jpeg;base64,')[1]);
          } catch (err) {
            jpg = false;
          }
          if (jpg === false) {
            try {
              image = atob(e.target.result.split('data:image/png;base64,')[1]);
            } catch (err1) {
              console.log('Not an image file Rekognition can process');
              return;
            }
          }
          // unencode image bytes for Rekognition DetectFaces API
          const length = image.length;
          const imageBytes = new ArrayBuffer(length);
          const ua = new Uint8Array(imageBytes);
          for (let i = 0; i < length; i++) {
            ua[i] = image.charCodeAt(i);
          }
          // Call Rekognition
          const self = this;
          this.loadImage(() => {
            this.uploadImage(imageBytes, self);
          });
        };
      })(file);
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
  canvas{
  }
  #imgResult{
    display: block;
  }


  /* Center the loader */
  #loader {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    display: none;
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Add animation to "page content" */
  .animate-bottom {
    position: relative;
    -webkit-animation-name: animatebottom;
    -webkit-animation-duration: 1s;
    animation-name: animatebottom;
    animation-duration: 1s
  }

  @-webkit-keyframes animatebottom {
    from { bottom:-100px; opacity:0 }
    to { bottom:0px; opacity:1 }
  }

  @keyframes animatebottom {
    from{ bottom:-100px; opacity:0 }
    to{ bottom:0; opacity:1 }
  }

  #myDiv {
    display: none;
    text-align: center;
  }

  #btnSend {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
</style>

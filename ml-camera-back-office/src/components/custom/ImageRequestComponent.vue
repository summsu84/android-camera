<template>
  <div>
    <!--이미지를 AWS Rekognitnio으로 전송한다.-->
    <div id="camera-image-request-view">
      <!-- 이미지 불러오기 -->
      <div>
        <div>
          <label for="btnFile">파일 선택 : </label>
          <label class="btn-file-upload">
            Browse
            <input type="file" name="uploadFile" id="btnFile"
                   v-on:change="processLocalImage"  ref="refFile" style="display: none;">
          </label>
        </div>
        <div>
          <label for="inputUrl">URL 주소 : </label>
          <input type="input" name="uploadFile" id="inputUrl" v-model="selectedUrl"/>
          <label class="btn-url-upload">
            Apply
            <input type="button"
                   @click="processURLImage" style="display: none;">
          </label>
        </div>
      </div>
      <div id="resultDiv">
        <loading-component
          v-if="loadingState"
        >
        </loading-component>
        <div class="img">
          <h3>
            Input Image
          </h3>
          <div class="row">
            <div v-for="(imgSrc, idx) in localImgSrcList" v-bind:key="idx"
                 class="col-lg-3 col-md-4">
              <img id="'imgResult_' + idx" v-bind:src="imgSrc" height="300" width="300"
                   v-on:click="processDemoImage(imgSrc)" style="cursor: pointer;"/>
            </div>
          </div>
          <h3>
            Output Image
          </h3>
          <canvas id="canvasResult" />
          <draw-image-speech-bubble-component
            ref="refDrawImageSpeechBubble"
          >
          </draw-image-speech-bubble-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars,prefer-const,arrow-body-style,no-plusplus */

import AWS from 'aws-sdk';
import LoadingComponent from './LoadingComponent';
import DrawImageAndSpeechBubbleComponent from './DrawImageAndSpeechBubble';

export default {
  props: [
    'appType',
    'imgSrcList',
  ],
  name: 'ImageRequestComponent',
  components: {
    'loading-component': LoadingComponent,
    'draw-image-speech-bubble-component': DrawImageAndSpeechBubbleComponent,
  },
  created() {
    // no jobs
  },
  mounted() {
    this.initRecognitnio();
  },
  data() {
    return {
      localImgSrcList: this.imgSrcList,
      uploadFile: [],
      selectedFile: '',
      selectedUrl: '',
      localAppType: this.appType,
      loadingState: false,
    };
  },
  methods: {
    getLoadingState() {
      return this.loadingState;
    },
    // 이미지 버튼 클릭 시 , URL 기반 이미지 처리 요청
    processDemoImage(imgSrc) {
      this.requestImageDetection(imgSrc);
    },
    /* 이미지를 불러온다. */
    loadImage(callback) {
      this.uploadFile = this.$refs.refFile.files;
      const reader = new FileReader();
      const self = this;
      reader.onload = (event) => {
        self.selectedFile = event.target.result;
        // this.uploadImage();
        callback();
      };
      reader.readAsDataURL(this.uploadFile[0]);
    },
    /* AWS Rekognition API 호출 메서드 */
    DetectFaces(imageData) {
      AWS.region = 'US_EAST_2';
      const rekognition = new AWS.Rekognition();
      const params = {
        Image: {
          Bytes: imageData,
        },
        Attributes: [
          'ALL',
        ],
      };
      const self = this;
      rekognition.detectFaces(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
          self.requestSpeechContent(self.drawSpeechText, self);
        }
      });
    },
    /* URL 을 Node 서버로 요청하여 결과를 가져온 */
    requestImageDetection(imgUrl) {
      this.selectedFile = imgUrl;
      // const requrl = 'http://13.209.75.21:9090/api/detect/image';
      const requrl = 'http://localhost:3000/api/detect/image';
      const param = {
        url: imgUrl,
      };
      this.loadingState = true;
      this.$commonAxiosPostRequest(requrl, param,
        (res) => {
          const msg = res.data.data.retMsg.SPCH_CONT_MSG;
          this.drawSpeechText(msg);
        },
        (res) => {
          this.loadingState = false;
          console.log(res);
        });
    },
    /* URL 입력 시 적용 메서드 */
    processURLImage() {
      this.requestImageDetection(this.selectedUrl);
    },
    /* 이미지 감정 텍스트 처리 메서드 */
    /* 해당 메서드는 브라우저에서 로컬 파일 요청시 사용된다. */
    requestSpeechContent(callback, self) {
      const xhr = new XMLHttpRequest();
      // JSON 형태로 받는다.
      // const reqUrl = 'http://13.209.75.21:9090/api/bubble/search?age=10&gender=m&emotion=happy';
      const reqUrl = 'http://localhost:3000/api/bubble/search?age=10&gender=m&emotion=happy';
      xhr.open('GET', reqUrl);
      xhr.responseType = 'json';
      // force the HTTP response, response-type header to be blob
      xhr.onload = (e) => {
        const res = xhr.response;
        const msg = res.data.retMsg.SPCH_CONT_MSG;
        // this.drawSpeechText(msg);
        callback(msg);
      };
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      // xhr.withCredentials = false;
      xhr.send();
    },
    /* 로컬 이미지 처리 메서드 */
    processLocalImage() {
      // loading status check
      this.loadingState = true;
      const control = document.getElementById('btnFile');
      const file = control.files[0];
      // Load base64 encoded image
      const reader = new FileReader();
      reader.onload = (() => {
        return (e) => {
          const img = document.createElement('img');
          let image = null;
          img.src = e.target.result;
          this.imgSrc = img.src;
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
          // const self = this;
          this.loadImage(() => {
            this.DetectFaces(imageBytes, self);
          });
        };
      })(file);
      reader.readAsDataURL(file);
    },
    // 브라우저에서 AWS 사용 하도록 초기화 한다.
    initRecognitnio() {
      // Configure the credentials provider to use your identity pool
      // Initialize the Amazon Cognito credentials provider
      AWS.config.region = 'ap-northeast-2'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-northeast-2:e1eb4b7d-30b8-4d99-82a9-c6664d14e50c',
      });
      // Make the call to obtain credentials
      AWS.config.credentials.get(() => {
        // Credentials will be available when this function is called.
        let accessKeyId = AWS.config.credentials.accessKeyId;
        let secretAccessKey = AWS.config.credentials.secretAccessKey;
        let sessionToken = AWS.config.credentials.sessionToken;
      });
      // const credentials = new AWS.SharedIniFileCredentials();
      // AWS.config.credentials = credentials;
    },
    // 메시지를 그린다
    drawSpeechText(msg) {
      // 결과 사진 div에 텍스트를 드로잉 한다.
      const canvasResult = document.getElementById('canvasResult');
      const imgResult = document.getElementById('imgResult');
      const context = canvasResult.getContext('2d');
      // 이미지 생성하기
      const img = new Image();
      img.onload = () => {
        // canvasResult resize
        canvasResult.width = 300;
        canvasResult.height = 300;
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0,
          canvasResult.width, canvasResult.height);
        context.font = '20pt Kavivanar';
        context.fillStyle = 'blue';
        if (typeof msg !== 'undefined') {
          context.fillText(msg, 10, canvasResult.height - 20);
        } else {
          context.fillText('난 TeamJW CEO 다.', 20, 30);
        }
        this.$refs.refDrawImageSpeechBubble.showComponent(this.selectedFile, msg);
      };
      img.src = this.selectedFile;
      this.loadingState = false;
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

.btn-file-upload,
.btn-url-upload {
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 32px;
  border-radius: 2px;
  transition: 0.5s;
  margin: 10px;
  color: #fff;
}

.btn-file-upload {
  background: #0c2e8a;
  border: 2px solid #0c2e8a;
}

.btn-file-upload:hover {
  background: none;
  color: #0c2e8a;
  cursor: pointer;
}

.btn-url-upload {
  background: #50d8af;
  border: 2px solid #50d8af;
}

.btn-url-upload:hover {
  background: none;
  color: #50d8af;
  cursor: pointer;
}

.btn-file {
  position: relative;
  overflow: hidden;
}
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
</style>

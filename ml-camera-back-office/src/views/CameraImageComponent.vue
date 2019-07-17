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
                  <div>
                    <label for="btnFile">파일 선택 : </label>
                    <input type="file" name="uploadFile" id="btnFile"
                           v-on:change="processImage"  ref="myFiles"/> <br>
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
                <div id="resultDiv">
                  <div class="img">
                    <h3>
                      이미지 결과
                    </h3>
                    <canvas id="canvasResult" />
                    <h3>
                      이미지 소스
                    </h3>
                    <img id="imgResult" v-bind:src="selectedFile" height="200" width="200"/>
                  </div>
                  <image-dropdown-component>
                  </image-dropdown-component>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
</template>
<script>
/* eslint-disable arrow-body-style,no-plusplus,no-unused-vars,prefer-const */

import AWS from 'aws-sdk';
// import fs from 'fs';
// import fstream from 'fstream';
import LoadingComponent from '../components/custom/LoadingComponent';
import ImageDropdownComponent from '../components/custom/ImageDropComponenet';


export default {
  name: 'EmotionCodeManagement',
  components: {
    ImageDropdownComponent,
    'loading-component': LoadingComponent,
    'image-dropdown-component': ImageDropdownComponent,
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
    this.initRecognitnio();
  },
  data() {
    return {
      uploadFile: [],
      selectedFile: '',
    };
  },
  methods: {
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
    uploadImage() {
      AWS.config.update({
        accessKeyId: 'access_key',
        secretAccessKey: 'secretkey',
      });
      AWS.config.region = 'ap-northeast-2';
      const s3 = new AWS.S3();
      /* S3 버킷 설정 */
      const params = {
        Bucket: 'mlcamera',
        Key: null,
        ACL: 'public-read',
        Body: null,
      };
      params.Key = this.uploadFile[0].name;
      params.Body = this.uploadFile[0];
      // fs.createReadStream(this.uploadFile[0].path);
      s3.upload(params, (err) => {
        if (!err) {
          console.log('Successfully uploaded photo.');
        } else {
          console.log('There was an error uploading your photo: ', err.message);
        }
      });
    },
    DetectFaces(imageData, self) {
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
      rekognition.detectFaces(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
          this.drawSpeechText();
        }
      });
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
            this.DetectFaces(imageBytes, self);
          });
        };
      })(file);
      reader.readAsDataURL(file);
    },
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
    requestSpeechContent(callback) {
      // no jobs
    },
    drawSpeechText() {
      // 결과 사진 div에 텍스트를 드로잉 한다.
      const canvasResult = document.getElementById('canvasResult');
      const imgResult = document.getElementById('imgResult');
      const context = canvasResult.getContext('2d');
      // 이미지 생성하기
      const img = new Image();
      img.onload = () => {
        // canvasResult resize
        canvasResult.width = 200;
        canvasResult.height = 200;
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0,
          canvasResult.width, canvasResult.height);
        context.fillText('Test', 20, 20);
      };
      img.src = this.selectedFile;
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


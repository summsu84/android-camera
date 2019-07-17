<template>

  <div>
    <body id="body">

    <!--==========================
      Top Bar
    ============================-->
    <section id="topbar" class="d-none d-lg-block">
      <div class="container clearfix">
        <div class="contact-info float-left">
          <i class="fa fa-envelope-o"></i>
          <a href="mailto:contact@example.com">teamjw@teamjw.com</a>
          <i class="fa fa-phone"></i>
        </div>
        <div class="social-links float-right">
          <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
          <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
          <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
          <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
          <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
        </div>
      </div>
    </section>

    <!--==========================
      Header
    ============================-->
    <header id="header">
      <div class="container">

        <div id="logo" class="pull-left">
          <h1><a href="#body" class="scrollto">Reve<span>al</span></a></h1>
          <!-- Uncomment below if you prefer to use an image logo -->
          <!-- <a href="#body"><img src="img/logo.png" alt="" title="" /></a>-->
        </div>

        <nav id="nav-menu-container">
          <ul class="nav-menu">
            <li class="menu-active"><a href="#body">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#team">Team</a></li>
            <li class="menu-has-children"><a href="">Drop Down</a>
              <ul>
                <li><a href="#">Drop Down 1</a></li>
                <li><a href="#">Drop Down 3</a></li>
                <li><a href="#">Drop Down 4</a></li>
                <li><a href="#">Drop Down 5</a></li>
              </ul>
            </li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav><!-- #nav-menu-container -->
      </div>
    </header><!-- #header -->

    <!--==========================
      Intro Section
    ============================-->
    <section id="intro">

      <div class="intro-content">
        <h2>We are <span>TeamJW</span><br>Making New Services!</h2>
        <div>
          <a href="#about" class="btn-get-started scrollto">Get Started</a>
          <a href="#portfolio" class="btn-projects scrollto">Our Projects</a>
        </div>
      </div>
      <!--아래 삭제하면 오류가 발생하는문제-->
      <div id="intro-carousel" class="owl-carousel" >
        <!--<div class="item" style="background-image: url('img/intro-carousel/1.jpg');"></div>
        <div class="item" style="background-image: url('img/intro-carousel/2.jpg');"></div>
        <div class="item" style="background-image: url('img/intro-carousel/3.jpg');"></div>
        <div class="item" style="background-image: url('img/intro-carousel/4.jpg');"></div>
        <div class="item" style="background-image: url('img/intro-carousel/5.jpg');"></div>-->
      </div>

    </section><!-- #intro -->

    <main id="main">

      <!--==========================
        About Section
      ============================-->
      <section id="about" class="wow fadeInUp" v-if="appType != 'dev'">
        <div v-html="testHtml"></div>
      </section><!-- #about -->
      <!--==========================
              Clients Section
            ============================-->
      <section id="clients" class="wow fadeInUp">
        <div class="container">
          <div class="section-header">
            <h2>Try Our Cam</h2>
            <p>이미지를 업로드하여 DEMO를 체험해보세요.</p>
          </div>
        </div>
        <div class="container">
            <image-request-component
              :appType='appType'
              :imgSrcList='demoUrl'
            >
            </image-request-component>
        </div>
      </section><!-- #clients -->
      <!--==========================
        Services Section
      ============================-->
      <section id="services">
        <div class="container">
          <div class="section-header">
            <h2>Services</h2>
            <p>TeamJW 는 다양한 서비스 플랫폼을 제공하기 위해 준비중입니다.</p>
          </div>

          <div class="row">

            <div class="col-lg-6">
              <div class="box wow fadeInLeft">
                <div class="icon"><i class="fa fa-bar-chart"></i></div>
                <h4 class="title"><a href="">Life</a></h4>
                <p class="description">일상 생활에 필요한 다양한 서비스 플랫폼을 제공합니다.</p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="box wow fadeInRight">
                <div class="icon"><i class="fa fa-picture-o"></i></div>
                <h4 class="title"><a href="">Travel</a></h4>
                <p class="description">현재, 여행과 관련된 서비스 플랫폼을 준비 중입니다.</p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="box wow fadeInLeft" data-wow-delay="0.2s">
                <div class="icon"><i class="fa fa-shopping-bag"></i></div>
                <h4 class="title"><a href="">Traffic</a></h4>
                <p class="description">현재, 교통과 관련된 서비스 플랫폼을 준비 중입니다.</p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="box wow fadeInRight" data-wow-delay="0.2s">
                <div class="icon"><i class="fa fa-map"></i></div>
                <h4 class="title"><a href="">Social</a></h4>
                <p class="description">현재, 사회와 관련된 서비스 플랫폼을 준비 중입니다.</p>
              </div>
            </div>

          </div>

        </div>
      </section><!-- #services -->
      <!--==========================
        Our Portfolio Section
      ============================-->
      <section id="portfolio" class="wow fadeInUp" v-if="appType !== 'dev'">
        <div class="container">
          <div class="section-header">
            <h2>Our Portfolio</h2>
            <p>TeamJW 는 다양한 분야의 포트 폴리오를 제공하고 있습니다.</p>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row no-gutters">

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="https://play.google.com/store/apps/details?id=com.prd.jjw.dalam" class="portfolio-popup">
                  <img src="https://lh3.googleusercontent.com/mDLMbFqMs53TluJmMfOu1fNHccCsKHh9Z8oPBUdW_rG4PkLRGRHBnA9o4zvvnC1pocRc=s180-rw" width="250" height="250" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">아기달램 백색소음</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="https://play.google.com/store/apps/details?id=com.prd.jjw.dalam" class="portfolio-popup">
                  <img src="https://s3.ap-northeast-2.amazonaws.com/mlcamera/camera-3469830_960_720.png" width="250" height="250" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">ML 카메라</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="https://mplatform.seoul.go.kr/w/contest/award/2017/nominee/selectNominee.do" class="portfolio-popup">
                  <img src="https://mplatform.seoul.go.kr/upload/contest/app/stillcut/20180105/15151389963318GQMYL70RSHF0H6O9WXX09HV1.png" width="250" height="250" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">관광 가이드 챗봇</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="https://mplatform.seoul.go.kr/w/contest/award/2016/nominee/selectNominee.do" class="portfolio-popup">
                  <img src="https://mplatform.seoul.go.kr/upload/contest/app/stillcut/20170214/1487061301216P7HVXYJ4B1DA3DHZIJZD40WOS.png" width="250" height="250" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">서울 관광지 앱</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="img/portfolio/5.jpg" class="portfolio-popup">
                  <img src="img/portfolio/5.jpg" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">Portfolio Item 5</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="img/portfolio/6.jpg" class="portfolio-popup">
                  <img src="img/portfolio/6.jpg" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">Portfolio Item 6</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="img/portfolio/7.jpg" class="portfolio-popup">
                  <img src="img/portfolio/7.jpg" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">Portfolio Item 7</h2></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-md-4">
              <div class="portfolio-item wow fadeInUp">
                <a href="img/portfolio/8.jpg" class="portfolio-popup">
                  <img src="img/portfolio/8.jpg" alt="">
                  <div class="portfolio-overlay">
                    <div class="portfolio-info"><h2 class="wow fadeInUp">Portfolio Item 8</h2></div>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section><!-- #portfolio -->
      <!--==========================
        Our Team Section
      ============================-->
      <section id="team" class="wow fadeInUp" v-if="appType !== 'dev'">
        <div class="container">
          <div class="section-header">
            <h2>Our Team</h2>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-1.jpg" alt=""></div>
                <div class="details">
                  <h4>JW Park</h4>
                  <span>Chief Executive Officer</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-2.jpg" alt=""></div>
                <div class="details">
                  <h4>JW Jang</h4>
                  <span>CTOr</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-3.jpg" alt=""></div>
                <div class="details">
                  <h4>DJ Chun</h4>
                  <span>CMO</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-4.jpg" alt=""></div>
                <div class="details">
                  <h4>SH Kim</h4>
                  <span>CXO</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-4.jpg" alt=""></div>
                <div class="details">
                  <h4>BC Son</h4>
                  <span>CXO</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-4.jpg" alt=""></div>
                <div class="details">
                  <h4>HC SA</h4>
                  <span>CIO</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-4.jpg" alt=""></div>
                <div class="details">
                  <h4>YP Hong</h4>
                  <span>CXO</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-4.jpg" alt=""></div>
                <div class="details">
                  <h4>GS LEE</h4>
                  <span>Employee</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="member">
                <div class="pic"><img src="img/team-4.jpg" alt=""></div>
                <div class="details">
                  <h4>CW WONmjn</h4>
                  <span>CXO</span>
                  <div class="social">
                    <a href=""><i class="fa fa-twitter"></i></a>
                    <a href=""><i class="fa fa-facebook"></i></a>
                    <a href=""><i class="fa fa-google-plus"></i></a>
                    <a href=""><i class="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section><!-- #team -->

      <!--==========================
        Contact Section
      ============================-->
      <section id="contact" class="wow fadeInUp">
        <div class="container">
          <div class="section-header">
            <h2>Contact Us</h2>
            <p></p>
          </div>

          <div class="row contact-info">

            <div class="col-md-4">
              <div class="contact-address">
                <i class="ion-ios-location-outline"></i>
                <h3>Address</h3>
                <address>준비중</address>
              </div>
            </div>

            <div class="col-md-4">
              <div class="contact-phone">
                <i class="ion-ios-telephone-outline"></i>
                <h3>Phone Number</h3>
                <p><a href="tel:+828282">+828282</a></p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="contact-email">
                <i class="ion-ios-email-outline"></i>
                <h3>Email</h3>
                <p><a href="mailto:info@teajw.com">info@teamjw.com</a></p>
              </div>
            </div>

          </div>
        </div>

        <div class="container mb-4">
          <!--<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22864.11283411948!2d-13.96468908098944!3d40.630720240038435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbg!4v1540447494452" width="100%" height="380" frameborder="0" style="border:0" allowfullscreen></iframe>-->
        </div>
        <div class="container">
          <div class="form">
            <div id="sendmessage">Your message has been sent. Thank you!</div>
            <div id="errormessage"></div>
            <form action="" method="post" role="form" class="contactForm">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="text" name="name" class="form-control" id="name"
                         placeholder="Your Name" data-rule="minlen:4"
                         data-msg="Please enter at least 4 chars" />
                  <div class="validation"></div>
                </div>
                <div class="form-group col-md-6">
                  <input type="email" class="form-control" name="email" id="email"
                         placeholder="Your Email" data-rule="email"
                         data-msg="Please enter a valid email" />
                  <div class="validation"></div>
                </div>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="subject" id="subject"
                       placeholder="Subject" data-rule="minlen:4" data-msg="Please enter
                      at least 8 chars of subject" />
                <div class="validation"></div>
              </div>
              <div class="form-group">
              <textarea class="form-control" name="message" rows="5" data-rule="required"
                        data-msg="Please write something for us" placeholder="Message"></textarea>
                <div class="validation"></div>
              </div>
              <div class="text-center"><button type="button">Send Message</button></div>
            </form>
          </div>

        </div>
      </section><!-- #contact -->
      <draw-image-speech-bubble>

      </draw-image-speech-bubble>

    </main>
    </body>
  </div>
</template>

<script>
/* eslint-disable vue/return-in-computed-property */
import ImageDropComponent from '../components/custom/ImageDropComponenet';
import ImageRequestComponent from '../components/custom/ImageRequestComponent';
import DrawImageAndSpeechBubbleComponent from '../components/custom/DrawImageAndSpeechBubble';

export default {
  components: {
    'image-drop-component': ImageDropComponent,
    'image-request-component': ImageRequestComponent,
    'draw-image-speech-bubble': DrawImageAndSpeechBubbleComponent,
  },
  data() {
    return {
      inputs: {
        username: '',
        password: '',
      },
      demoUrl: [
        'https://s3.ap-northeast-2.amazonaws.com/mlcamera/demo_img1.jpg',
        'https://s3.ap-northeast-2.amazonaws.com/mlcamera/demo_img2.jpg',
        'https://s3.ap-northeast-2.amazonaws.com/mlcamera/demo_img3.jpg',
        'https://s3.ap-northeast-2.amazonaws.com/mlcamera/demo_img4.jpg',
      ],
      appType: process.env.MAIN_TYPE,
      menuInfo: [],
      contentInfo: [],
      testHtml: '',
    };
  },
  mounted() {
    // no jobs
    this.getMenuList();
  },
  methods: {
    login({ username, password }) {
      this.$store.dispatch('auth/login', { username, password })
        .then(() => this.$router.push('/'));
    },
    init() {
      this.$store.dispatch(('auth/initialize', {}));
    },
    getMenuList() {
      // Menu 정보를 가져온다.
      const requrl = `${process.env.PYTHON_API_URL}/api/site/menu`;
      const param = {
        method: 'get',
        url: requrl,
      };
      const vm = this;
      this.$commonAxiosRequest(param,
        (res) => {
          vm.menuInfo = res.data;
          this.getContentList();
        },
        (res) => {
          console.log(res);
        });
    },
    getContentList() {
      // 컨텐츠 정보를 가져온다.
      const requrl = `${process.env.PYTHON_API_URL}/api/site/content`;
      const param = {
        method: 'get',
        url: requrl,
      };
      const vm = this;
      this.$commonAxiosRequest(param,
        (res) => {
          vm.contentInfo = res.data;
          vm.testHtml = vm.contentInfo[1].ctn_dtls;
        },
        (res) => {
          console.log(res);
        });
    },
  },
  computed: {
    stateUserName() {
      // return this.inputs.username.length >= 4 ? true : false;
      return this.inputs.username.length >= 4;
    },
    statePassword() {
      // return this.inputs.username.length >= 4 ? true : false;
      return this.inputs.password.length >= 4;
    },
    invalidFeedbackUserName() {
      if (this.inputs.username.length > 4) {
        return '';
      } else if (this.inputs.username.length > 0) {
        return 'Enter at least 4 characters';
      }
      return '';
    },
    validFeedbackUserName() {
      return this.stateUserName === true ? 'Thank you' : '';
    },
    invalidFeedbackPassword() {
      if (this.inputs.password.length > 4) {
        return '';
      } else if (this.inputs.password.length > 0) {
        return 'Enter at least 4 characters';
      }
      return '';
    },
    validFeedbackPassword() {
      return this.statePassword === true ? 'Thank you' : '';
    },
  /* requestImageProcess() {
      this.$refs.refCallImageRequest.requestImageProcess();
    }, */
  },
};
</script>

<style>
@import '../assets/main/lib/bootstrap/css/bootstrap.min.css';
@import '../assets/main/lib/font-awesome/css/font-awesome.min.css';
@import '../assets/main/lib/animate/animate.min.css';
/*@import '../assets/main/lib/ionicons/css/ionicons.min.css';*/
@import '../assets/main/lib/magnific-popup/magnific-popup.css';
/*@import '../assets/main/lib/ionicons/css/ionicons.min.css';*/
@import '../assets/main/css/style.css';
#clients > div > div.owl-carousel.clients-carousel > div.clients-content > div >
a.btn-get-started.scrollto {
  background: #0c2e8a;
  border: 2px solid #0c2e8a;
}
#clients > div > div.owl-carousel.clients-carousel > div.clients-content > div >
a.btn-get-started.scrollto
{
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

#clients > div > div.owl-carousel.clients-carousel > div.clients-content > div >
a.btn-get-started.scrollto{
  background: #0c2e8a;
  border: 2px solid #0c2e8a;
}

#clients > div > div.owl-carousel.clients-carousel > div.clients-content > div >
a.btn-get-started.scrollto{
  background: none;
  color: #0c2e8a;
}
</style>

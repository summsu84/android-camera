<template>
    <div id="draw-image-speech-bubble" class="bubble">
      <canvas id="image-canvas" class="bubbleborder" width="300" height="300" />
    </div>
</template>

<script>
export default {
  name: 'DrawImageAndSpeechBubble',
  data() {
    return {
      localMsg: '',
    };
  },
  mounted() {
    // no jobs
    // this.dispQuoute();
  },
  methods: {
    drawBubble(pctx, x, y, w, h, radius, callback) {
      const ctx = pctx;
      const r = x + w;
      const b = y + h;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = '1';
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + (radius / 2), y - 10);
      ctx.lineTo(x + (radius * 2), y);
      ctx.lineTo(r - radius, y);
      // ctx.stroke();
      ctx.quadraticCurveTo(r, y, r, y + radius);
      ctx.lineTo(r, (y + h) - radius);
      ctx.quadraticCurveTo(r, b, r - radius, b);
      ctx.lineTo(x + radius, b);
      ctx.quadraticCurveTo(x, b, x, b - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);

      // end custom shape
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.stroke();
      callback();
    },
    drawImage(pctx, imgSrc, width, height, callback) {
      const ctx = pctx;
      const img = new Image();
      img.onload = () => {
        // canvasResult resize
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0,
          width, height);
        callback();
      };
      img.src = imgSrc;
    },
    drawSpeech(pctx, x, y, msg) {
      const ctx = pctx;
      ctx.font = '18pt Kavivanar';
      ctx.fillStyle = 'black';
      if (typeof msg !== 'undefined') {
        ctx.fillText(msg, x, y);
      } else {
        ctx.fillText('난 TeamJW CEO 다.', x, y);
      }
    },
    showComponent(imgUrl, msg) {
      this.dispQuoute(imgUrl, msg);
    },
    dispQuoute(imgSrc, msg) {
      const canvas = document.getElementById('image-canvas');
      const ctx = canvas.getContext('2d');
      this.localMsg = msg;
      // const imgSrc = 'https://s3.ap-northeast-2.amazonaws.com/mlcamera/demo_img1.jpg';
      this.drawImage(ctx, imgSrc, canvas.width, canvas.height, () => {
        this.drawBubble(ctx, 10, canvas.height - 50, 290, 50, 20, () => {
          this.drawSpeech(ctx, 14, canvas.height - 15, this.localMsg);
        });
      });
    },
  },
};
</script>

<style scoped>
.bubble
{
  position:relative;
  background:green;
  float:left;     /* because the image at left */
}
.bubbleborder
{
  position:absolute;
  top:0;
  left:0;
}
.bubbletext
{
  position:absolute;
  top:0;
  left:0;
  width:220px;
  height:200px;
  padding:76px 8px 8px 8px;
  text-align:center;
}
</style>

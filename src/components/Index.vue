<template>
  <div class="index-container">
    <swiper :options="swiperOption"
            class="swiper-box"
            ref="scrollScaffold">
      <swiper-slide class="swiper-item"><Homepage></Homepage></swiper-slide>
      <swiper-slide class="swiper-item"><Videopage></Videopage></swiper-slide>
      <swiper-slide class="swiper-item"><Third @disagree="handleDisagree"></Third></swiper-slide>
      <swiper-slide class="swiper-item" v-if="isAgree">Slide 4</swiper-slide>
      <swiper-slide class="swiper-item" v-if="isAgree">Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div :class="['swiper-button-next', { deep: currIndex === 2 }]" @click="handleTip" aria-disabled="false"></div>
  </div>
</template>

<script>
  let startx, starty;
  //获得角度
  function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }
  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }

    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }

    return result;
  }

  import Third from './Third.vue'
  import Homepage from './Homepage.vue'
  import Videopage from './Videopage.vue'
  export default {
    name: 'index',
    components: {
      Third,
      Homepage,
      Videopage,
    },
    data() {
      return {
        isAgree: true,
        currIndex: 0,
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 1,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          on: {
            touchEnd: () => {
              this.currIndex = this.swiper.activeIndex;
            }
          }
        },
      }
    },
    methods: {
      handleDisagree(val) {
        this.isAgree = val;
      },
      handleTip() {
        if(this.swiper.activeIndex === 2 && !this.isAgree) {
          setTimeout(()=>{
            alert('请阅读并理解用户协议')
          }, 200);
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.scrollScaffold.swiper;
      }
    },
    mounted() {
      document.addEventListener("touchstart", (e) => {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
      }, false);

      document.addEventListener("touchend", (e) => {
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
          case 0:
            //console.log("未滑动！");
            break;
          case 1:
            //console.log("向上！")
            if(this.currIndex === 2 && !this.isAgree) {
              setTimeout(()=>{
                alert('请阅读并理解用户协议')
              }, 200);
            }
            break;
          case 2:
            //console.log("向下！")
            break;
          case 3:
            //console.log("向左！")
            break;
          case 4:
            //console.log("向右！")
            break;
          default:
        }
      }, false);
    }
  }
</script>

<style>
  .index-container {
    height: 100%;
  }
  .deep.swiper-button-disabled {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
</style>

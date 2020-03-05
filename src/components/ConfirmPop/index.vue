<template>
  <transition name="confirm-fade">
    <div v-if="isShowConfirm" class="my-confirm" @click.stop="clickFun('clickConfirm')">
      <div class="confirm-content-wrap" @click.stop>              
           <player :video-url="videoUrl" :state="state"></player>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import player from '../video/VideoPlayer'
export default {
  components:{ player},
  data () {
    return {
      isShowConfirm: false, // 用于控制整个窗口的显示/隐藏
      content: 'Say Something ...', // 提示框的内容
      cancelText: '取消', // 取消按钮的文字
      confirmText: '确认', // 确认按钮的文字
      type: 'confirm', // 表明弹框的类型：confirm - 确认弹窗（有取消按钮）；alert - 通知弹框（没有取消按钮）
      outerData: null, // 用于记录外部传进来的数据，也可以给外部监听userBehavior，事件的函数提供判断到底是哪个事件触发的
      videoUrl:require('../../assets/video/testvideo.mp4'),
      videoList:[
        require('../../assets/video/testvideo.mp4')
      ],
      state: false
    }
  },
  methods: {
    show (content, config) {
      this.content = content || 'Say Something ...'

      if (Object.prototype.toString.call(config) === '[object Object]') {
        // 确保用户传递的是一个对象
        this.titleText = config.titleText || '操作提示'
        this.cancelText = config.cancelText || '取消'
        this.confirmText = config.confirmText || '确认'
        this.type = config.type || 'confirm'
        this.outerData = config.data || null
      }

      this.isShowConfirm = true
    },
    hidden () {
      this.isShowConfirm = false
      this.titleText = '操作提示'
      this.cancelText = '取消'
      this.confirmText = '确认'
      this.type = 'confirm'
      this.outerData = null
    },
    clickFun (type) {
      this.$emit('userBehavior', type, this.outerData)
      this.hidden()
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-confirm {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    /* 这里防止当用户长按屏幕，出现的黑色背景色块，以及 iPhone 横平时字体的缩放问题 */
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 进入和出去的动画 */
  .confirm-fade-enter-active {
    animation: opacity 0.3s;
  }
  .confirm-fade-enter-active .confirm-content-wrap {
    animation: scale 0.3s;
  }
  .confirm-fade-leave-active {
    animation: outOpacity 0.2s;
  }

  /* 包裹层容器样式 */
  .confirm-content-wrap {
    position: absolute;
    top: 28%;
    left: 0;
    right: 0;
    width:100%;
    height:400px;
    background:rgba(255,255,255,1);
    margin: 0 auto;
    z-index: 999;
    user-select: none;
  }

  /* 进来的动画 */
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes scale {
    0% {
      transform: scale(0);
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  /* 出去的动画 */
  @keyframes outOpacity {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>

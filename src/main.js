import Vue from 'vue'
import App from './App.vue'

import 'lib-flexible'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import VideoPlayer from 'vue-video-player' //播放器引入
Vue.use(VideoPlayer)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

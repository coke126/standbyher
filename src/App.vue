<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>


<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,body, #app {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
  }
  ul {
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  .swiper-box {
    width: 100% !important;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100% !important;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: fixed!important;
    top: 95% !important;
    transform: rotate(90deg) scale(0.5) !important;
  }

  .swiper-button-prev {
    left: 40% !important;
  }
  .swiper-button-next {
    left: 55% !important;
  }
</style>

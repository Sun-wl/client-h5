// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'

//初始化css
import './assets/css/index.css'

//使用swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

//使用mint-ui框架
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);
//使用的mint组件
import {Loadmore, Picker, InfiniteScroll} from 'Mint-ui'
//注册组件
Vue.component(Loadmore.name, Loadmore);
Vue.component(Picker.name, Picker);
Vue.use(InfiniteScroll);

//无限加载组件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
//vue-infinite-loading loadingmore组件
//import InfiniteLoading from 'vue-infinite-loading';


//高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'b410c9512352df1c4021960c1e9f59e4',
  plugin: ['Geolocation']
});

//vue-resource http请求
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App: resolve => {require(['./App'], resolve)}
  }
})



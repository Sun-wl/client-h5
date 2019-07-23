<template>
  <div class="order">
    <!-- swiper-->
    <!-- 分页器 -->
    <div class="swiper-pagination" slot="pagination">
      <span class="nav active" @click='toggle(0)'>待接单</span>
      <span class="nav" @click='toggle(1)'>待取货</span>
      <span class="nav" @click='toggle(2)'>配送中</span>
    </div>
    <div class="swipe">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>
          <div class="body">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
              <ul>
                <!-- <li v-for="item in list">{{ item }}</li> -->
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
                <li>22</li>
              </ul>
            </mt-loadmore>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="body">暂时还没有订单
            <div class="amap-wrapper">
              <el-amap :vid="'amap-vue'"></el-amap>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="body">暂时还没有订单</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swipe',
    data () {
      return {
        msg: '网站开发中......',
        // nav: true,
        // slide1:true,
        // slide2:false,
        // slide3:false,
        allLoaded: false,
        topPullText: '········',
        topLoadingText: "正在努力为你加载",
        maxDistance: 55,
        topDistance: 40,

        swiperOption: {
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载便使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: false,
          pagination: '.swiper-pagination',
          paginationType: 'custom',
          observeParents: true,
          debugger: true,
          simulateTouch: true,
          // swiper callbacks
          onSlideChangeStart(swiper){
            //切换slide时，让导航栏的active改变
            var index = swiper.activeIndex;
            var spans = swiper.paginationContainer[0].children;
            for (var i = 0; i < spans.length; i++) {
              spans[i].className = 'nav';
            }
            spans[index].className = 'nav active';
          },
        },
      }
    },
    //设置swiper对象，然后就可以获取到swiper对象
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    methods: {
      toggle (num) {
        //点击切换
        this.swiper.slideTo(num, 1000, false);
        var index = this.swiper.activeIndex;
        var spans = this.swiper.paginationContainer[0].children;
        for (var i = 0; i < spans.length; i++) {
          spans[i].className = 'nav';
        }
        spans[index].className = 'nav active';
      },
      loadTop () {
        // 加载更多数据
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom () {
        // 加载更多数据
        this.allLoaded = false;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      topMethod () {
        //这里执行下拉刷新
        this.list = [1, 23, 34, 45, 56]
      },
      bottomMethod () {
        //这里执行自动获取数据
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination {
    width: 100%;
    height: 50px;
    top: 0px;
    position: fixed;
  }

  .swiper-pagination span {
    display: block;
    width: 33.33%;
    height: 50px;
    float: left;
    background-color: rgb(20, 178, 148);
    text-align: center;
    line-height: 50px;
    box-sizing: border-box;
  }

  .active {
    border-bottom: 1px solid #fff;
    color: #fff;
  }

  .swiper-slide {
    /*width: 100%;*/
    /*height:700px;*/
    /*height: 100%;*/
    margin-top: 50px;
  }

  #slide-v {
    margin-top: 0px;
    text-align: center;
  }

  .body {
    text-align: center;
  }

  .vertical {
    /*text-align: center;*/
    height: 200px;
  }

  .refresh {
    font-size: 30px;
    display: block;
    position: relative;
    top: -26px;
  }

  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
</style>

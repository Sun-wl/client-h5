<template>
  <div class="bill">
    <header>
      <span @click="back"><img src="../../assets/ic_back_1.png"></span>
      <div>{{title}}</div>
    </header>
    <div class="date-bill clearfix">
      <div>
        <div class="left">
          <div class="top">{{y}}年</div>
          <div class="bottom" @click="date"><span class="mouth">{{m}}</span>月</div>
        </div>
        <div class="right">
          <div class="top">总支出(元)</div>
          <div class="mouth" v-if=" bill.monthTotle != 0">-{{bill.monthTotle}}</div>
          <div class="mouth" v-if="bill.monthTotle == 0">{{bill.monthTotle}}</div>
        </div>
      </div>
    </div>
    <div id="move">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" nfinite-scroll-distance="30">
        <div class="date-list" v-for="dayList in bill.dayList">
          <div class="every clearfix">
            <div class="left">{{dayList.time}}</div>
            <div class="right">支出：-{{dayList.dayTotle}}</div>
          </div>
          <div v-for="daydatas in dayList.daydatas">
            <div class="pay clearfix" v-if="daydatas.payStatus == 2">
              <div class="left"><img src="../../assets/pay.png"><span>{{daydatas.currentTime}}</span></div>
              <div class="right">-{{daydatas.paidAmount}}</div>
              <div class="center">支付</div>
            </div>
            <div class="refunds clearfix" v-if="daydatas.payStatus == 6">
              <div class="left"><img src="../../assets/tui.png"><span>{{daydatas.refundTime}}</span></div>
              <div class="right">+{{daydatas.reqAmount}}</div>
              <div class="center">退款</div>
            </div>
          </div>
        </div>
      </div>
      <span class="loading" slot="no-more">{{loadingText}}</span>
    </div>

    <transition name="fade">
      <div class="model" v-if="model">
        <div class="date-time">
          <div class="head">
            <div class="left" @click="cancel">取消</div>
            <div class="right" @click="sure">完成</div>
          </div>
          <div class="ul">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
          </div>
        </div>
      </div>
    </transition>


  </div>
</template>

<script>
  import {isiOS,baseUrl} from '../../../static/js/index.js'
  import {Indicator} from 'mint-ui';
  import Vue from 'vue';
  import {InfiniteScroll} from 'mint-ui';
  Vue.use(InfiniteScroll);

  export default {
    name: 'bill',
    data () {
      return {
        slots: [  // 日期选择插件的配置
          {
            flex: 2,
            values: ['2017年', '2016年', '2015年', '2014年', '2013年', '2012年'],
            className: 'slot1',
            textAlign: 'right',
            defaultIndex: 0,
          }, {
            divider: true,
            content: '-',
            className: 'slot2',
            flex: 1,
          }, {
            flex: 2,
            values: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
            className: 'slot3',
            textAlign: 'left',
            defaultIndex: 0,
          }
        ],
        title: '账户明细',
        pickerValue: null,
        model: false,
        year: '2017',
        month: '06月',
        y: '',
        m: '',
        bill: {
          monthTotle: 0,
          dayList: []
        },
        arr: [],
        distanceIndex: 1,
        page: 1,
        newTime: true,
        loading: true,
        loadingText: ''
      }
    },
    methods: {
      fetchData (url, type) {
        if (type == 1) {
          this.bill.dayList = [];
        }
        if (isiOS) {
          var s = JSON.stringify([url, 'accountDetails']);
          window.webkit.messageHandlers.httpGetRequest.postMessage(s);
        }else{
          window.gidoorHttpJs.httpGetRequest(url, 'accountDetails');
        }
      },
      loadMore() {
        this.loading = true;
        this.loadingText = '加载中...';
        this.page++;
        var params = 'page=' + this.page + '&month=' + this.y + '-' + this.m;
        var url = baseUrl + "pay/history/list?" + params;
        var self = this;
        this.fetchData (url, 2);
      },
      back () {
        //返回键（左上角）
        if (isiOS) {
          window.webkit.messageHandlers.onBaackPress.postMessage(null);
        }else{
          window.gidoorJS.onBaackPress();
        }
      },
      date () {
        this.model = !this.model;
        //判断选中的年份
        var y = new Date().getFullYear();

        this.slots[0].defaultIndex = y - this.y;
        if (this.m < 10) {
          var m = this.m.substr(1, 2);
        } else {
          m = this.m;
        }

        this.slots[2].defaultIndex = m - 1;
      },
      cancel () {
        this.model = false;
      },
      sure () {
        this.year = this.year || this.y
        this.month = this.month || this.m
        this.page = 1;
        if (this.year && this.month) {
          this.y = this.year
          this.m = this.month.split('月')[0];
        }
        this.model = false;
        var params = 'page=' + this.page + '&month=' + this.y + '-' + this.m;
        var url = baseUrl + "pay/history/list?" + params;
        var self = this;
        this.fetchData (url, 1);
      },
      // 日期插件
      onValuesChange (picker, values) {
        this.year = values[0];
        this.month = values[1];
        var y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        if (values[0] == undefined) {
          values[0] = y;
        }
        if (this.year == y) {
          var arr = [];
          for (var i = 1; i <= m; i++) {
            if (i >= 10) {
              arr.push(i + '月');
            } else {
              arr.push('0' + i + '月');
            }
          }
          this.slots[2].values = arr;
        } else {
          this.slots[2].values = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        }
      }
    },
    mounted() {
      function setHeight() {
        var h = window.innerHeight;
        var box = document.getElementById('move');
        box.style.height = (h - 109) + "px";
      }
      setHeight();
    },
    created() {
      var t = new Date();
      this.y = t.getFullYear();
      this.m = t.getMonth() + 1;
      if (Number(this.m) < 10) {
        this.m = '0' + this.m;
      }
      this.slots[2].defaultIndex = t.getMonth();
      this.slots[0].values = [this.y, this.y - 1, this.y - 2, this.y - 3]
      var self = this;
      window.accountDetails = function (res) {
        if (isiOS) {
          res = JSON.parse(res);
        }
        if (res.code == 200) {
          self.bill.monthTotle = res.data.monthTotle;
          if (res.data.dayList.length) {
            //对数据进行处理
            var dayList = res.data.dayList;
            for (var j = 0; j < dayList.length; j++) {
              var daydatas = dayList[j].daydatas;
              for (var i = 0; i < daydatas.length; i++) {
                daydatas[i]["currentTime"] = daydatas[i].createTime.split(' ')[1];
                daydatas[i].createTime = daydatas[i].createTime.split(' ')[0];
                if (daydatas[i].reqAmount) {
                  daydatas[i]["total"] = Number(daydatas[i].reqAmount) - Number(daydatas[i].paidAmount);
                } else {
                  daydatas[i]["total"] = '-' + daydatas[i].paidAmount;
                }
                if (daydatas[i].refundTime) {
                  daydatas[i].refundTime = daydatas[i].refundTime.split(' ')[1];
                }
              }
            }
            self.bill.dayList = self.bill.dayList.concat(dayList);
            self.loadingText = '上拉刷新';
            self.loading = false;
          } else {
            self.loadingText = '没有更多数据';
            if (!self.bill.dayList.length) {
              self.loadingText = '没有数据';
            }
          }
        } else if (res.code == 401) {
          if (res.msg) {
            //提示信息
            if (isiOS) {
              window.webkit.messageHandlers.showToast.postMessage(res.msg);
            }else{
              window.gidoorJS.showToast(res.msg);
            }
          }
          //跳转到登录页面
          if (isiOS) {
            window.webkit.messageHandlers.toLogin.postMessage(null);
          }else{
            window.gidoorJS.toLogin();
          }
        } else {
          if (res.msg) {
            if (isiOS) {
              window.webkit.messageHandlers.showToast.postMessage(res.msg);
            }else{
              window.gidoorJS.showToast(res.msg);
            }
          }
        }
      }

      var params = 'page=' + this.page + '&month=' + this.y + '-' + this.m;
      var url = baseUrl + "pay/history/list?" + params;
      this.fetchData (url, 1);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*过渡动画*/
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
    bottom: 0;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

  header {
    z-index: 111;
  }

  body {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .bill {
    background-color: #fff;
    width: 100%;
    height: 100%;
    z-index: 111;
  }

  .date-bill {
    width: 100%;
    margin-top: 50px;
    box-shadow: 0px 0px 10px 2px rgba(180, 180, 180, 0.8);
    position: fixed;
    top: 0px;
    background-color: #fff;
    z-index: 11;
  }

  .date-bill > div {
    display: inline-block;
    width: 100%;
    height: 55px;
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
  }

  .date-bill > div .top {
    line-height: 30px;
    color: #aaa;
  }

  .date-bill .bottom {
    position: relative;
  }

  .date-bill .bottom:before {
    display: inline-block;
    content: '';
    position: absolute;
    /*background-color: #000;*/
    right: -8px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid #999;
    top: 7px;
  }

  .date-bill .mouth {
    font-size: 18px;
    color: #666;
  }

  #move {
    padding-top: 109px;
    width: 100%;
    overflow: scroll;

  }

  ._v-container {
    padding-top: 109px;
    /*padding-bottom: 100px;*/
    box-sizing: border-box;
  }

  .picker .picker-items {
    left: 33px;
    background-color: #ccc;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .date-list > div {
    padding: 0 20px;
  }

  .date-list img {
    width: 20px;
    padding-right: 10px;
    vertical-align: middle;
  }

  .date-list .every {
    overflow: hidden;
    height: 50px;
    line-height: 70px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  .date-list .pay {
    color: #666;
    height: 35px;
    line-height: 30px;
  }

  .date-list .refunds {
    height: 35px;
    line-height: 30px;
  }

  .pay .center {
    margin: 0 100px;
    text-align: center;
  }

  .refunds .center {
    margin: 0 100px;
    text-align: center;
  }

  /*弹出的日期选择插件*/
  .model {
    position: fixed;
    left: 0;
    righty:0;
    bottom: 0;
    width: 100%;
    height: 35%;
    /*opacity: .5;*/
    background-color: #fff;
    z-index: 9999;
  }

  .model > div {
    font-size: 14px;
  }

  .model > .date-time > .head {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background-color: rgb(238, 238, 238);
  }

  .loading {
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-top: 20px;
  }

</style>

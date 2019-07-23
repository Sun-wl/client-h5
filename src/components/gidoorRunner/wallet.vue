<template>
  <div class="wallet">
    <header>
      <img @click="back" src="../../assets/toback.png">
      <div>{{title}}</div>
      <span class="filter" @click="filte">筛选</span>
    </header>
    <div class="menu clearfix">
      <div class="left">
        <span>钱包</span>
        <span class="money">￥{{total.balance}}</span>
      </div>
      <div class="right">
        <span>可提现</span>
        <span class="money">￥{{total.cashWithdrawals}}</span>
      </div>
    </div>
    <div class="date-bill clearfix">
      <div>
        <div class="left">
          <div @click="date"><span class="mouth">{{m}}</span>月</div>
        </div>
        <div class="right">
          <div class="line">月收入￥{{data.monthTotle}}</div>
        </div>
      </div>
      <div class="padding"></div>
    </div>
    <div id="move">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" nfinite-scroll-distance="30">
        <div class="date-list" v-for='item in data.contextList'>
          <div class="every clearfix">
            <div class="left">{{item.time}}</div>
            <div class="right">收入：+{{item.dayTotle}}</div>
          </div>
          <div v-for="list in item.dayData">
            <div class="refunds clearfix" v-if="list.tradeType == 1">
              <div class="left"><img src="../../assets/income.png"><span>{{list.time}}</span></div>
              <div class="right">+{{list.amount}}</div>
              <div class="center">{{list.tradeRemark}}</div>
            </div>
            <div class="refunds clearfix" v-else>
              <div class="left"><img src="../../assets/ti.png"><span>{{list.time}}</span></div>
              <div class="right">-{{list.amount}}</div>
              <div class="center">{{list.tradeRemark}}</div>
            </div>
          </div>
        </div>
      </div>
      <span class="loading" slot="no-more">{{loadingText}}</span>
    </div>
    <button @click="cash">申请提现</button>


    <div class="details" v-if='filter'>
      <div @click="incomes">收入明细</div>
      <div class="bottom" @click="widthdraw">提现明细</div>
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
  import {baseUrl} from '../../../static/js/index.js'
  import {Indicator} from 'mint-ui';
  import Vue from 'vue';
  import {InfiniteScroll} from 'mint-ui';
  Vue.use(InfiniteScroll);

  export default {
    name: 'wallet',
    data () {
      return {
        slots: [  //日期选择插件的配置
          {
            flex: 2,
            values: ['2017年', '2016年', '2015年', '2014年', '2013年', '2012年'],
            className: 'slot1',
            textAlign: 'right',
            defaultIndex: 0,
          }, {
            divider: true,
            content: '',
            className: 'slot2',
            flex: 2,
          }, {
            flex: 2,
            values: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
            className: 'slot3',
            textAlign: 'left',
            defaultIndex: 0,
          }
        ],
        title: '我的钱包',
        model: false,
        year: '2017',
        month: '06月',
        y: '',
        m: '',
        page: 1,
        filter: false,
        total: {},
        data: {
          monthTotle: 0,
          contextList: []
        },
        test: [123, 23, 32, 3],
        loading: true,
        loadingText: '',
        type: 0
      }
    },
    methods: {
      fetchData (url, type) {
        //第一次请求
        if (type == 1) {
          this.data.contextList = [];
        }
        window.gidoorHttpJs.httpGetRequest(url, 'accountRecord');
      },
      back () {
        //返回键（左上角）
        window.gidoorJS.onBackPressed()
      },
      loadMore () {
        //关闭无限滚动
        this.loading = true;
        this.loadingText = '加载中...';
        this.page++;
        var month = this.y + '-' + this.m;
        if (this.type == 1) {
          var params = 'month=' + month + "&page=" + this.page + '&flag=1';
        } else if (this.type == 2) {
          var params = 'month=' + month + "&page=" + this.page + '&flag=2';
        } else {
          var params = 'month=' + month + "&page=" + this.page;
        }
        var url = baseUrl + 'account/findPaymentsAndBalance?' + params;
        var self = this;
        this.fetchData(url, 2);
      },
      date () {
        //判断选中的年份
        var y = new Date().getFullYear();
        this.slots[0].defaultIndex = y - this.y;
        if (this.m < 10) {
          var m = this.m.substr(1, 2);
        } else {
          m = this.m;
        }
        this.model = !this.model;
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
        Indicator.open();

        var month = this.y + '-' + this.m;
        var params = 'month=' + month + "&page=" + this.page;
        var url = baseUrl + 'account/findPaymentsAndBalance?' + params;
        var self = this;
        this.fetchData(url, 1);

      },
      filte () {
        this.filter = !this.filter;
      },
      cash () {
        window.GidoorWalletJs.toWithDrawPage()
      },
      incomes () {
        this.loadingText = '加载中...';
        this.type = 1;
        this.filter = false;
        this.page = 1;
        Indicator.open();
        var month = this.y + '-' + this.m;
        var params = 'month=' + month + "&page=" + this.page + "&flag=1";
        var url = baseUrl + '/account/findPaymentsAndBalance?' + params;
        var self = this;
        this.fetchData(url, 1);
      },
      widthdraw () {
        this.loadingText = '加载中...';
        this.type = 2;
        this.filter = false;
        this.page = 1;
        Indicator.open();
        var month = this.y + '-' + this.m;
        var params = 'month=' + month + "&page=" + this.page + "&flag=2";
        var url = baseUrl + 'account/findPaymentsAndBalance?' + params;
        var self = this;
        this.fetchData(url, 1);

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
    mounted () {
      function setHeight() {
        var h = window.innerHeight;
        var box = document.getElementById('move');
        box.style.height = h - 270 + "px";
      }
      setHeight();
    },
    created () {
      var t = new Date();
      this.y = t.getFullYear();
      this.m = t.getMonth() + 1;
      if (Number(this.m) < 10) {
        this.m = '0' + this.m;
      }
      this.slots[2].defaultIndex = t.getMonth();
      this.slots[0].values = [this.y, this.y - 1, this.y - 2, this.y - 3]
      var self = this;

      //余额
      var url = baseUrl + 'account/queryBalance';
      window.accountTotal = function (res) {
        if (res.code == 200) {
          if (res.data) {
            self.total = res.data;
          }
        }
      }
      window.gidoorHttpJs.httpGetRequest(url, 'accountTotal');

      //收入、提现记录
      window.accountRecord = function (res) {
        if (res.code == 200) {
          if (res.data.monthTotle) {
            self.data.monthTotle = res.data.monthTotle;
          }
          if (res.data.contextList.length) {
            self.data.contextList = self.data.contextList.concat(res.data.contextList);
            self.loadingText = '上拉刷新';
            //开启无限滚动
            self.loading = false;
          } else {
            self.loadingText = '没有更多数据';
            if (!self.data.contextList.length) {
              self.loadingText = '没有数据';
            }
          }
          Indicator.close();
        } else if (res.code == 401) {
          if (res.msg) {
            window.gidoorJS.showToast(res.msg);
          }
          //跳转到登录页面
          window.gidoorJS.toLogin();
        } else {
          if (res.msg) {
            window.gidoorJS.showToast(res.msg);
          }
        }
      }
      var month = this.y + '-' + this.m;
      var params = 'month=' + month + "&page=" + this.page;
      var url = baseUrl + 'account/findPaymentsAndBalance?' + params;
      this.fetchData(url, 1);
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
    border-bottom: none;
    background-color: #f2aa24;
    color: #fff;
    height: 60px;
    font-size:0;
  }
  header img {
    background-color: #f2aa24;
    height: 18px;
    width: 19px;
    position: absolute;
    left:10px;
    top:8px;
  }
  header div{
    line-height:60px;
    font-size:18px;
  }

  header .filter {
    line-height:60px;
    right: -84%;
    font-size: 15px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .menu {
    width: 100%;
    position: fixed;
    top: 60px;
    background-color: #f2aa24;
    color: #fff;
  }

  .menu .left, .menu .right {
    width: 50%;
    height: 50px;
    text-align: center;
  }

  .menu span {
    display: inline-block;
    width: 100%;
    height: 25px;
    line-height: 20px;
  }

  .menu span.money {
    font-size: 14px;
  }

  .bill {
    background-color: #fff;
    width: 100%;
    height: 100%;
    z-index: 111;
  }

  .date-bill {
    width: 100%;
    margin-top: 110px;
    position: fixed;
    top: 0px;
    background-color: #fff;
    z-index: 111;
  }

  .date-bill .left, .date-bill .right {
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #777;
  }

  .date-bill .mouth {
    font-size: 18px;
    color: #777;
    position: relative;
  }

  .date-bill .mouth:before {
    display: inline-block;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid #b6b6b6;
    left: 36px;
    top: 7px;
  }

  .date-bill .line {
    position: relative;
  }

  .date-bill .line:before {
    display: inline-block;
    content: '';
    position: absolute;
    width: 1px;
    height: 30px;
    background-color: #ccc;
    left: 0px;
    top: 10px;
  }

  .date-bill .padding {
    width: 100%;
    height: 15px;
    background-color: rgb(239, 238, 237);
    margin-top: 50px;
  }

  #move {
    margin-top: 175px;
    width: 100%;
    overflow: scroll;
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
    color: #444;
  }

  .date-list .pay {
    color: #666;
    height: 35px;
    line-height: 30px;
  }

  .date-list .refunds {
    height: 35px;
    line-height: 30px;
    color: #666;
  }

  .pay .center {
    margin: 0 100px;
    text-align: center;
  }

  .refunds .center {
    margin: 0 100px;
    text-align: center;
  }

  .loading {
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-top: 20px;
  }

  button {
    width: 220px;
    height: 40px;
    border-radius: 50px;
    border: none;
    outline-style: none;
    font-size: 18px;
    color: #fff;
    background-color: #f2aa24;
    position: fixed;
    bottom: 40px;
    left: 50%;
    margin-left: -110px;
  / / transform: translateX(- 50 %);
    box-shadow: 0px 0px 5px 2px rgba(5, 5, 5, .2);

  }

  .details > .bottom {
    top: 76px;

  }

  /*弹出的日期选择插件*/
  .model {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 35%;
    /*opacity: .5;*/
    background-color: #fff;
    z-index: 999999;
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

  .details > div {
    position: fixed;
    z-index: 1111;
    width: 72px;
    height: 35px;
    line-height: 35px;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #fff;
    right: 5px;
    top: 40px;
  }

</style>

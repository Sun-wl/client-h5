<template>
  <div class="details">

    <div class="tab clearfix">
      <span @click="toggle(1)"><span :class="{active: active}" class="sty">订单详情</span></span>
      <span @click="toggle(2)"><span :class="{active: !active}" class="sty">订单状态</span></span>
    </div>

    <div class="gap"></div>
    <div class="content" v-if="active">
      <div class="msg">
        <div class="msgCtn">
          <p class="distance">{{order.runnerDistanceText}}1.25km</p>
          <p class="msgText from">取:</p>
          <span class="addr">{{order.fromAddress}}dfsfsadfdsfsfdfdfsdfdfsdf</span>
          <div class="imgBox"><img @click="call(order.fromMobile)" src="../../assets/phone.png"></div>
          <img src="../../assets/range.png">
        </div>
        <div class="msgCtn">
          <p class="distance">{{order.distanceText}}1.25千米</p>
          <p class="msgText to">收:</p>
          <span class="addr">{{order.toAddress}}dfsfsadfdsfsfdfdfsdfdfsdf</span>
          <div class="imgBox"><img @click="call(order.toMobile)" src="../../assets/phone.png"></div>
        </div>
      </div>

      <div class="amap">
        <img src="../../assets/location.png" @click='location' alt="">
        <el-amap class="amap-demo" vid="amapDemo" :dragEnable="dragEnable" :center="center" :zoom="zoom"
                 :plugin="plugin">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :content="marker.content"
                          :draggable="marker.draggable" :events="marker.events" :visible="marker.visible">
          </el-amap-marker>
        </el-amap>
      </div>

      <div class="res">
        <div class="clearfix" v-if="clothes">
          <div>预约送衣:</div>
          <span>{{order.fromApptsDateText}} ~ {{order.fromAppteDateText}}</span></div>
        <div class="clearfix" v-if="rateTime">
          <div>配送时效:</div>
          <span class="mColor">{{order.rateTimeText}}</span>
        </div>
        <!-- <div class="clearfix">
          <div>配送费用:</div>
          <span class="mColor">{{order.serviceMoney}}元</span>
        </div> -->
        <div class="clearfix menu">
          <div>订单详情</div>
        </div>
        <div class="clearfix">
          <div>订单号:</div>
          <span>{{order.orderNo}}11111111111</span>
        </div>
        <div class="clearfix" v-if="orderSn">
          <div>流水号:</div>
          <span>{{order.orderSn}}</span>
        </div>
        <div class="clearfix" v-if='goodsTypeText'>
          <div>服务类型:</div>
          <span>{{order.goodsTypeText}}</span>
        </div>
        <div class="clearfix menu">
          <div>物品信息</div>
        </div>
        <div class="clearfix" v-if='goodsTypeText'>
          <div>物品类型:</div>
          <span>{{order.goodsTypeText}}</span>
        </div>
        <div class="clearfix" v-if='goods'>
          <div>物品名称:</div>
          <span v-for="items in order.itemsList">{{items.name}}&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div class="clearfix" v-if='goods'>
          <div>物品数量:</div>
          <span v-for="items in order.itemsList">{{items.num}}&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div class="clearfix">
          <div class="mColor">代收款:</div>
          <span class="mColor">{{order.collectionMoney}}</span>
        </div>
        <div class="clearfix" v-if='payStatusText'>
          <div>支付状态:</div>
          <span>{{order.payStatusText}}</span>
        </div>
      </div>

      <div class="submit">
        <button v-if="btn" @click="submit">{{btnText}}</button>
        <button v-else>{{btnText}}</button>
      </div>
    </div>

    <div class="status" v-if='!active'>
      <div class="clearfix" v-for="(items,index) in orderStatus">
        <div class="left">
          <span v-bind:class="{circle:true,light:index ==last}"></span>
          <span v-bind:class="{line:true,linelight:index == last,none:index==last}"></span>
        </div>
        <div class="right">
          <div class="cTime">
            {{items.createTime}}
          </div>
        </div>
        <div class="center">
          <div>{{items.statusText}}</div>
          <div class="sm">{{items.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'details',
    data () {
      let self = this;
      return {
        title: '订单详情',
        active: true,
        order: {},
        orderStatus: [],
        btn: true,
        btnText: '',
        goods:false,
        clothes: false,
        rateTime: true,
        orderNo:false,
        orderSn:false,
        goodsTypeText:false,
        payStatusText:false,
        orther: true,
        last: 3,
        runnerToWhere:1,
        //地图配置
        center: [121.5273285, 31.21515044],
        zoom: 15,
        dragEnable: true,
        jogEnable: false,
        loaded: true,
        markers: [  //取点 收点 定位点
          {
            position: [121.5273285, 31.21515044],
            visible: true,
            draggable: false,
            content: '<img style="height:35px;" src="./static/qu.png">',
          },
          {
            position: [121.5273285, 31.23515044],
            visible: true,
            draggable: false,
            content: '<img style="height:35px;"  src="./static/shou.png">',
          },
          {
            position: [121.5273285, 31.23515044],
            visible: true,
            draggable: false,
            content: '<img style="height:35px;"  src="./static/men.png">',
          }
        ],
        plugin: [{
          //插件配置
          pName: 'Geolocation',
          showCircle: false,
          showMarker: false,
          showButton: false,
          enableHighAccuracy: true,
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat];
                  self.loaded = true;
                  self.$nextTick();
                  self.markers[2].position = self.center;
                  self.zoom = 15;
                }
              });
            }
          }
        }]
      }
    },
    methods: {
      back() {
        //返回按钮
        window.gidoorJS.onBaackPress();
      },
      toggle (num) {
        if (num == 1) {
          this.active = true;
        } else {
          this.active = false;
        }
      },
      call (phone) {
        window.gidoorJS.toDialActivity(phone);
      },
      submit () {
        window.orderDetailJs.onButtonClick();
      },
      location () {
        if(this.runnerToWhere == 1){
          window.gidoorNavJs.navOutSide(this.markers[0].position[0],this.markers[0].position[1],this.order.fromAddress);
        }else if(this.runnerToWhere == 2){
          window.gidoorNavJs.navOutSide(this.markers[1].position[0],this.markers[1].position[1],this.order.toAddress);
        }

      }
    },
    created() {
      var self = this;

      window.initOrderdetails = function (json) {

        //事件戳函数
        function formatDateTime(inputTime) {
          var date = new Date(inputTime);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        };
        //数据
        if (json.code == 200) {
          self.order = json.data;
          if(self.order.orderNo){
              self.orderNo = true
          }
          if(self.order.orderSn){
              self.orderNo = true
          }
          if(self.order.goodsTypeText){
              self.goodsTypeText = true
          }
          if(self.order.payStatusText){
              self.payStatusText = true
          }
          //物品名称、物品数量
          if(self.order.itemsList.length){
              self.goods = true;
          }
          //取货地
          if(self.order.runnerDistance){
            //地图的缩放
            if (self.order.runnerDistance < 1) {
              self.zoom = 16;
            } else if (self.order.runnerDistance > 1 && self.order.runnerDistance < 2) {
              self.zoom = 15;
            } else if (self.order.runnerDistance > 2 && self.order.runnerDistance < 4) {
              self.zoom = 14;
            } else if (self.order.runnerDistance > 4 && self.order.runnerDistance < 6) {
              self.zoom = 13;
            } else if (self.order.runnerDistance > 6 && self.order.runnerDistance < 10) {
              self.zoom = 12;
            } else {
              self.zoom = 15;
            }
            //距离取货地距离显示文本
            if (self.order.runnerDistance < 1) {
              self.order.runnerDistanceText = self.order.runnerDistance * 1000 + "米";
            } else {
              self.order.runnerDistanceText = Math.round(self.order.runnerDistance * 10) / 10 + "千米";
            }
          }else{
            self.order.runnerDistanceText = '0米';
          }

          //收货地
          if(self.order.distance){
            if (self.order.distance < 1) {
              self.order.distanceText = self.order.distance * 1000 + "米"
            } else {
              self.order.distanceText = Math.round(self.order.distance * 10) / 10 + "千米"
            }
          }else{
            self.order.distanceText = '0米';
          }

          if (self.order.fromPoint && self.order.fromPoint.indexOf(',') > 0) {
            //地图坐标
            var x = +self.order.fromPoint.split(',')[0];
            var y = +self.order.fromPoint.split(',')[1];
            self.center = self.markers[0].position = [x, y];
          }

          if (self.order.toPoint && self.order.toPoint.indexOf(',') > 0) {
            //地图坐标
            var x1 = +self.order.toPoint.split(',')[0];
            var y1 = +self.order.toPoint.split(',')[1];
            self.markers[1].position = [x1, y1];
          }

          //预约送衣
          self.order.fromApptsDateText = formatDateTime(self.order.fromApptsDate).substr(0, 17);
          self.order.fromAppteDateText = formatDateTime(self.order.fromAppteDate).substr(10, 17);

          //配送时效
          if (self.order.rateTime > 0) {
            self.order.rateTimeText = self.order.rateTime + '分钟'
          } else if (self.order.rateTime == 0) {
            self.order.rateTimeText = '不限'
          } else {
            self.rateTime = false;
          }

          //服务类型
          if (self.order.goodsType == 8) {
            self.clothes = true;
          } else {
            self.clothes = false;
          }

          //代收款
          if (self.order.collectionMoney == null) {
            self.order.collectionMoney = "无";
          }

          //底部按钮文字
          var status = parseInt(self.order.status);
          if (status % 10 == 1) {
            self.btn = true;
            self.btnText = "接单"
          } else if (status % 10 == 2) {
            self.btn = true;
            self.btnText = "提货";
            self.runnerToWhere = 1;
            if (status == 12) {
              self.btnText = "到店提货"
            }
          } else if (status % 10 == 3) {
            self.btn == true;
            self.btnText = "签收";
            self.runnerToWhere = 2;
            if (slef.goodsType == 8) {
              self.btnText = "我已到店"
            }
          } else if (status == 4) {
            self.btn == false;
            self.btnText = "该订单正在被修改"
          } else if (status == 5 || status == 6) {
            self.btn == false;
            self.btnText = "该订单已经取消"
          } else if (status == 7) {
            self.btn == false;
            self.btnText = "该订单已经完成"
          } else if (status == 8) {
            self.btn == false;
            self.btnText = "该订单为异常单"
          }
        }
      }

      window.initOrderStatus = function (json) {
        if (json.code==200 && json.data.length) {
          //时间转换
          self.orderStatus = json.data;
          self.last = json.data.length - 1;
        }
      }
    }
  }
</script>


<style>
  /*过渡效果*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .details {
    padding-bottom: 45px;
  }

  .tab {
    width: 100%;
    box-shadow: 0 2px 10px 0 #aaa;
    color: #999;
    font-size: 16px;
  }

  .tab span {
    display: inline-block;
    width: 50%;
    height: 40px;
    text-align: center;
    float: left;
    line-height: 40px;
    box-sizing: border-box;
  }

  .tab .sty {
    margin-left: 30%;
  }

  .active {
    color: #444;
    border-bottom: 2px solid rgb(241, 170, 36);
  }

  .gap {
    width: 100%;
    height: 15px;
    background-color: #eee;
  }

  .content {
    width: 100%;
  }

  .msg{
    width:100%;
    font-size:14px;
  }
  .msg .msgCtn{
    width:100%;
    padding:10px;
    min-height:60px;
    box-sizing:border-box;
    display: table;
    position:relative;
  }
  .msg .msgCtn > img{
    width:8px;
    height:35px;
    position: absolute;
    left:36px;
    top:60%;
  }
  .msg .msgCtn .distance{
    display: table-cell;
    width:60px;
    text-align:center;
    font-size:13px;
    line-height:30px;
  }
  .msg .msgCtn .msgText{
    display: table-cell;
    width:50px;
    line-height:30px;
    text-align:center;
  }
  .msg .msgCtn .msgText.from{
    color: #199343;
  }
  .msg .msgCtn .msgText.to{
    color: #de640f;
  }
  .msg .msgCtn .addr{
    display: table-cell;
    line-height:30px;
    word-break: break-all;
  }
  .msg .msgCtn .imgBox{
    display: table-cell;
    width:50px;
    font-size:0;
    box-sizing:border-box;
    padding: 0 10px;
  }
  .msg .msgCtn .imgBox img{
    width:30px;
    vertical-align: top;
  }



  .amap {
    width: 100%;
    height: 180px;
    position: relative;
  }
  .amap>img{
    width:35px;
    position: absolute;
    top:5px;
    right:5px;
    z-index:111;
  }

  .res > div {
    width: 100%;
    color: #777;
    border-bottom: 1px solid #eee;
    line-height: 40px;
  }

  .res > div > div {
    width: 75px;
    height: 40px;
    float: left;
    font-size: 16px;
    margin-left: 10px;
  }

  .res > div > .clean {
    width: 80%;
    height: 30px;
    float: none;
    margin-left: 0;
    padding-left: 88px;
    line-height: 30px;
  }

  .res > div > .clean span {
    margin-right: 40px;
    float: right;
  }

  .mColor {
    color: #f2aa24;
  }

  .res > div > span {
    /*line-height: 45px;*/
    font-size: 16px;
    margin-left: 10px;
  }

  .res > div.menu {
    background-color: #eee;
  }

  .res > div.menu > div {
    color: #444;
  }

  .res > div.menu > .btn {
    float: right;
    color: #000;
    width: 30px;
    height: 45px;
    margin-right: 20px;
  }

  .res > div.menu > .btn > span {
    width: 0;
    height: 0;
    border-bottom: 12px solid #999;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: relative;
    top: -13px;
  }

  .res > div.menu > .btn > span.show {
    border-top: 12px solid #999;
    border-bottom: none;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: relative;
    top: 19px;
  }

  .submit button {
    width: 100%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
    background-color: #f2aa24;
    color: #fff;
    border: none;
    position: fixed;
    bottom: 0px;
    padding: 0px;
  }

  .disabled {

  }

  /*订单状态*/
  .status > div {
      width: 100%;
      height: 90px;
      /*background-color: #ccc;*/
      /*overflow: hidden;*/
    }

    .status > div > .left {
      width: 60px;
      height: 90px;
      float: left;
    }

    .status > div > .left > .circle {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background-color: rgb(204, 204, 204);
      margin: 0 20px;
      position: relative;
      top: -22px;
    }

    .status > div > .left > .line {
      display: inline-block;
      width: 1px;
      height: 60px;
      background-color: rgb(204, 204, 204);
      position: relative;
      top: 47px;
      left: -30px;
    }

    /*状态高亮*/
    .status > div.clearfix > .left > .light {
      box-shadow: 0 0 0px 3px rgba(242, 171, 36, 0.6);
      background-color: #f2aa24;
      width: 12px;
      height: 12px;
      top: -22px;
    }

    .status > div > .left > .linelight {
      background-color: rgba(242, 171, 36, 0.8);
    }

    .status > div > .left > .none {
      background-color: #fff;
    }

    .status > div > .right {
      width: 130px;
      float: right;
      margin-top: 25px;
      color: #999;
      /*height: 90px;*/
    }

    .status > div > .center {
      margin: 0px 130px 0 60px;
      padding-top: 20px;
      font-size: 14px;
      color: #444;
      line-height: 22px;
      /*height: 90px;*/
    }

    .status .sm {
      font-size: 12px;
      color: #666;
    }


</style>

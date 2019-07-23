<template>
  <div class="message">
    <header>
      <span @click="back"><img src="../../assets/ic_back_1.png"></span>
      <div>{{title}}</div>
    </header>
    <div class="list" v-if="!message">
      <div class="prompt">
        <div class="msg"><img src="../../assets/message.png"></div>
        <div>暂时还没有消息</div>
      </div>
    </div>

    <div class="list" v-if="message">
      <div class="info clearfix" v-for="list in data">
        <div @click="to(list.params)" v-if='list.mt != 42 && list.mt != 43'>
          <div class="left"><img src="../../assets/mes.png"></div>
          <div class="right">{{list.ct}}</div>
          <div class="center">
            <div>{{list.msgTitle}}</div>
            <div class="tips">{{list.msg}}</div>
          </div>
        </div>

        <div @click="toTenant" v-else>
          <div class="left"><img src="../../assets/mes.png"></div>
          <div class="right">{{list.ct}}</div>
          <div class="center">
            <div>{{list.msgTitle}}</div>
            <div class="tips">{{list.msg}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {isiOS, baseUrl} from '../../../static/js/index.js'

  export default {
    name: 'message',
    data () {
      return {
        title: '消息',
        message: false,
        data: [],
        page: 1
      }
    },
    methods: {
      fetchData(url, type) {
        if (type == 1) {
          this.data = [];
        }
        //发送请求
        if (isiOS) {
          var s = JSON.stringify([url, 'messages']);
          window.webkit.messageHandlers.httpGetRequest.postMessage(s);
        } else {
          window.gidoorHttpJs.httpGetRequest(url, 'messages');
        }
      },
      back () {
        //返回键（左上角）
        if (isiOS) {
          window.webkit.messageHandlers.onBaackPress.postMessage(null);
        } else {
          window.gidoorJS.onBaackPress();
        }
      },
      to (params) {
        var order = params.orderNo;
        if (isiOS) {
          window.webkit.messageHandlers.showOrderDetail.postMessage(order);
        } else {
          window.GidoorCallerMsgJs.showOrderDetail(order);
        }
      },
      toTenant () {
        if (isiOS) {
          window.webkit.messageHandlers.showAccountAudit.postMessage(null);
        } else {
          window.GidoorCallerMsgJs.showAccountAudit();
        }
      }
    },
    created () {
      var self = this;
      window.messages = function (res) {
        if (isiOS) {
          res = JSON.parse(res);
        }
        if (res.code == 200) {
          if (res.data.length) {
            self.message = true;
            //对数据进行处理
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].ct = res.data[i].ct.substr(5, 11);
            }
            self.data = self.data.concat(res.data);
          }
        } else if (res.code == 401) {
          if (res.msg) {
            //提示信息
            if (isiOS) {
              window.webkit.messageHandlers.showToast.postMessage(res.msg);
            } else {
              window.gidoorJS.showToast(res.msg);
            }
          }
          //跳转到登录页面
          if (isiOS) {
            window.webkit.messageHandlers.toLogin.postMessage(null);
          } else {
            window.gidoorJS.toLogin();
          }
        } else {
          if (res.msg) {
            if (isiOS) {
              window.webkit.messageHandlers.showToast.postMessage(res.msg);
            } else {
              window.gidoorJS.showToast(res.msg);
            }
          }
        }
      }

      var url = baseUrl + 'pushMessage/list';
      this.fetchData(url, 1);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hid {
    height: 500px;
    overflow: scroll;
  }

  .hid div {
    color: #f90;
    text-align: center;
  }

  .message {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  header {
    box-shadow: 0px -3px 10px 4px #aaa;
  }

  .prompt {
    text-align: center;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
  }

  .prompt .msg img {
    width: 150px;
    margin-bottom: 20px;
  }

  .list {
    margin-top: 0px;
    width: 100%;
    overflow: scroll;
  }

  .info {
    border-bottom: 1px solid rgb(221, 221, 221);
    line-height: 50px;
    font-size: 12px;
  }

  .info .left {
    width: 50px;
    height: 60px;
    float: left;
  }

  .info .left img {
    width: 26px;
    height: 26px;
    margin: 12px;
  }

  .info .right {
    width: 75px;
    height: 60px;
    float: right;
    line-height: 40px;
    color: #aaa;
  }

  .info .center {
    font-size: 14px;
    line-height: 40px;
    color: #444;
  }

  .info .tips {
    line-height: 12px;
    font-size: 12px;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 12px;
  }

</style>

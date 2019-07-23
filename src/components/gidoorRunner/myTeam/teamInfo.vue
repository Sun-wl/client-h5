<template>
  <div class="teamInfo">
    <header>
      <img @click="back" src="../../../assets/toback.png">
      <div>{{title}}</div>
      <div class="padding"></div>
    </header>
    <div class="list">
      <div class="list-item">
        <div class="list-item-text">公司名称：{{teamInfo.companyName}}</div>
      </div>
      <div class="list-item">
        <div class="list-item-text">团队名称：{{teamInfo.teamName}}</div>
      </div>
      <div class="list-item">
        <div class="list-item-text">团队人数：{{teamInfo.teamSize}}</div>
      </div>
      <div class="list-item">
        <div class="list-item-text">团队联系人：{{teamInfo.contact}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {baseUrl} from '../../../../static/js/index.js';
  export default {
    name: 'teamInfo',
    data () {
      return {
        title: '团队信息',
        teamInfo:{}
      }
    },
    methods: {
      back () {
        //返回键（左上角）
        window.gidoorJS.finishActivity();
      }
    },
    created(){
      var self = this;
      var url = baseUrl + "memberTeamApply/details";
      window.teamInfo = function (res) {
        if (res.code == 200) {
          self.teamInfo = res.data;
        }else if(res.code == 100){
          //审核中
          self.$router.replace('/teamApply3/' + res.data.name);
        }else if(res.code == 300){
          //未提交过申请
          self.$router.replace('/teamApply1/1');
        }else if (res.code == 401) {
          if (res.msg) {
            window.gidoorJS.showToast(res.msg);
          }
          //跳转到登录页面
          window.gidoorJS.toLogin();
        } else {
          if (res.msg) {
            window.gidoorJS.showToast(res.msg);
          }
          //self.back();
        }
      }
      window.gidoorHttpJs.httpGetRequest(url, 'teamInfo');
    }
  }
</script>


<style scoped>

  .teamInfo{
    width:100%;
    height:100%;
    background:#eee;
    padding-top:70px;
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

  .list{
    background:#fff;
    padding:0;
  }
</style>

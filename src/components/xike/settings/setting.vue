<template>
  <div class="setting">
    <header>
      <span @click="back"><img src="../../../assets/ic_back_1.png"></span>
      <div>设置</div>
    </header>
    <div class="list">
      <div class="list-item">
        <router-link to='/setting/inviteCode'>
          <div class="list-item-text">填写邀请码</div>
          <img src="../../../assets/to.png" alt="">
        </router-link>
      </div>
      <div class="list-item">
        <div to="/" @click="cellphone">
          <div class="list-item-text">联系客服</div>
          <img src="../../../assets/to.png" alt="">
        </div>
      </div>
      <div class="list-item">
        <router-link to="/setting/legalProvision">
          <div class="list-item-text">法律条款</div>
          <img src="../../../assets/to.png" alt="">
        </router-link>
      </div>
      <div class="list-item">
        <router-link to="/setting/aboutUs">
          <div class="list-item-text">关于我们</div>
          <img src="../../../assets/to.png" alt="">
        </router-link>
      </div>
      <div class="list-item">
        <div @click="signUp">
          <div class="list-item-text">退出登录</div>
          <img src="../../../assets/to.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {isiOS} from '../../../../static/js/index.js'

  export default {
    name: 'setting',
    data () {
      return {
        title: '设置'
      }
    },
    methods: {
      signUp () {
        //退出登录
        if (isiOS) {
          window.webkit.messageHandlers.logout.postMessage(null);
        }else{
          window.gidoorJS.logout();
        }

      },
      cellphone () {
        //拨打电话
        if (isiOS) {
          window.webkit.messageHandlers.toDialActivity.postMessage('021-64454365');
        }else{
          window.gidoorJS.toDialActivity('021-64454365');
        }

      },
      back () {
        //返回键（左上角）
        if (isiOS) {
          window.webkit.messageHandlers.finishActivity.postMessage(null);
        }else{
          window.gidoorJS.finishActivity();
        }
      }
    }
  }
</script>


<style scoped>
  .setting {
    overflow: hidden;
  }
</style>

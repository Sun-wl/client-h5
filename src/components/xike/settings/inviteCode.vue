<template>
  <div class="inviteCode">
    <header>
      <router-link to='/setting'><img src="../../../assets/ic_back_1.png"></router-link>
      <div>填写邀请码</div>
    </header>
    <div class="list">
      <div class='invite-img'>
        <img src="../../../assets/xhdpi.png">
      </div>
      <div class="list-item">
        <input class="code" type="text" v-model.trim="codeVal" placeholder="请输入您的邀请码" @input="change">
      </div>
    </div>
    <div class="submit-btn">
      <button v-if="btn" @click="submit">提交</button>
      <button v-if="!btn" disabled>提交</button>
    </div>
  </div>
</template>

<script>
  import {isiOS} from '../../../../static/js/index.js'

  export default {
    name: 'inviteCode',
    data() {
      return {
        btn: false,
        codeVal: '',
        title: '填写邀请码'
      }
    },
    methods: {
      change () {
        if (this.codeVal.length == 11) {
          this.btn = true;
        } else {
          this.btn = false;
        }
      },
      submit () {
        //上传邀请码
        if(/^1[345678]\d{9}$/.test(this.codeVal)){
          if (isiOS) {
            window.webkit.messageHandlers.uploadInviteCode.postMessage(this.codeVal);
          }else{
            window.SettingJS.uploadInviteCode(this.codeVal);
          }
        }else{
          if (isiOS) {
            window.webkit.messageHandlers.showToast.postMessage('请输入正确的邀请码');
          }else{
            window.gidoorJS.showToast('请输入正确的邀请码');
          }
        }



      }
    }
  }
</script>

<style scoped>
  .list {
    padding-top: 85px;
  }

  .inviteCode {
    overflow: hidden;
  }

  .list .list-item {
    margin-top: 10px;
    border-top: 1px solid #eee;
  }

  input::-ms-input-placeholder {
    text-align: center;
  }

  input::-webkit-input-placeholder {
    text-align: center;
  }

</style>

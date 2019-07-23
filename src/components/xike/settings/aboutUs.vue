<template>
  <div class="about">
    <header>
      <router-link to='/setting'><img src="../../../assets/ic_back_1.png"></router-link>
      <div>{{title}}</div>
    </header>
    <div class="list">
      <div class="logo"><img src="../../../assets/logo-06.png" alt=""></div>
      <p class="about-text">当前版本</p>
      <p class="version">{{version}}</p>
      <!-- <div class="list-item">
         <a href="">
              <div class="list-item-text">检查更新</div>
              <img src="../../../assets/to.png" alt="">
          </a>
      </div>
      <div class="list-item">
          <router-link to="/setting/aboutUs/feedback">
              <div class="list-item-text">吐槽反馈</div>
              <img src="../../../assets/to.png" alt="">
          </router-link>
      </div>
      <div class="list-item">
          <a href="">
              <div class="list-item-text">给我五星好评</div>
              <img src="../../../assets/to.png" alt="">
          </a>
      </div> -->
    </div>
  </div>
</template>

<script>
  import {isiOS} from '../../../../static/js/index.js'

  export default {
    name: 'aboutUs',
    data () {
      return {
        title: '关于我们',
        version: '1.0.0'
      }
    },
    beforeMount () {
      //版本号
      var self = this;
      window.versionName = function (versionName) {
        self.version = versionName;
      }
      if (isiOS) {
        window.webkit.messageHandlers.versionName.postMessage(null);
      }else{
        this.version = window.gidoorJS.versionName();
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .version {
    text-align: center;
  }

  .about {
    overflow: hidden;
  }

  .logo {
    text-align: center;
  }

  .logo img {
    width: 90px;
    height: 90px;
    margin-top: 30px;
  }
</style>

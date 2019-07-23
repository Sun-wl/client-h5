<template>
  <div class="legalProvision">
    <header>
      <router-link to='/setting'><img src="../../../assets/ic_back_1.png"></router-link>
      <div>{{title}}</div>
    </header>
    <div class="list">
      <div class="list-item">
        <router-link to="/setting/legalProvision/registerProvision/2">
          <div class="list-item-text">注册协议</div>
          <img src="../../../assets/to.png" alt="">
        </router-link>
      </div>
      <div class="list-item">
        <router-link to="/setting/legalProvision/serviceProvision/2">
          <div class="list-item-text">服务协议</div>
          <img src="../../../assets/to.png" alt="">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'legalProvision',
    data () {
      return {
        title: '法律条款',
      }

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .legalProvision {
    overflow: hidden;
  }
</style>

<template>
  <div class="hello">
    <h1>/setting 设置</h1>
    <h1>/freight 运费标准</h1>
    <div>{{msg}}</div>
  </div>
</template>

<script>

  export default {
    name: 'childDetails',
    data () {
      return {
        msg: '网站开发中......'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    margin: 100px 50px;
  }
</style>

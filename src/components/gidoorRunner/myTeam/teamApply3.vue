<template>
  <div class="teamApply">
    <header>
      <img @click="back" src="../../../assets/toback.png">
      <div>{{title}}</div>
    </header>
    <div class='teamContent'>
      <p>已向【{{companyName}}】发起申请</p>
      <p class="green">正在审核中</p>
    </div>
    <router-link to='/teamApply1/2'>
      <button>修改公司</button>
    </router-link>
  </div>
</template>

<script>

  export default {
    name: 'teamApply3',
    data () {
      return {
        title: '入团申请',
        type:1,
        companyName:''
      }
    },
    methods: {
      back () {
        //返回键（左上角）
        window.gidoorJS.finishActivity();
      }
    },
    created() {
      this.companyName = this.$route.params.companyName;
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

  .teamApply{
    text-align:center;
    padding-top:200px;
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

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .teamContent{
    font-size:18px;
    padding:0 20px;
  }
  .teamContent p.green{
    color:green;
    margin-top:30px;
  }

  button {
    width: 270px;
    height: 50px;
    line-height: 50px;
    border-radius: 50px;
    border: none;
    outline-style: none;
    font-size: 18px;
    color: #fff;
    background-color: #f2aa24;
    box-shadow: 0px 0px 5px 2px rgba(5, 5, 5, .2);
    position:absolute;
    bottom:100px;
    left:50%;
    margin-left:-135px;
  }

</style>

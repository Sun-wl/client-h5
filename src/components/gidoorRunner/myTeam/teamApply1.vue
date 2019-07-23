<template>
  <div class="teamApply">
    <header>
      <img src="../../../assets/toback.png" @click="back">
      <div>{{title}}</div>
    </header>
    <div class='teamContent'>
      <span>选择公司</span>
      <select v-model="companyId">
        <option value="">---请选择---</option>
        <option v-for='company in companys' :value="company.id">{{company.name}}</option>
      </select>
    </div>
    <button @click="to">下一步</button>

  </div>
</template>

<script>
  import {baseUrl} from '../../../../static/js/index.js';
  export default {
    name: 'teamApply1',
    data () {
      return {
        title: '入团申请',
        type:1,
        companyId:'',
        companyName:'',
        companys:[]
      }
    },
    methods: {
      back () {
        //返回键（左上角）
        if(this.type == 1){
          window.gidoorJS.finishActivity();
        }else{
          window.gidoorJS.onBackPressed();
        }
      },
      to () {
        if(!this.companyId){
          window.gidoorJS.showToast('请选择公司');
          return
        }
        var self = this;
        this.companys.forEach(function(item,ind){
          if(item.id == self.companyId){
            self.companyName = item.name;
          }
        })
        this.$router.push('/teamApply2/'+ this.companyName + '/' + this.companyId);
      }
    },
    created() {
      //type = 1,无正在审核的公司  type = 2,有正在审核的公司
      this.type = this.$route.params.type;
      var self = this;
      var url = baseUrl + "memberTeamApply/companyList";
      window.company = function (res) {
        if (res.code == 200) {
          self.companys = res.data;
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
        }
      }
      window.gidoorHttpJs.httpGetRequest(url, 'company');
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
    width:100%;
    font-size:18px;
    padding:0 20px;
    box-sizing:border-box;
    display:table;
  }
  .teamContent span{
    width:80px;
    line-height:40px;
    display:table-cell;
  }
  .teamContent select{
    display:table-cell;
    width:95%;
    margin-left:5px;
    height:40px;
    border-radius:5px;
    border:1px solid #ddd;
    background:#fff;
    font-size:16px;
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

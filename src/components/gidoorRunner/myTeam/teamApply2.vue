<template>
  <div class="teamApply">
    <header>
      <img @click="back" src="../../../assets/toback.png">
      <div>{{title}}</div>
    </header>
    <div class='teamContent'>
      [{{runnerName}}]自愿加入“[{{companyName}}]”配送团队，接受“[{{companyName}}]”作为“[{{runnerName}}]”配送团队的管理者，服从团队管理规则。“准道佣兵APP”每个自然月结算一次佣金，[{{runnerName}}]通过本平台上完成的配送订单佣金计入该配送团队管理者的收益中，由管理者根据双方的线下约定进行分成，[{{runnerName}}]作为用户在“准道佣兵APP”上钱包功能中不显示此订单的佣金金额。若[{{runnerName}}]申请退出“[{{companyName}}]”配送团队，应提前30日告知“准道佣兵APP”，经本平台和配送团队管理者核实后，该退出于[{{companyName}}]申请日之后的第30日生效；若[{{runnerName}}]被动退出“[{{companyName}}]”配送团队的，该退出自配送团队管理者发生指令当日生效。退出生效日之前的佣金仍按照之前结算规则操作。
    </div>
    <div class="btns">
      <button class="btn1" @click="back">不同意</button>
      <button class="btn2" @click="agree">同意加入</button>
    </div>

  </div>
</template>

<script>
  import {baseUrl} from '../../../../static/js/index.js';
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'teamApply2',
    data () {
      return {
        title: '入团申请',
        runnerName:'',
        companyName:'',
        companyId:''
      }
    },
    methods: {
      back () {
        //返回键（左上角）
        window.gidoorJS.onBackPressed();
      },
      agree () {
        var url1 = baseUrl + "memberTeamApply/details";
        window.gidoorHttpJs.httpGetRequest(url1, 'teamInfo');
        console.log('agree')
      },
      apply(){
        console.log('apply1')
        var self = this;
        var url = baseUrl + 'memberTeamApply/addOrUpdate';
        console.log(url)
        var jsonData = [{"key":"entity.companyId","value":self.companyId}];
        console.log(jsonData)
        jsonData = JSON.stringify(jsonData);
        console.log(jsonData)
        window.gidoorHttpJs.httpPostRequest(url, jsonData, 'toTeamApply3');
        console.log('apply2')
      }
    },
    created() {
      this.companyName = this.$route.params.companyName;
      this.companyId = this.$route.params.companyId;
      this.runnerName = window.gidoorJS.getMemberName();

      var self = this;
      window.toTeamApply3 = function(res){
        console.log(res)
        if(res.code == 200){
          self.$router.push('/teamApply3/' + self.companyName);
        }else if (res.code == 401) {
          if (res.msg) {
            window.gidoorJS.showToast(res.msg);
          }
          window.gidoorJS.toLogin();
        } else {
          if (res.msg) {
            window.gidoorJS.showToast(res.msg);
          }
        }

      }

      window.teamInfo = function (res) {
        console.log(res)
        if(res.code == 300){
          //未提交过申请
          console.log(1)
          self.apply();
        }else if(res.code == 100){
          //审核中
          MessageBox.confirm('已经申请加入['+ res.data.name +']，是否改为['+ self.companyName +']?','').then(action => {
            self.apply();
          });
        }else if (res.code == 200) {
          //self.teamInfo = res.data;
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
    margin:60px 0 80px 0;
    font-size:16px;
    padding:20px;
    text-indent:4ex;
    letter-spacing: 1px;
    line-height:35px;
  }

  .btns{
    width:100%;
    padding:5px 30px;
    background:#fff;
    box-sizing:border-box;
    border-top:1px solid #ddd;
    position: fixed;
    bottom:0;
    left:0;
  }
  button {
    width: 45%;
    height: 50px;
    border-radius: 50px;
    outline-style: none;
    font-size: 18px;
    color: #fff;
    //box-shadow: 0px 0px 5px 2px rgba(5, 5, 5, .2);
  }
  .btns .btn1{
    background:#fff;
    color:#999;
    border:1px solid #ccc;
    float:left;
  }
  .btns .btn2{
    background:#f2aa24;
    border:1px solid #f2aa24;
    float:right;
  }

</style>

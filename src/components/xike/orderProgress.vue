<template>
  <div class="orderProgress">
    <header>
      <div>{{title}}</div>
    </header>
    <div class="content">
      <div class="amap">
        <el-amap class="amap-demo" vid="amapDemo" :dragEnable="dragEnable" :center="center" :zoom="zoom">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :content="marker.content"
                          :draggable="marker.draggable" :events="marker.events" :visible="marker.visible">
          </el-amap-marker>
        </el-amap>
      </div>
      <div class="info" v-if='info'>
        <a href='javascript:return 0'><img class='head' src="../../assets/head.png" alt=""></a>
        <p>{{name}}</p>
        <a :href=" 'tel:' + mobile "><img class='tel' src="../../assets/tel.png" alt=""></a>
        <p>联系佣兵</p>
      </div>
    </div>

  </div>
</template>

<script>
  import {baseUrl} from '../../../static/js/index.js'

  export default {
    name: 'orderProgress',
    data () {
      return {
        title: '订单进度',
        orderNo:'',
        name:'',
        mobile:'',
        orderStatus:[],
        info:false,
        nowStatus:'',
        //地图配置
        center: [121.5273285, 31.21515044],
        zoom: 14,
        dragEnable: true,
        jogEnable: false,
        loaded: true,
        markers: [  //取点 收点 定位点
          {
            position: [121.5273285, 31.21355054],
            visible: true,
            draggable: false,
            content: '<img style="height:35px;" src="./static/qu.png">',
          },
          {
            position: [121.5273285, 31.21525044],
            visible: true,
            draggable: false,
            content: '<img style="height:35px;"  src="./static/shou.png">',
          },
          {
            position: [121.5273285, 31.21625044],
            visible: true,
            draggable: false,
            content: '<img style="height:35px;"  src="./static/men.png">',
          }
        ]
      }
    },
    methods: {
      phone(){
        window.location.href = "tel:" + this.mobile;
      }
    },
    created () {
      this.orderNo = this.$route.params.orderNo;
      this.$http.jsonp(baseUrl + 'order/speed/list/' + this.orderNo).then(function(res){
        //console.log(1,res)
        if(res.status == 200){
          if(res.data.code == 200){
            this.orderStatus = res.data.data;
            if(this.orderStatus[0].status == 2 || this.orderStatus[0].status == 3){
              this.info = true;
            }
            switch(this.orderStatus[0].status){
              case 1:this.nowStatus = '待接单';break;
              case 2:this.nowStatus = '待提货';break;
              case 3:this.nowStatus = '待签收';break;
              case 7:this.nowStatus = '已完成';break;
              case 5:this.nowStatus = '已取消';break;
              case 8:this.nowStatus = '异常单';break;
            }
            this.title = '订单进度（' + this.nowStatus + '）';

            if(this.orderStatus.length){
              this.$http.jsonp(baseUrl + 'runner/order/runner/loc/' + this.orderNo).then(function(res){
                //console.log(res)
                if(res.status == 200){
                  if(res.data.code == 200){
                    this.mapData = res.data.data;
                    this.name = this.mapData.runnerName;
                    this.mobile = this.mapData.runnerMobile;
                    this.markers[0].position = this.mapData.tenantLoc.split(",");
                    this.markers[1].position = this.mapData.memberLoc.split(",");
                    this.markers[2].position = this.mapData.runnerLoc.split(",");
                    if(this.info){
                      this.center = this.markers[2].position;
                      this.markers[2].content = '<div class="position:relative;">\
                                                    <img style="height:35px;"  src="./static/men.png">\
                                                    <div style="width:170px; height:50px; position:absolute; bottom:30px; left:-73px;">\
                                                      <img src="./static/box.png" alt="" style="width:100%; height:100%;">\
                                                      <p style="width:100%; height:45px; line-height:45px; text-align:center; position:absolute; left:0; top:0;">' + this.mapData.describe + '</p>\
                                                    </div>\
                                                  </div>';
                    }else{
                      this.center = this.markers[0].position;
                      this.markers[2].content = '';
                      this.markers[2].visible = false;
                    }

                  }else{
                    alert(res.data.msg);
                    this.markers[0].visible = false;
                    this.markers[1].visible = false;
                    this.markers[2].visible = false;
                  }
                }
              }, function(res){
                // 响应错误回调
                //console.log(res)
                alert("请求错误");
                this.markers[0].visible = false;
                this.markers[1].visible = false;
                this.markers[2].visible = false;
              });
            }


          }else{
            alert(res.data.msg);
          }
        }
      }, function(res){
        // 响应错误回调
        //console.log(2,res)
        alert("请求错误");
        this.markers[0].visible = false;
        this.markers[1].visible = false;
        this.markers[2].visible = false;
      });




    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orderProgress {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  header {
    box-shadow: 0px -3px 10px 4px #aaa;
  }
  .content{
    width:100%;
    height:100%;
  }
  .amap {
    width: 100%;
    height: 100%;
  }

  .info{
    width:90%;
    height:70px;
    padding:0 10px;
    box-sizing:border-box;
    position:fixed;
    bottom:0;
    left:5%;
    box-shadow: 0px 0px 5px 2px rgba(5, 5, 5, .2);
    background:#fff;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    z-index:999;
    display:flex;
  }
  .info a{
    flex:1;
    height:70px;
    font-size:0;
    text-align:right;
  }
  .info a img.head{
    width:50px;
    margin-top:10px;
  }
  .info a img.tel{
    width:30px;
    margin-top:20px;
  }
  .info p{
    flex:1;
    font-size:14px;
    height:70px;
    padding-top:25px;
    padding-left:10px;
    word-break: break-word;
  }

  /*.status{
    width:100%;
    padding:50px;
  }

  .statusEvery{
    width:100%;
  }
  .statusEvery.now{
    color:#1DB498;
  }
  .statusEvery .line{
    width:100%;
    height:50px;
    border-left:2px solid #ccc;
  }
  .statusEvery.now .line{
    border-left:2px solid #1DB498;
  }
  .statusEvery .statusCtn{
    width:100%;
    font-size:14px;
    margin-left:-4px;
    display:table;
  }
  .statusEvery .statusCtn .circle{
    width:10px;
    display:table-cell;
  }
  .statusEvery .statusCtn .circle div{
    width:10px;
    height:10px;
    background:#ccc;
    border-radius:50%;
    vertical-align:middle;
  }
  .statusEvery.now .statusCtn .circle div{
    background:#1DB498;
  }
  .statusEvery .statusCtn .text{
    padding:0 10px;
    width:150px;
    display:table-cell;
  }
  .statusEvery .statusCtn .time{
    display:table-cell;
  }*/



</style>

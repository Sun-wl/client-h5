<template>
  <div class="freight">
    <header>
      <span @click="back"><img src="../../assets/delete.png"></span>
      <div>运费标准</div>
    </header>
    <div class="tb">
      <div class="h3"><span></span>根据单量基础价格</div>
      <table>
        <tr>
          <th>单量（每月）</th>
          <th>价格</th>
        </tr>
        <tr>
          <td>≥200</td>
          <td>3.5元</td>
        </tr>
        <tr>
          <td><200</td>
          <td>4.0元</td>
        </tr>
      </table>
      <div class="h3"><span></span>距离加价</div>
      <table>
        <tr>
          <th>距离</th>
          <th>价格</th>
        </tr>
        <tr>
          <td>0km < d ≤ 1km</td>
          <td>不加价</td>
        </tr>
        <tr>
          <td>1km < d ≤ 10km</td>
          <td>每增1km加3元</td>
        </tr>
      </table>
      <div class="h3"><span></span>重量加价</div>
      <table>
        <tr>
          <th>重量</th>
          <th>价格</th>
        </tr>
        <tr>
          <td>0kg < w ≤ 5kg</td>
          <td>不加价</td>
        </tr>
        <tr>
          <td>5kg < w ≤ 10kg</td>
          <td>每增1kg加2元</td>
        </tr>
      </table>
      <div class="h3"><span></span>时效加价</div>
      <table>
        <tr>
          <th>送达时间</th>
          <th>服务费</th>
        </tr>
        <tr>
          <td>≤30分钟（限距离≤2.5km）</td>
          <td>3元</td>
        </tr>
        <tr>
          <td>≤60分钟（限距离≤5km）</td>
          <td>2元</td>
        </tr>
        <tr>
          <td>＞60分钟</td>
          <td>不加价</td>
        </tr>
      </table>
      <div class="h3"><span></span>夜间加价</div>
      <table>
        <tr>
          <th>时间段</th>
          <th>服务费</th>
        </tr>
        <tr>
          <td>00:00 ~ 07:00</td>
          <td>8元</td>
        </tr>
        <tr>
          <td>22:00 ~ 24:00</td>
          <td>4元</td>
        </tr>
      </table>
    </div>
    <div class="tips">
      <p class="p1"><span></span>跨江费：黄浦江加6元</p>
      <p class="p2"><span></span>配送时效：5公里以内60分钟送达，每增加5公里增加30分钟。</p>
      <p class="p3"><span></span>配总费用=基础配送费用（根据订单量）+超距加价+超重加价+服务费+过江费</p>
    </div>
    <div class="desc">
      <div class="h3"><span></span>溢价说明</div>
      <div class="p">
        <p>溢价是准道西客为了保证良好的服务体验，根据供需情况动态调整价格的策略</p>
        <p>天气、交通高峰时段、特殊节假日等原因可能造成溢价；</p>
      </div>
      <div class="h3"><span></span>倍数溢价运算规则</div>
      <div class="p">
        <p>溢价金额 = 订单优惠前的总金额（不包含小费）x（溢价倍数-1）。（遇小数向上取整）</p>
      </div>
      <div class="h3"><span></span>取消单扣款说明</div>
      <div class="p">
        <p>1.若用户在准道西客佣兵接单后1分钟内取消订单，不会产生上门费用。</p>
        <p>2.若用户在准道西客佣兵接单后1～15分钟内取消订单，则扣除5元上门费用，取消费用将从您的订单费用中扣除，若实际支付金额少于5元，将扣除全部支付金额。</p>
        <p>3.若用户在准道西客佣兵接单后15分钟后取消订单，因准道西客佣兵未及时上门取货，所以不会产生上门费用。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {isiOS} from '../../../static/js/index.js'

  export default {
    name: 'freight',
    data () {
      return {
        msg: 'freight'
      }
    },
    methods: {
      back () {
        //返回键（左上角）
        if (isiOS) {
          window.webkit.messageHandlers.onBaackPress.postMessage(null);
        }else{
          window.gidoorJS.onBaackPress();
        }
      },
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .freight {
    margin-bottom: 40px;
  }

  .tb {
    margin-top: 60px;
  }

  .tb .h3 {
    line-height: 40px;
    margin-left: 30px;
    font-size: 14px;
    color: #444;
    position: relative;
  }

  .tb .h3 span {
    position: absolute;
    display: block;
    width: 3px;
    height: 13px;
    background-color: #14b294;
    bottom: 13px;
    left: -12px;

  }

  .tb table {
    width: 100%;
    border-collapse: 0;
    border-spacing: 0;
    text-align: center;
    border-collapse: separate;
  }

  .tb table tr {
    line-height: 32px;
    color: #666;
  }

  .tb table th {
    background-color: #eee;
    border-bottom: 1px solid #eee;
    width: 50%;
  }

  .tb table td {
    border-bottom: 1px solid #eee;
  }

  .tips {
    width: 100%;
    /*height: 186px;*/
    color: #666;
    margin: 1px 0;
  }

  .tips p span {
    position: absolute;
    display: block;
    width: 6px;
    height: 6px;
    background-color: #14b294;
    transform: rotate(45deg);
    top: 9px;
    left: -17px;
  }

  .tips p {
    margin-left: 40px;
    margin-right: 20px;
    line-height: 25px;
  }

  .tips .p1, .tips .p2, .tips .p3 {
    position: relative;
  }

  .desc .h3 {
    color: #666;
    line-height: 40px;
    padding-left: 30px;
    font-size: 14px;
    color: #444;
    position: relative;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    margin-top: 10px;
  }

  .desc .h3 span {
    position: absolute;
    display: block;
    width: 3px;
    height: 13px;
    background-color: #14b294;
    bottom: 13px;
    left: 20px;

  }

  .desc .p {
    margin-left: 35px;
    line-height: 25px;
    color: #666;
    margin-right: 20px;
  }

</style>

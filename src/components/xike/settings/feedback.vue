<template>
  <div class="feedback">
    <div class="list feedback-type">
      <p class="feedback-text">选择反馈类型</p>
      <div class="list-item" @click="show(1)">
        <div class="list-item-text">产品建议</div>
        <img class="activeNo-img" v-if="!activePro" src="../../../assets/activeNo.png" alt="">
        <img class="active-img " v-if="activePro" src="../../../assets/active.png" alt="">
      </div>
      <div class="list-item" @click="show(2)">
        <div class="list-item-text">程序错误</div>
        <img class="activeNo-img" v-if="!activeErr" src="../../../assets/activeNo.png" alt="">
        <img class="active-img" v-if="activeErr" src="../../../assets/active.png" alt="">
      </div>
    </div>
    <div class="list">
      <p class="feedback-text">选择反馈类型</p>
      <div class="list-item feedback-list-item">
        <textarea class="feedback-ctn" @input="change" placeholder="请输入您的相关反馈意见，您的意见是我们前进的动力，我们将为您不断改进。" v-model="areaVal"></textarea>
      </div>
    </div>
    <div class="submit-btn">
      <button v-if='btn'>提交</button>
      <button v-if='!btn' disabled>提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'feedback',
    data () {
      return {
        activePro: false,
        activeErr: false,
        btn: false,
        areaVal: "",
      }
    },
    methods: {
      show (num) {
        if (num == 1) {
          this.activePro = true;
          this.activeErr = false;
        } else if (num == 2) {
          this.activePro = false;
          this.activeErr = true;
        }
        if (this.areaVal) {
          this.btn = true;
        }
      },
      change () {
        if (this.areaVal && (this.activePro || this.activeErr)) {
          //让btn可用
          this.btn = true;
        } else {
          this.btn = false;
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

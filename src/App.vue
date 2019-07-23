<template>
  <div id="app" class='app'>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app',
  data () {
  	return {
  		title: '首页'
  	}
  },
}
</script>

<style>
.title {
	text-align: center;
	line-height: 40px;
}
</style>

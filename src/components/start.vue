<template>
  <div>
  	<div class="title">
  		<h1>主选项</h1>
  	</div>
	  <br>
  	<div class="choose" v-show="true">
					<x-button link="daily" class="button" :gradients="['#1D62F0', '#19D5FD']">每日运势</x-button>
					<x-button link="spread" class="button" :gradients="['#1D62F0', '#19D5FD']">抽牌机！</x-button>
					<x-button link="about" class="button" :gradients="['#1D62F0', '#19D5FD']">关于</x-button>
					<x-button link="disclaimer" class="button" :gradients="['#1D62F0', '#19D5FD']">免责声明</x-button>
  	</div>
    <divider>Go Back</divider>
    <div id="leave" @click="leaveHandler">
      <x-icon type="ios-arrow-thin-left" size="150"></x-icon>
    </div>
  </div>
</template>

<script>
import {} from 'vux'

export default {
  components: {
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  methods:{
    leaveHandler(){
      history.back();
    }
  }
}
</script>

<style scoped>

</style>

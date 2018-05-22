<template>
  <div class="disclaim">
  	<div class="title">
      <h1>免责声明</h1>
    </div>
    <div class="cotents">
      <div>
      <strong>塔罗机器人</strong> 所有图文均来自国内外公开引用资源，所有图文版权均归原作者及其网站所有。
      <br>
        若原作者对本站作品版权归属存有异议，请马上告知。
      </div>
      <br>
      <i>
        占卜内容仅供参考，本站不承担任何后续责任。
      </i>
    </div>
    <divider>Go Back</divider>
    <div id="leave" @click="leaveHandler">
      <x-icon type="ios-arrow-thin-left" size="150"></x-icon>
    </div>
  </div>
</template>

<script>
import {  } from 'vux'

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

.cotents{
  text-align: center;
  border:solid gray;

  padding:30px;
}

</style>

<template>
  <div>
    <div class="title">
      <img class="logo" src="../assets/tarot_logo.jpg">
      <transition enter-active-class="animated wobble" leave-active-class="animated wobble">
        <h1> 塔罗机器人 </h1>
      </transition>
    </div>
    <divider>Let's Start From Here</divider>
    <div class="start">
      <x-button link="start" class="button" :gradients="['#FF2719', '#FF61AD']">开始使用</x-button>
    </div>
  </div>
</template>

<script>
import { XButton,Divider } from 'vux'

export default {
  components: {
    XButton,Divider
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  created() {
    // 检查是否安装星云钱包
    if (typeof webExtensionWallet === 'undefined') {
      alert('星云钱包环境未运行，请安装钱包插件或开启')
    } else {
      console.info('星云钱包环境运行成功')
    }
  }
}
</script>

<style scoped>

@import  '../node_modules/animate.css/animate.css'

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.logo {
  border-radius: 99px;
  width: 150px;
  height: 150px
}

.start {
  margin:40px;
}
</style>

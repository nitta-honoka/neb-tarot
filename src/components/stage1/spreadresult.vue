<template>
  <div class="result">
  	<div class="title">
  		<h1>抽牌机</h1>
  	</div>
    <transition name="v2">
    <div class="result" v-if="draw">
        <div v-for="c in each" class="card">
            <divider>Tarot</divider>
            <h3 class="card-name">{{c.card}}</h3>
            <img class="card-img" :src="c.path" :style="c.style">
        </div>
      <flexbox class="save" v-if="number !== -1">
        <flexbox-item>
          <x-input placeholder="请输入昵称，默认为钱包地址" v-model="nickName" />
        </flexbox-item>
        <flexbox-item :span="4">
          <x-button type="primary" plain @click.native="onSaveCard">保存</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    </transition>
    <div class="choose">
      <div id="enter" v-if="!draw && number !== -1">
        <h2>您想要抽 {{ number }} 张牌...</h2>
        <p>请冥想并按下按钮...</p>
        <x-icon @click="tEnd" type="ios-circle-filled" size="150"></x-icon>
      </div>
      <div class="enter" v-else-if="!draw && number === -1">
        <h2>搜索上次抽牌结果</h2>
        <x-input title="昵称" placeholder="请输入昵称，默认为钱包地址" v-model="nickName" />
        <x-button type="primary" plain @click.native="onSearchCard">搜索</x-button>
      </div>
      <divider>{{msg}}</divider>
      <div id="leave" @click="leaveHandler">
        <x-icon type="ios-arrow-thin-left" size="150"></x-icon>
      </div>
    </div>
  </div>
</template>

<script>
import NebPay from 'nebpay.js'
const nebPay = new NebPay()
// const nebTo = 'n1bs9seJ2QtqY7w28MkRTUkosciEwgCD4Fo' // testnet
const nebTo = 'n1Pgz5NeWd67ukEpw5a5Jzt1Gb4TM4c49GY' // mainnet
// const dappAddr = 'n1im4HkwPoostAN2W15Fd9YvCzRtwb2RMJL' // testnet
const dappAddr = 'n1vunvrqXjLw15PUGNcsk6xG5yrvXV4LCPr' // mainnet
const mainnetUrl = "https://pay.nebulas.io/api/mainnet/pay"
const testnetUrl = "https://pay.nebulas.io/api/pay"

let s_result = require('./draw.js').s_result;
export default {
  components: {
  },
  data () {
    return {
      msg:"Choose One",
      number:0,
      time:0,
      draw:false,
      path:'/static/tarot/',
      mean:'',
      card:'',
      style:'',
      each:[],
      nickName: ''
    }
  },
  updated(){
    this.initial();
  },
  mounted(){
    this.initial();
  },
  methods:{
    initial(){
      let num = this.$route.params.num;
      if(num==undefined) return;
      if(num!=1 && num!=3 && num!=5 && num!=-1){
        alert("Not Allow to Access!")
        history.go(-1);
        return
      }
      this.number = num;
    },
    onSaveCard(e) {
      const self = this
      const tarot = this.each
      const callFunction = 'save'
      const callArgs = `["${this.nickName || ''}", ${JSON.stringify(tarot)}]`
      nebPay.call(dappAddr, '0', callFunction, callArgs, {
        callback: mainnetUrl,
        listener: function (params) {
          if (params.txhash) {
            self.$toasted.success('保存成功，您可通过昵称搜索上次抽卡的结果')
          } else {
            self.$toasted.error('已终止交易，抽卡结果未能成功上链', {
              action: {
                text: '重新保存',
                onClick: () => self.onSaveCard(e)
              }
            })
          }
        }
      })
    },
    onSearchCard(e) {
      const self = this
      const callFunc = 'get'
      const callArgs = `["${this.nickName || ''}"]`
      nebPay.simulateCall(dappAddr, '0', callFunc, callArgs, {
        callback: mainnetUrl,
        listener: function (res) {
          if (res.result !== 'null') {
            const { tarotData } = JSON.parse(res.result)
            if (Array.isArray(tarotData)) {
              self.$toasted.success('成功搜索到最近一次抽卡结果')
              self.number = tarotData.length
              self.each = tarotData
              self.draw = true
            }
          } else {
            self.$toasted.error('找不到抽卡结果，请稍后再试')
          }
        }
      })
    },
    leaveHandler(){
      history.back();
    },
    tStart(e){
      this.time = e.timeStamp;
      this.size+=50;
    },
    tEnd(e){
      const self = this
      nebPay.pay(nebTo, '0', {
        callback: mainnetUrl,
        listener: function (res) {
          if (res.txhash) {
            self.$toasted.success('交易成功，开始为您抽卡')
            let touchTime = (e.timeStamp-self.time)/1000;

            if(touchTime<2) return
            self.msg="Go Back"
            //if(touchTime<1) return;
            //這邊抽牌！
            let d = s_result(self.number);
            for(let i=0;i<self.number;i++){
              self.each[i] = {};
              if(d[i].reversed) self.each[i].style='transform: scaleY(-1);'
              self.each[i].path = d[i].path;
              self.each[i].card = d[i].card;
            }
            self.draw=true
          } else {
            self.$toasted.error('已终止交易，无法抽卡', {
              action: {
                text: '重新抽卡',
                onClick: () => self.tEnd(e)
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.result{
}
.card{
}
.r-card{


}
.save {
  margin-top: 20px;
}
</style>

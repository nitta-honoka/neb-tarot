<template>
  <div class="daily">
  	<div class="title">
      <h1>每日运势(每天只能抽一次呦:-D)</h1>
    </div>

    <transition name="v2">
    <div v-if="draw">
      <div class="result">
        <flexbox>
          <img :src="path" :style="style">
          <flexbox-item>
            <div class="profile"></div>
            <div class="text">
              <i class="card-mean"> {{ mean }}</i>
              <h5 class="card-name">{{ card }}</h5>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
      <i class="draw-time">上次抽牌于{{time.month}}月{{time.date}}号 {{time.hours}}点...</i>
    </div>

    </transition>


    <div class="choose">
      <div  id="enter" v-if="!draw">
        <p>请冥想并按下按钮...</p>
        <x-icon @click="onBegin" type="ios-circle-filled" size="150"></x-icon>
      </div>
      <divider>{{msg}}</divider>
      <div id="leave" @click="leaveHandler">
        <!--<i class="back-icon"><</i>-->
        <x-icon type="ios-arrow-thin-left" size="150"></x-icon>
      </div>
    </div>

  </div>
</template>

<script>
//import  {}  from './draw'
import NebPay from 'nebpay.js'
let daily = require('./draw.js').daily
const nebPay = new NebPay()
// const nebTo = 'n1bs9seJ2QtqY7w28MkRTUkosciEwgCD4Fo' // testnet
const nebTo = 'n1Pgz5NeWd67ukEpw5a5Jzt1Gb4TM4c49GY' // mainnet
const mainnetUrl = "https://pay.nebulas.io/api/mainnet/pay"
const testnetUrl = "https://pay.nebulas.io/api/pay"

export default {
  components: {

  },
  data () {
    return {
      time:{
        month:Number,
        date:Number,
        hours:Number,
      },
      msg:"Choose one",
      startTouchTime:0,
      draw:false,
      path:'',
      mean:'',
      card:'',
      style:'',
    }
  },
  created(){
    let rc = this.$ls.get('daily','nothing')
    if(rc=='nothing') return;
    console.log(rc)
    this.render(rc);
  }
  ,
  methods:{
    leaveHandler(){
      history.back();
    },
    render(d){

      if(d.reversed) this.style='transform: scaleY(-1);'
      this.path = d.path;
      this.mean = d.mean;
      this.card = d.card;
      this.time = d.time;
      this.msg="Go Back"
      this.draw = true;
    },
    onBegin(e) {
      const self = this
      nebPay.pay(nebTo, '0', {
        callback: mainnetUrl,
        listener: function (res) {
          if (res.txhash) {
            self.$toasted.success('交易成功，开始为您抽卡')
            self.tEnd(e)
          } else {
            self.$toasted.error('已终止交易，无法抽卡', {
              action: {
                text: '重新抽卡',
                onClick: () => self.onBegin(e)
              }
            })
          }
        }
      })
    },
    tStart(e){
      this.startTouchTime = e.timeStamp;
      this.size+=50;
    },
    tEnd(e){
      let touchtime = (e.timeStamp-this.startTouchTime)/1000;
      //if(touchTime<1) return
      let d = daily();
      let now = new Date;
      d.time = {
            'month':now.getMonth()+1,//差一个月
            'date':now.getDate(),
            'hours':now.getHours()
      };
//      console.log(d)
      this.render(d);
      this.$ls.set(
        'daily',{
          'time':this.time,
          'card':d.card,
          'path':d.path,
          'reversed':d.reversed,
          'mean':d.mean
        },24*60*60*1000);//a day expire
    }
  }
}
</script>

<style scoped>
.result{
  background-color: rgb(255,255,255);
  padding:20px;
  color:black;
  border:solid black;
  border-width:2px;
}

.draw-time{
  color: #f1f1f1;
}

.choose{
  padding:30px;
}


</style>

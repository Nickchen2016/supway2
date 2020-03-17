<template>
  <view class="container">
        <status-bar hidden/>
    <view :class="isActive">
      <view class="train-cate">
        <view class="circle">
          <text class="text-color-bold">{{message}}</text>
        </view>
      </view>
      <view class="platform-info">
        <view class="platform-info-detail">
          <text class="text-color-primary platform-name-position">{{platform}}</text>
        </view>
        <view class="platform-info-detail">
          <view class="train-direction">
            <text class="train-direction-text">{{direction}}</text>
          </view>
        </view>
      </view>
    </view>
    <scroll-view class="sub-views" :style="{height:'43%'}" :content-container-style="{contentContainer: {
        paddingVertical: 20
    }}">
      <view v-for="stop in stops" :key="stop[1]" :style="{width:'100%',height:50,paddingLeft:60,flexDirection:'row'}">
        <view class="bullet-point" :style="{backgroundColor: stop[0]===platform?'rgba(255,51,153,1)':'rgba(102,255,153,1)'}"></view>
        <text class="text-for-stops" :on-press="()=>handlePress(stop)">{{stop[0]}}</text>
      </view>
    </scroll-view>
    <view class="sub-views" :style="{height:'35%'}">
      <animated:view class="time-bar" 
        v-for="(growth, index) in growths" :key="growth.val+index"
        :style="{width: growth.val, 
                 backgroundColor: times[index]===0?'rgba(102,255,153,1)':colorBlocks[index]
                }"
      />
    </view>
    <view class="time-bar-right">
      <view class="time-bar-2" v-for="(slot, index) in slots" :key="index">
       <text class="text-color-special">{{slot}}</text>
       <text class="time-in-mins">{{times[index]>0?times[index]+' mins':'now'}}</text>
      </view>
    </view>
  </view>
</template>
<script>
import axios from 'axios';
import { Animated, Easing } from "react-native";
export default {
  data: function() {
    return {
      message: "N",
      platform: '',
      platformId: '',
      direction: 'Downtown',
      isActive: 'isAction',
      times: [],
      slots: ['1','2','3'],
      growths: [
        {val: 0},
        {val: 0},
        {val: 0}
      ],
      colorBlocks: [
        'rgba(255,51,153,1)','rgba(255,51,102,1)','rgba(255,51,0,1)'
      ],
      stops: [
        ['Canal St','Q01S'],
        ['Atlantic Av - Barclays Ctr','R31S'],
        ['36 St','R36S'],
        ['59 St','R41S'],
        ['8 Av','N02S'],
        ['Fort Hamilton PKwy','N03S'],
        ['New Utrecht Av','N04S'],
        ['18 Av','N05S'],
        ['20 Av','N06S'],
        ['Bay Pkwy','N07S'],
        ['Kings Hwy','N08S']
      ]
    };
  },
  created: function() {
    this.growths.forEach(el=>{
      el.val = new Animated.Value(0);
    });
  },
  methods:{
    handlePress(stop){
      this.platform = stop[0];
      this.platformId = stop[1];
      axios.post('http://192.168.1.3:3000', {id: stop[1]})
      .then(res=>{
        // console.log('__Res__', res.data, res.status)
        const newTimeList = res.data.timeList.map(el=>el<=0?0:el);
        this.times = newTimeList;

        this.animateGrowth(newTimeList);
      })
      .catch(err=>console.log(err))
    },
    animateGrowth(timeList) {
        this.growths.forEach(growth=>{
          growth.val.setValue(0);
        })
        Animated.parallel([
          Animated.timing(this.growths[0].val,{
            toValue: Math.floor(timeList[0]/timeList[2]*380),
            duration: 350,
            easing: Easing.linear
          }),
          Animated.timing(this.growths[1].val,{
            toValue: Math.floor(timeList[1]/timeList[2]*380),
            duration: 350,
            easing: Easing.linear
          }),
          Animated.timing(this.growths[2].val,{
            toValue: 380,
            duration: 350,
            easing: Easing.linear
          }),
        ]).start(()=>{
            console.log('____time_____', timeList, this.growths)
        });
    }
  },
  // mounted: function(){
    // axios.get('http://192.168.1.5:3000')
    // .then(res=>{
    //   console.log(res.data);
    //   this.times=res.data;
    // })
    // .catch(err=>console.log(err))
    // }
  // }
};
</script>
<style>
.container {
  flex: 1;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: rgba(0,0,51,1);
}
.sub-views {
  width: 100%;
  flex-direction: column;
}
.bullet-point {
  width: 8;
  height: 8;
  margin-top: 7%;
  margin-right: 10%;
  border-radius: 2;
}
.text-color-primary {
  color: white;
  font-size: 32;
}
.text-for-stops{
  color: white;
  font-size: 21;
  margin-top: 4%;
}
.time-in-mins {
  height: 100%;
  color:white;
  font-size: 21;
  text-align: right;
  padding-right: 5%;
  margin-top: -19%;
}
.text-color-special {
  color:white;
  margin-top: 13%;
  padding-left: 30px;
  height: 100%;
  font-size: 60;
  font-style:italic;
  font-weight: 700;
}
.text-color-bold {
  color: black;
  font-weight: 700;
  font-size: 60;
}
.train-direction-text {
  color: black;
  font-size: 15;
  margin-top: -5%;
  font-style: italic;
}
.platform-name-position {
  text-align: right;
  padding-top: 18%;
  padding-right: 12%;
}
.isAction {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
}
.train-cate {
  width: 35%;
  height: 100%;
  margin-top: 2%;
  align-items: center;
  justify-content: center;
}
.circle {
  width: 90px; 
  height: 90px;
  border-radius: 100;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,204,0,1);
}
.platform-info {
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  width: 65%;  
  height: 100%;
}
.platform-info-detail {
  height: 50%;
  width: 100%;
}
.train-direction {
  width: 90px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50;
  margin-top: 4%;
  margin-right: 12%;
  align-self: flex-end;
  background-color: rgba(102,255,153,1); 
}
.time-bar {
  height: 35%;
  justify-content: center;
}
.time-bar-2 {
  height: 35%;
  justify-content: center;
}
.time-bar-right {
  position:absolute;
  bottom:0;
  left:0;
  width: 100%;
  height: 35%;
}
</style>
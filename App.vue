<template>
  <view class="container">
        <status-bar hidden/>
    <view :class="isActive">
      <text class="text-color-primary">{{message}}</text>
    </view>
    <view class="sub-views">
        <text class="text-color-primary">{{dates}}</text>
    </view>
    <view class="sub-views">
        <text class="text-color-primary">{{years}}</text>

    </view>
  </view>
</template>
<script>
export default {
  data: function() {
    return {
      message: "Hello World",
      dates: 'Hello you!',
      years: 'hyfuy',
      isActive: 'isAction'
    };
  }
};
</script>
<style>
.container {
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  background-color: antiquewhite;
  /* background-color: rgba(0,0,51,1); */
}
.sub-views {
  width: 100%;
  height: 38%;
  background-color: green;
  /* flex: 1; */
}
.text-color-primary {
  color: blue;
  font-size: 30;
}
.isAction {
  width: 100%;
  height: 24%;
  background-color: red;
}
</style>
<template>
  <view class="container">
    <!-- <text class="text-color-primary">{{message}}</text> -->
    <button v-bind:title="message" v-bind:on-press="handlebaraction"/>
  </view>
</template>
<script>
export default {
  data: function() {
    return {
      message: "Hello World"
    };
  },
  methods: {
    handlebaraction: function(){
      alert('Here!');
    }
  }
};
</script>
<style>
.container {
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
}
.text-color-primary {
  color: blue;
  font-size: 30;
}
</style>



// pages/testWebView/testWebView.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    console.log('加载地图');
  },
  // 点击控件时触发
  testBindcontroltap(){
    console.log('testBindcontroltap');
  },
  // 视野发生变化时触发
  testBindregionchange(){
    console.log('testBindregionchange');
  },
  // 点击地图时触发
  testBindtap(){
    console.log('点击地图时触发');
  },
  // 在地图渲染更新完成时触发
  testBindupdated(){
    console.log('在地图渲染更新完成时触发');
  }
})
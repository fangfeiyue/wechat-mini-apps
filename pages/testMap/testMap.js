// pages/testWebView/testWebView.js
Page({
  data: {
    test: '我爱我家',
    markers: [{
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        title: '我是第一个mark标记',
        iconPath: '/images/icon/share.png',
        bgColor: 'red'
      }
    ],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229,
      },{
        longitude: 113.324520,
        latitude: 23.21229,
      }],
      color: "#FF0000DD",
      width: 2
    }], 
    controls: [

    ]
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
  },
  // 标点点击
  marktap(){
    console.log('点击了标注');

    // 打开腾讯内置地图
    wx.openLocation({
      latitude: 23.099994, // 纬度，范围为-90~90，负数表示南纬
      longitude: 113.324520, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例
      // name: 'name', // 位置名
      // address: 'address', // 地址的详细说明
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
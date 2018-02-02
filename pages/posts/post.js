Page({
    onLaunch: function(options) {
        // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        console.log('onlaunch');
    },
    onLoad: function(options){
        // 页面初始化，options为页面跳转所带来的参数
        console.log('onload');
    },
    onReady: function(){
        // 页面渲染完成
        console.log('onready');
    },
    onShow: function(){
        // 页面显示
        console.log('onshow');
    },
    onHide: function(){
        // 页面隐藏
        console.log('onhide');
    },
    onUnload: function(){
        // 页面关闭
        console.log('onunload');
    } 
  })
var postData = require('../../data/posts-data.js');

Page({
    data:{
        message: 'hello world'
    },
    onLoad: function(options){
        // 页面初始化，options为页面跳转所带来的参数
        this.setData({ postData: postData.postData });
    }
  })
var postData = require('../../data/posts-data.js');

Page({
    data:{
        message: 'hello world'
    },
    onLoad(options){
        // 页面初始化，options为页面跳转所带来的参数
        this.setData({ postData: postData.postData });
    },
    onPostTap(event){
        let postId = event.currentTarget.dataset.postid;
        console.log(postId);
    },
  })
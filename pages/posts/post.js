var postData = require('../../data/posts-data.js');

Page({
    data:{
    },
    onLoad(options){
        // 页面初始化，options为页面跳转所带来的参数
        this.setData({ postData: postData.postData });
    },
    onPostTap(event){
        let postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: './post-detail/post-detail'
        })
        console.log(postId);
    },
  })
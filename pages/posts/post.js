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
            url: `./post-detail/post-detail?id=${postId}`
        })
        console.log(postId);
    },
    onSwiperTap(event){
        // target指的是当前点击的组件；currentTarget指的是事件捕获组件
        let postId = event.target.dataset.postid;
        console.log(event);
        wx.navigateTo({
            url: `./post-detail/post-detail?id=${postId}`
        })
    }
  })
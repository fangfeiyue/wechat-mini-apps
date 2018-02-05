let postData = require('../../../data//posts-data.js');

Page({
    data:{
        collected:''
    },
    onLoad(options){
        let postId = options.id,
            postDataArr = postData.postData[postId],
            postsCollected = wx.getStorageInfoSync('posts_collected');

        this.data.currentPostId = postId;

        this.setData({
            ...postDataArr
        });

        if (postsCollected){
            this.setData({
                collected: postsCollected[postId]
            });
        }else{
            wx.setStorageSync('posts_collected', {
                postId: false
            });
        }
    },
    onCollectionTap(event){
        const { currentPostId } = this.data,
              postsCollected    = wx.getStorageSync('posts_collect'),
              postCollected     = postsCollected[currentPostId];

        wx.setStorageSync('posts_collect', {
            [currentPostId]: !postCollected
        });

        this.setData({
            collected: postCollected
        });
    },
    onShareTap(){
        wx.removeStorageSync('name');
        wx.clearStorageSync();
    }
});
let postData = require('../../../data//posts-data.js');

Page({
    data:{
    },
    onLoad(options){
        let postId = options.id,
            postDataArr = postData.postData[postId],
            postsCollected = wx.getStorageSync('posts_collect');

        this.data.currentPostId = postId;

        this.setData({
            ...postDataArr
        });

        if (postsCollected[postId]){
            console.log(postsCollected[postId]);
            this.setData({
                collected: postsCollected[postId]
            });
        }else{
            wx.setStorageSync('posts_collect', {
                ...postsCollected,
                [postId]: false
            });
        }
    },
    onCollectionTap(event){
        const { currentPostId } = this.data,
              postsCollected    = wx.getStorageSync('posts_collect'),
              postCollected     = postsCollected[currentPostId];
              
        this.setData({
            collected: !postCollected
        });

        wx.setStorageSync('posts_collect', {
            ...postsCollected,
            [currentPostId]: !postCollected
        });
    },
    onShareTap(){
        wx.removeStorageSync('name');
        wx.clearStorageSync();
    }
});
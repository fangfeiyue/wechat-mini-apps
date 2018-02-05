let postData = require('../../../data//posts-data.js');

Page({
    onLoad(options){
        let postId = options.id,
            postDataArr = postData.postData[postId];

        this.setData({
            ...postDataArr
        });

        wx.setStorageSync('name', 'fangfeiyue');
    },
    onCollectionTap(event){
        let name = wx.getStorageSync('name');

        console.log(name);
    },
    onShareTap(){
        wx.removeStorageSync('name');
        wx.clearStorageSync();
    }
});
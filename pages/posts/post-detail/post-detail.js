let postData = require('../../../data//posts-data.js');

Page({
    onLoad(options){
        let postId = options.id,
            postDataArr = postData.postData[postId];
        console.log(postDataArr);
        this.setData({
            ...postDataArr
        });
    }
});
let app = getApp();

Page({
    onLoad(){
        console.log('app==>',app);
        wx.request({
            url: `${app.globalData.doubanBase}/v2/movie/top250`,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                console.log(res);
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
});
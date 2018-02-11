let app = getApp();
let doubanBase = app.globalData.doubanBase;

Page({
    onLoad(){
        let inTheatersUrl = `${doubanBase}/v2/movie/in_theaters`;
        let comingSoonUrl = `${doubanBase}/v2/movie/coming_soon`;
        let top250Url = `${doubanBase}/v2/movie/top250`;

        // 正在热映
        this.getMovieData(inTheatersUrl);
        // 即将上映
        this.getMovieData(comingSoonUrl);
        // top250
        this.getMovieData(top250Url);
    },
    getMovieData(url){
        wx.request({
            url: `${doubanBase}/v2/movie/top250`,
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
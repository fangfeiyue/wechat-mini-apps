let app = getApp();
let doubanBase = app.globalData.doubanBase;

Page({
    onLoad(){
        let inTheatersUrl = `${doubanBase}/v2/movie/in_theaters?start=0&count=3`;
        let comingSoonUrl = `${doubanBase}/v2/movie/coming_soon?start=0&count=3`;
        let top250Url = `${doubanBase}/v2/movie/top250?start=0&count=3`;

        // 正在热映
        this.getMovieData(inTheatersUrl);
        // 即将上映
        // this.getMovieData(comingSoonUrl);
        // // top250
        // this.getMovieData(top250Url);
    },
    getMovieData(url){
        let self = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                console.log(res);
                self.processDoubanData(res.data);
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
    processDoubanData(moviesDouban){
        let movies = [];
        moviesDouban.subjects.map(movie => {
            let title = movie.title;
            if (title.length >= 6){
                title = title.substring(0, 6)+'...';
            }    

            let temp = {
                title,
                average: movie.rating.average,
                coverageUrl: movie.images.large,
                movieId: movie.id
            };
            movies.push(temp);
        });

        console.log('movies', movies);

        this.setData({
            movies
        });
    }
});
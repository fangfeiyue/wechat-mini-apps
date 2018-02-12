let app = getApp();
let utils = require('../../../utils/util.js');

Page({
    data: {
        movies: [],
        totalCount: 0,
        navigateTitle: ''
    },
    onLoad(options){
        let category = options.category;
        console.log(category);
        this.setData({
            navigateTitle: category
        });
    },
    // 当页面已经准备完毕才执行
    onReady(event){

        let self = this,
            dataUrl = '',
            doubanBase = app.globalData.doubanBase;;

        // 动态设置导航栏标题
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        });

        switch (this.data.navigateTitle){
            case '正在热映':
                dataUrl = `${doubanBase}/v2/movie/in_theaters`;
                break;
            case '即将上映':
                dataUrl = `${doubanBase}/v2/movie/coming_soon`;
                break;
            case '豆瓣Top250':
                dataUrl = `${doubanBase}/v2/movie/top250`;
                break;
        }
        
        this.data.requestUrl = dataUrl;
        
        this.requestMoreMovies(dataUrl, (res) => {
            this.processDoubanData(res);
        },(error) => {
            
        });
    }, 
    requestMoreMovies(url, resolve, reject){
        utils.requestUrl({ url, resolve, reject });
    },
    processDoubanData(res){
        let movies = [],
            totalMovies = [];

        res.subjects.map(subject => {
            let temp = {
                movieId: subject.id,
                coverageUrl: subject.images.large,
                stars: subject.rating.stars,
                average: subject.rating.average,
                title: subject.title.length > 6 ? subject.title.substring(0, 6)+'...' : subject.title,
            };

            movies.push(temp);
        });
    
        this.setData({
            movies: [...this.data.movies, ...movies]
        });

        this.data.totalCount += 20;
    },
    // 130400版本更新导致下拉刷新和scroll-view不能同时使用,所以如果想使用下拉刷新功能的话，这个方法得废弃
    onScrollLower(event){
        let nextUrl = `${this.data.requestUrl}?start=${this.data.totalCount}&count=20`;
        console.log('这个方法暂时不用');
        wx.showNavigationBarLoading();

        this.requestMoreMovies(nextUrl, (res) => {
            this.processDoubanData(res);
            this.hideNavigationBarLoading();
        },(error) => {
            this.hideNavigationBarLoading();
        });
    },
    // 上拉触底
    onReachBottom(){
        let nextUrl = `${this.data.requestUrl}?start=${this.data.totalCount}&count=20`;

        wx.showNavigationBarLoading();

        this.requestMoreMovies(nextUrl, (res) => {
            this.processDoubanData(res);
            this.hideNavigationBarLoading();
        },(error) => {
            this.hideNavigationBarLoading();
        });
    },
    // 下拉刷新
    onPullDownRefresh(){
        let refreshUrl = `${this.data.requestUrl}?start=0&count=20`;

        wx.showNavigationBarLoading();
        this.data.movies = [];

        this.requestMoreMovies(refreshUrl, (res) => {
            this.processDoubanData(res);
            wx.stopPullDownRefresh();
            this.hideNavigationBarLoading();
        }, (error) => {
            this.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        });
    },
    hideNavigationBarLoading(){
        setTimeout(() => {
            wx.hideNavigationBarLoading();
        }, 200);
    }
});
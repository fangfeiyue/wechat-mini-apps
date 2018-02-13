let app = getApp();
let utils = require('../../utils/util.js');
let doubanBase = app.globalData.doubanBase;

Page({
    data:{
        // 用setData绑定数据最好在这给个初始值，以防因为异步的原因找不到想要的数据
        inTheaters: {},
        comingSoon: {},
        top250: {},
        containerShow: true,
        searchPanelShow: false,
        searchResult: [] 
    },
    onLoad(){
        let inTheatersUrl = `${doubanBase}/v2/movie/in_theaters?start=0&count=3`;
        let comingSoonUrl = `${doubanBase}/v2/movie/coming_soon?start=0&count=3`;
        let top250Url = `${doubanBase}/v2/movie/top250?start=0&count=3`;

        // 正在热映
        this.getMovieData(inTheatersUrl, "inTheaters", "正在热映");
        // 即将上映
        this.getMovieData(comingSoonUrl, "comingSoon", '即将上映');
        // top250
        this.getMovieData(top250Url, "top250", '豆瓣Top250');
    },
    onMoreTap(event){
        let category = event.currentTarget.dataset.category;

        wx.navigateTo({
            url: `more-movie/more-movie?category=${category}`,
        });
    },
    getMovieData(url, type, categoryTitle){

        this.requestCategoryMovies(url, (moviesDouban) => {
            this.processDoubanData(moviesDouban, type, categoryTitle);
        }, (error) => {
            console.log(`电影分类${categoryTitle}请求失败，${error}`);
        });
    },
    requestCategoryMovies(url, resolve, reject){
        utils.requestUrl({
            url,
            resolve,
            reject
        });
    },
    processDoubanData(moviesDouban, type, categoryTitle){
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
                movieId: movie.id,
                stars: utils.getStars(movie.rating.stars || '')
            };
            movies.push(temp);
        });

        this.setData({
            [type]: { movies, categoryTitle }
        });
    },
    onBindFocus(){
        this.setData({
            containerShow: false,
            searchPanelShow: true
        });
    }, 
    onBindConfirm(event){
        let searchContent = event.detail.value,
            searchUrl = `${doubanBase}/v2/movie/search?q=${searchContent}`;

        this.onSearch(searchUrl, (searchResult) => {
            console.log(searchResult);
            this.processDoubanData(searchResult, 'searchResult', '');
        }, (error) => {

        });
    },
    onSearch(url, resolve, reject){
        utils.requestUrl({ url, resolve, reject });
    },
    onCancelSearch(){
        this.setData({
            searchResult: [],
            containerShow: true,
            searchPanelShow: false
        });
    }
});
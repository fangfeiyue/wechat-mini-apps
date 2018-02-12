let app = getApp();
let utils = require('../../../utils/util.js');

Page({
    data: {
        subjects: [],
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

        this.requestMoreMovies(dataUrl, (res) => {
            this.processDoubanData(res);
        },(error) => {
            
        });
    }, 
    requestMoreMovies(url, resolve, reject){
        utils.requestUrl({ url, resolve, reject });
    },
    processDoubanData(res){
        let subjects = [];

        res.subjects.map(subject => {
            let temp = {
                movieId: subject.id,
                image: subject.images.large,
                stars: subject.rating.stars,
                average: subject.rating.average,
                title: subject.title.length > 6 ? subject.title.substring(0, 6)+'...' : subject.title,
            };

            subjects.push(temp);
        });

        this.setData({
            subjects
        });
    }
});

let app = getApp();
let doubanBase = app.globalData.doubanBase;
let utils = require('../../../utils/util.js');

Page({
  data: {
    
  },
  onLoad: function (options) {
    let movieId = options.movieId,
        movieDetailUrl = `${doubanBase}/v2/movie/subject/${movieId}`;
    
    this.requestMoiveDetail(movieDetailUrl, (movieDetails) => {
      this.processDoubanData(movieDetails);
    }, () => {

    });
  },
  requestMoiveDetail(url, resolve, reject){
    utils.requestUrl({ url, resolve, reject });
  },
  processDoubanData(movieDetails){
    
  }
})
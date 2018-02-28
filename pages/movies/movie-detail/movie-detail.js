// let app = getApp(),
//     doubanBase = app.globalData.doubanBase,
//     utils = require('../../../utils/util.js');

// Page({
//   data: {
//     movie: {}
//   },
//   onLoad: function (options) {
//     let movieId = options.movieId,
//         movieDetailUrl = `${doubanBase}/v2/movie/subject/${movieId}`;

//     this.requestMoiveDetail(movieDetailUrl, (movieDetails) => {
//       this.processDoubanData(movieDetails);
//     }, () => {

//     });
//   },
//   requestMoiveDetail(url, resolve, reject){
//     utils.requestUrl({ url, resolve, reject });
//   },
//   processDoubanData(movieDetail){
//     let director = {
//       avatar: '',
//       name: '',
//       id: ''
//     };

//     if (movieDetail.directors[0] != null){
//       if (movieDetail.directors[0].avatars !== null){
//         director.avatar = movieDetail.directors[0].avatar &&movieDetail.directors[0].avatar.large || '';
//       }
//       director.name = movieDetail.directors[0].name;
//       director.id = movieDetail.directors[0].id;
//     }

//     let movie = {
//       director: director,
//       year: movieDetail.year,
//       title: movieDetail.title,
//       summary: movieDetail.summary,
//       average: movieDetail.rating.average,
//       wishCount: movieDetail.wish_count,
//       country: movieDetail.countries[0],
//       genres: movieDetail.genres.join('、'),
//       originalTitle: movieDetail.original_title,
//       commentsCount: movieDetail.comments_count,
//       casts: this.formatCastsName(movieDetail.casts),
//       stars: utils.getStars(movieDetail.rating.stars),
//       castsInfo: this.formatCastsInfo(movieDetail.casts),
//       movieImg: movieDetail.images ? movieDetail.images.large : '',
//     };

//     this.setData({
//       ...movie
//     });
//   },
//   formatCastsName(casts){
//     let name = '';

//     if (casts.length > 0){
//       casts.map(cast => {
//         name = name + cast.name + '/';
//       });

//       return name.substring(0, name.length - 1);
//     }
//     return '';
//   },
//   formatCastsInfo(casts){
//     return casts.map(cast => {
//       return {
//         name: cast.name,
//         img: cast.avatars && cast.avatars.large || ''
//       };
//     });
//   }, 
//   viewMoviePostImg(event){
//     let imgSrc = event.currentTarget.dataset.src;
//     wx.previewImage({
//       current: imgSrc, // 当前显示图片的链接，不填则默认为 urls 的第一张,
//       urls: [imgSrc]
//     })
//   }
// })


// class

import Movie from './class/movie';

let app = getApp(),
  doubanBase = app.globalData.doubanBase;

Page({
  data: {
    movie: {}
  },
  onLoad(options) {
    let movieId = options.movieId,
      movieDetailUrl = `${doubanBase}/v2/movie/subject/${movieId}`,
      movie = new Movie(movieDetailUrl);

    movie.getMovieData((movie) => {
      this.setData({
        ...movie
      });
    });
  }
});
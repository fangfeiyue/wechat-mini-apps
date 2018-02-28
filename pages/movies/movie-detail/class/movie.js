let utils = require('../../../../utils/util.js');

class Movie {
    constructor(url) {
        this.url = url;
        this.formatCastsName = this.formatCastsName.bind(this);
        this.formatCastsInfo = this.formatCastsInfo.bind(this);
        this.requestMoiveDetail = this.requestMoiveDetail.bind(this);
    }

    requestMoiveDetail(url, resolve, reject) {
        utils.requestUrl({
            url,
            resolve,
            reject
        });
    }

    getMovieData(callBack) {
        this.callBack = callBack;
        this.requestMoiveDetail(this.url, (movieDetail) => {
            this.processDoubanData(movieDetail);
        }, (error) => {
            console.log(error);
        });
    }

    processDoubanData(movieDetail) {
        let director = {
            avatar: '',
            name: '',
            id: ''
        };

        if (movieDetail.directors[0] != null) {
            if (movieDetail.directors[0].avatars !== null) {
                director.avatar = movieDetail.directors[0].avatar && movieDetail.directors[0].avatar.large || '';
            }
            director.name = movieDetail.directors[0].name;
            director.id = movieDetail.directors[0].id;
        }

        let movie = {
            director: director,
            year: movieDetail.year,
            title: movieDetail.title,
            summary: movieDetail.summary,
            average: movieDetail.rating.average,
            wishCount: movieDetail.wish_count,
            country: movieDetail.countries[0],
            genres: movieDetail.genres.join('、'),
            originalTitle: movieDetail.original_title,
            commentsCount: movieDetail.comments_count,
            casts: this.formatCastsName(movieDetail.casts),
            stars: utils.getStars(movieDetail.rating.stars),
            castsInfo: this.formatCastsInfo(movieDetail.casts),
            movieImg: movieDetail.images ? movieDetail.images.large : '',
        };

        this.callBack(movie);
    }
    formatCastsName(casts) {
        let name = '';

        if (casts.length > 0) {
            casts.map(cast => {
                name = name + cast.name + '/';
            });

            return name.substring(0, name.length - 1);
        }
        return '';
    }
    formatCastsInfo(casts) {
        return casts.map(cast => {
            return {
                name: cast.name,
                img: cast.avatars && cast.avatars.large || ''
            };
        });
    }
}

export default Movie;
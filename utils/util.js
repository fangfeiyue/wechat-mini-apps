const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getStars = stars => {
  let rating = [];

  if (stars && (parseInt(stars.substring(0, 1)) <= 5)){
      for (let i = 0; i < 5; i++){
          rating.push( i - parseInt(stars.substring(0, 1)) < 0 ? 1 : 0 );    
      }
  }
  return rating;
}

module.exports = {
  getStars,
  formatTime: formatTime
}

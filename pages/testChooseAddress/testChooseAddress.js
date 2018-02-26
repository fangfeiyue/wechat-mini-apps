// pages/testChooseAddress/testChooseAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 选择收货地址
  onChooseAddress(){
    wx.chooseAddress({
      success: function(res){
        console.log(res.userName);
        console.log(res.postalCode);
        console.log(res.provinceName);
        console.log(res.cityName);
        console.log(res.countyName);
        console.log(res.detailInfo);
        console.log(res.nationalCode);
        console.log(res.telNumber);
      }
    });
  },
  // 获取用户信息，withCredentials 为 true 时需要先调用 wx.login 接口。
  onGetUserInfo(){
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;

        console.log(userInfo);
        console.log(nickName);
        console.log(avatarUrl);
        console.log(gender);
        console.log(province);
        console.log(city);
        console.log(country);
      }
    });
  },
  checkSession(){
      wx.checkSession({
        success: function(){
          //session 未过期，并且在本生命周期一直有效
          console.log('success');
        },
        fail: function(){
          //登录态过期
          console.log('用户未登录');
          // wx.login() //重新登录
        }
      })
  },
  test(){}
})
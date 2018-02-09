Page({
    onTap(){
        console.log('开始跳转页面');
        // wx.navigateTo({
        //     url: '../posts/post'
        // })
        // wx.redirectTo({
        //     url: '../posts/post'
        // })
        //要跳转到一个带tabBar选项卡的页面，必须使用wx.switchTab方法
        wx.switchTab({
            url: '../posts/post'
        })
    }
})
Page({
    onTap(){
        // wx.navigateTo({
        //     url: '../posts/post'
        // }),
        wx.redirectTo({
            url: '../posts/post'
        })
    }
})
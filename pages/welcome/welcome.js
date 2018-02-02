Page({
    onTap(){
        wx.navigateTo({
            url: '../posts/post',
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
})
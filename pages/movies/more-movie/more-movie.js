Page({
    data: {
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

        // 动态设置导航栏标题
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        });
    }
});
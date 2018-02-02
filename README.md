# 微信小程序
这是一个集阅读与电影于一体的小程序。“阅读”是一个类似于“知乎”的文章阅读器，用户在这里可以阅读文章或听音乐。“电影”是一个查看最新电影资讯的地方。在这里可以查看到“正在上映”、“即将上映”和“Top250”的电影资讯
## 初始小程序
###  小程序的特点
- 小程序适合做简单的，用完即走的的应用
- 小程序适合低频的应用
- 小程序适合性能要求不高的应用
- 小程序不支持Dom，没有window这个对象
## 项目总结

- 微信小程序有自己的开发工具，是基于nw.js写的。做的比较简洁，基本的代码编辑、智能提示、调试等功能都有。不好的地方也很明显，不支持查看引用，不支持代码重构。背景、字体调节都不支持，感觉眼睛好受罪。我平常都是用vscode作为开发工具，但是微信小程序是用.wxml文件来表示页面结构，用.wxss文件来表示样式表，vscode是不能识别这两种扩展名的，因此没有语法高亮，也不能用emmet，好尴尬。。。最后再网上找到一个插件[vscode-wechat](https://marketplace.visualstudio.com/items?itemName=qinjia.vscode-wechat)，会修改用户设置中的文件关联,将.wxml映射到.html,.wxss映射到.css，语法高亮和emmet就都搞定了。但是要注意哦vscode打开的必须是小程序的项目根目录，否则插件会不生效。

- 小程序中只有被`<text></text>`包裹的组件才能在手机上被长按选中

- 自适应单位：rpx

- 移动分辨率和rpx
    - pt也称为逻辑分辨率
    - pt的大小和屏幕的尺寸有关系，简单也可以理解为长度和视觉单位
    - px指物理分辨率，和屏幕尺寸没有关系。
    -1个pt可以由一个px构成，也可以有两个、三个甚至跟多px构成
    - iphone6下2个px才构成1个pt

rpx单位是微信小程序中css的尺寸单位，使用rpx，小程序会自动在不同的分辨率下进行转换。官方上规定屏幕宽度为20rem，规定屏幕宽为750rpx。所以在微信小程序中1rem=750/20rpx。iphone6物理像素和逻辑像素之间的转换比率为2：1。【物理分辨率】是硬件所支持的分辨率，【逻辑分辨率】是软件可以达到的分辨率。

- 虽然rpx很方便，但并不是所有的单位都适合rpx，比如字体，如果字体也跟着屏幕变化，在小屏幕手机上会看不清

- `<text></text>`中回车也会被输出到页面

- 小程序中是可以使用less、scss的，但生成的文件扩张名一定要是.wxss

## swiper的应用

swiper其中只可放置`<swiper-item/>`组件，否则会导致未定义的行为，swiper-item仅可放置在`<swiper/>`组件中，宽高自动设置为100%。change事件返回detail中包含一个`source`字段，表示导致变更的原因，可能值如下
- autoplay 自动播放导致swiper变化
- touch 用户划动引起swiper变化
- 其他原因将用空字符串表示

## 页面的生命周期函数
```
Page({
    onLaunch: function(options) {
        // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        console.log('onlaunch');
    },
    onLoad: function(options){
        // 页面初始化，options为页面跳转所带来的参数
        console.log('onload');
    },
    onReady: function(){
        // 页面渲染完成
        console.log('onready');
    },
    onShow: function(){
        // 页面显示
        console.log('onshow');
    },
    onHide: function(){
        // 页面隐藏
        console.log('onhide');
    },
    onUnload: function(){
        // 页面关闭
        console.log('onunload');
    } 
})
```

## 数据绑定

WXML 中的动态数据均来自对应 Page 的 data

### 简单绑定

数据绑定使用 Mustache 语法（双大括号）将变量包起来

```
//.wxml
<view> {{ message }} </view>

//.js
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```
### 关键字(需要在双引号之内)

true：boolean 类型的 true，代表真值。

false： boolean 类型的 false，代表假值。

```
<checkbox checked="{{false}}"> </checkbox>
```
`特别注意：不要直接写 checked="false"，其计算结果是一个字符串，转成 boolean 类型后代表真值。`
### Page.prototype.setData()

`setData` 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 `this.data` 的值（同步）

setData() 参数格式

| 字段 | 类型 | 必填 | 描述 | 最低版本 |
| :-: | :-: | :-: | :-: |:-: |
| data | Object| 是 | 这次要改变的数据 | | 
| callback | Function | 否 | 回调函数 | 1.50 |

object 以 key，value 的形式表示将 this.data 中的 key 对应的值改变成 value.callback 是一个回调函数，在这次setData对界面渲染完毕后调用,类似React中的setState

注意：
- 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
- 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
- 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题
```
//.js
Page({
    data:{
        message: 'hello world'
    },
    onLoad: function(options){
        // 页面初始化，options为页面跳转所带来的参数
        var post_content1 = {
            date: "Sep 18 2016",
            title: "正是虾肥蟹壮时",
            imgSrc: "/images/post/crab.png",
            avatar: "/images/avatar/1.png",
            content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，",
            reading: "112",
            collection: "96",
        };

        this.setData(post_content1);
    }
})

//.wxml
<view class="post-container">
    <view class="post-author-date">
        <image class="post-author" src="{{avatar}}"></image>
        <text class="post-date">{{date}}</text>
    </view>
    <text class="post-title">{{title}}</text>
    <image class="post-image" src="{{imgSrc}}"></image>
    <text class="post-content ">{{content}}</text>
    <view class="post-like">
        <image class="post-like-image" src="../../images/icon/chat.png"></image>
        <text class="post-like-count">{{collection}}</text>
        <image class="post-like-image" src="../../images/icon/view.png"></image>
        <text class="post-like-font">{{reading}}</text>
    </view>
</view>
```

## 条件渲染
### wx:if

在框架中，使用 wx:if="{{condition}}" 来判断是否需要渲染该代码块：
`<view wx:if="{{condition}}"> True </view>`
也可以用 wx:elif 和 wx:else 来添加一个 else 块：
```
<view wx:if="{{length > 5}}"> 1 </view>
<view wx:elif="{{length > 2}}"> 2 </view>
<view wx:else> 3 </view>
```
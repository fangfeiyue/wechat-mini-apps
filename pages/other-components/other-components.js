Page({
    onLoad(options) {

    },
    switchChange(event) {
        console.log('切换了', event.detail.value);
    },
    // 完成一次拖动后触发的事件
    sliderChange() {
        console.log('完成一次拖动后触发的事件');
    },
    // 拖动过程中触发的事件
    sliderChanging() {
        console.log('拖动过程中触发的事件');
    },
    // <radio-group/> 中的选中项发生变化时触发 change 事件
    radioChange(event) {
        console.log('radio的value值====》', event.detail.value);
    },
    // 表单提交
    submitForm(event) {
        console.log('form发生了submit事件，携带数据为：', event.detail.value);
    },
    resetForm(event) {
        console.log('form发生了reset事件')
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function () {
        console.log('form发生了reset事件')
    }
});
const processData = require('../../utlis/ProcessingData')
Component({
    externalClasses: ['i-class'],
    properties: {
        content: {
            type: String
        },
        // text || textarea || password || number
        KeyboardKeys: {
            type: Array,
        },
        keyShow: {
            type: Boolean,
            value: false,
            observer(val) {
                this.keyShowChanger()   // 当visible变为true的时候 会触发initData
            }
        }
    },

    methods: {
        keyShowChanger() {
            try {
                let count = ''
                let splitValue = this.data.content.split("+");
                if (splitValue.length > 1) {
                    count = splitValue.reduce(processData.DataCount, 0)
                } else {
                    count = splitValue[0];
                }
                this.setData({
                    content: count
                })
            } catch (err) {
                console.log(err)
            }
            if (this.data.content) {
                this.triggerEvent('change', this.data.content)
            }
        },
        keyTap(e) {
            let { content } = this.data
            if (content.indexOf('￥') != -1) {
                content = ''
            }
            var _this = this,
                keys = e.currentTarget.dataset.keys,
                len = content.length;

            switch (keys) {
                case '·': //点击小数点，（注意输入字符串里的是小数点，但是我界面显示的点不是小数点，是居中的点，在中文输入法下按键盘最左边从上往下数的第二个键，也就是数字键1左边的键可以打出居中的点）
                    if (len < 11 && content.indexOf('.') == -1) { //如果字符串里有小数点了，则不能继续输入小数点，且控制最多可输入10个字符串
                        if (content.length < 1) { //如果小数点是第一个输入，那么在字符串前面补上一个0，让其变成0.
                            content = '0.';
                        } else { //如果不是第一个输入小数点，那么直接在字符串里加上小数点
                            content += '.';
                        }
                    }
                    break;
                case 0:
                    console.log(content)
                    if (len < 4) {
                        console.log(content.length)
                        if (content.length < 1) { //如果0是第一个输入，让其变成0.
                            content = '0.';
                        } else {
                            content += '0'
                        }
                    }
                    break;
                case '<': //如果点击删除键就删除字符串里的最后一个
                    content = content.substr(0, content.length - 1);
                    break;
                default:
                    let Index = content.indexOf('.'); //小数点在字符串中的位置
                    if (Index == -1 || len - Index != 3) { //这里控制小数点只保留两位
                        if (len < 11) { //控制最多可输入10个字符串
                            content += keys;
                        }
                    }
                    break
            }

            _this.setData({
                content
            })
            this.triggerEvent('change', this.data.content)

        },
        // 付款
        payTap() {
            this.setData({
                keyShow: false
            })
            this.triggerEvent('tap', this.data.content)
        }
    }
});
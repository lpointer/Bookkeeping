// miniprogram/pages/addMoney/index.js
const { db, dbTable, addData, getData, upData, msgTips, addErrorMsg } = require('../../services/api')
const methods = require('../../utlis/methods')
const _date = require('../../utlis/date')
const processData = require('../../utlis/ProcessingData')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  _data: {
    BillID: ''
  },
  data: {
    KeyboardKeys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '·'],
    seledate: '选择时间',
    current: '0',
    isSele: '',
    seleData: {},
    date: _date.todayDate,
    incomeMoney: '￥0.00',        //收入金额
    expenditureMoney: '￥0.00',        //支出金额
    expenditureRemarks: '输入备注',  //支出备注
    incomeRemarks: '输入备注',  //收入备注
    type: 'add',//默认是添加类型
    saveData: {
      date: _date.todayDate,
      year: _date.FullYear,
      monthDate: _date.monthDate,
      type: 0,  //0消费/1收入
      money: '',
      iconData: {},
      remarks: ''
    },
    expenditure: [
      {
        expenditureData: [
          { id: 1, icon: 'icon-shuiguo', name: '水果' },
          { id: 2, icon: 'icon-canyin', name: '餐饮' },
          { id: 3, icon: 'icon-gouwu', name: '购物' },
          { id: 4, icon: 'icon-lingshi', name: '零食' },
          { id: 5, icon: 'icon-xuexi', name: '学习' },
        ],
      },
      {
        expenditureData: [
          { id: 6, icon: 'icon-kuaidi', name: '快递' },
          { id: 7, icon: 'icon-tongxun', name: '通讯' },
          { id: 8, icon: 'icon-jiaotong', name: '交通' },
          { id: 9, icon: 'icon-yiliao', name: '医疗' },
          { id: 10, icon: 'icon-lvhang', name: '旅行' },
        ],
      },
      {
        expenditureData: [
          { id: 11, icon: 'icon-zhusui', name: '住宿' },
          { id: 12, icon: 'icon-yanjiu', name: '烟酒' },
          { id: 14, icon: 'icon-touzi', name: '投资' },
          { id: 15, icon: 'icon-jiechu', name: '借出' },
          { id: 13, icon: 'icon-qita', name: '其他' },
        ],
      },
      {
        expenditureData: [
          { id: 27, icon: 'icon-yule', name: '娱乐活动' },
          { id: 26, icon: 'icon-dianying', name: '电影' },
          { id: 28, icon: 'icon-qita', name: '开盒' },
          {},
          {}
        ],
      },
    ],
    income: [
      {
        incomeData: [
          { id: 16, icon: 'icon-xinzi', name: '薪资' },
          { id: 17, icon: 'icon-jiangjin', name: '奖金' },
          { id: 18, icon: 'icon-jieru', name: '借入' },
          { id: 19, icon: 'icon-baoxiao', name: '报销' },
          { id: 20, icon: 'icon-tuikuan', name: '退款' },
        ],
      },
      {
        incomeData: [
          { id: 21, icon: 'icon-hongbao', name: '红包' },
          { id: 22, icon: 'icon-touzihuishou', name: '投资回收' },
          { id: 23, icon: 'icon-touzishouyi', name: '投资收益' },
          { id: 24, icon: 'icon-lixishouru', name: '利息收入' },
          { id: 25, icon: 'icon-qitashouru', name: '其他收入' },
        ],
      }
    ],
    expenditureAutoFocus: false,
    incomeAutoFocus: false,
    keyShow: false
  },
  expenditureFocus(e) {
    let expend = e.detail.detail.value
    if (e.detail.detail.value == "￥0.00" || e.detail.detail.value == "可以试试10+15+20哦") {
      expend = ""
    }
    this.setData({
      expenditureMoney: expend,
      keyShow: !this.data.keyShow
    })
  },
  remarksFocus(e) {
    if (e.detail.detail.value == "输入备注") {
      this.setData({
        expenditureRemarks: "",
        incomeRemarks: ""
      })
    }
    this.setData({
      keyShow: false
    })
  },
  expenditureBlur(e) {
    let result = "";
    try {
      let value = e.detail.detail.value;
      if (!value) return;
      if (value.indexOf("-") != -1 || value.indexOf("*") != -1 || value.indexOf("/") != -1) {
        msgTips('当前只支持加号运算')
        this.setData({
          expenditureMoney: value,
          expenditureAutoFocus: true
        })

        return;
      }
      let splitValue = value.split("+");
      if (splitValue.length > 1) {
        result = splitValue.reduce(processData.DataCount, 0)

      } else {
        result = splitValue[0];
      }

    } catch (e) {
      console.log(e)
    }
    this.setData({
      expenditureMoney: result,
      "saveData.money": result
    })
  },
  incomeFocus(e) {
    let income = e.detail.detail.value
    if (e.detail.detail.value == "￥0.00" || e.detail.detail.value == "可以试试10+15+20哦") {
      income = ""
    }
    this.setData({
      incomeMoney: income,
      keyShow: !this.data.keyShow
    })
  },
  incomeBlur(e) {
    let result = "";
    try {
      let value = e.detail.detail.value;
      if (!value) return;
      if (value.indexOf("-") != -1 || value.indexOf("*") != -1 || value.indexOf("/") != -1) {
        msgTips('当前只支持加号运算')
        this.setData({
          incomeMoney: value,
          incomeAutoFocus: true
        })

        return;
      }
      let splitValue = value.split("+");
      if (splitValue.length > 1) {
        result = splitValue.reduce(processData.DataCount, 0)

      } else {
        result = splitValue[0];
      }

    } catch (e) {
      console.log(e)
    }
    this.setData({
      incomeMoney: result,
      "saveData.money": result
    })
  },

  expenditureTap(e){
    this.setData({
      keyShow: !this.data.keyShow
    })
  },

  //验证金额输入值
  verifyMoneyInput(value, type) {
    //如果为空直接返回
    if (!value || typeof value == 'object') return
    try {
      const moneyCount = Number.parseFloat(value)
      if (isNaN(moneyCount)) {
        msgTips('请输入正确的金额')
        if (type == 'income') return this.setData({ incomeMoney: '' })
        this.setData({ expenditureMoney: '' })
      }
    } catch (e) { }

  },
  //获取输入备注内容
  remarksInput(e) {
    this.setData({
      'saveData.remarks': e.detail.detail.value
    })
  },
  //选择今天支出/收入
  handleChange({ detail }) {
    this.setData({
      current: detail.key,
      'saveData.type': detail.key
    });
  },
  //选择类型名称
  setBackgroun(e) {
    this.setData({
      keyShow: false,
      isSele: e.target.dataset.id || '',
      seleData: e.target.dataset,
      'saveData.iconData': e.target.dataset
    });
  },

  //选择时间
  bindDateChange(e) {
    const seledate = e.detail.value;
    const monthdate = e.detail.value.substr(0, 7);
    this.setData({
      seledate: seledate,
      'saveData.monthDate': monthdate
    })
  },
  //添加数据记录
  add() {
    const that = this;
    const saveDate = this.data.seledate != '选择时间' ? this.data.seledate : this.data.date
    this.setData({
      'saveData.date': saveDate,
      'saveData.openid': app.globalData.openid,
      'saveData.cerateTime': Date.now()
    })

    if (!this.data.saveData.iconData.hasOwnProperty('icon')) return msgTips('请先选择消费类型')
    if (!this.data.saveData.money) return msgTips('先输入金额')

    if (this.data.type == 'add') {
      this.addRecord({ saveData: that.data.saveData, db: dbTable.cb })
    } else {
      this.updateRecord({ db: dbTable.cb, id: that._data.BillID, data: that.data.saveData })
    }

    app.getToday = true;

  },
  //保存全局数据
  saveGlobalData(data) {
    app.MONTH_DATA_LIST = data;
  },

  //新增数据
  addRecord(options) {
    //load提示框，数据限制提交
    const that = this;
    addData(options, (flag, data) => {
      if (flag) {
        app.todayDataList = that.data.saveData;
        that.resetFormData()
        app.isUser = true
        if (!app.isTodayAdd) {
          //新增添加记录
          const req = { db: dbTable.record, saveData: { date: _date.todayDate, createTime: Date.now(), year: _date.FullYear, month: _date.monthDate } }
          addData(req, (flag) => app.isTodayAdd = true)
        }
        wx.navigateBack({
          url: '../index/index'
        })
        msgTips('添加成功')
      } else {
        addErrorMsg({ error: data, dev: methods.getUserDev(), dete: _date.time })
      }
    })
  },
  updateRecord(options) {
    //修改数据
    upData(options, (flag, data) => {
      if (flag) {
        wx.navigateBack({
          url: '../index/index'
        })
        msgTips('修改成功')
      } else {
        addErrorMsg({ error: data, dev: methods.getUserDev(), dete: _date.time })
      }
    })
  },
  //获取数据
  getRecord(options) {
    const that = this;
    getData(options, (flag, data) => {
      if (flag) {
        if (data.type == '0') return that.setData({ expenditureRemarks: data.remarks, date: data.date, 'saveData.remarks': data.remarks, 'saveData.money': data.money, 'saveData.iconData': data.iconData, expenditureMoney: data.money })

        that.setData({
          incomeRemarks: data.remarks,
          date: data.date,
          'saveData.remarks': data.remarks,
          'saveData.money': data.money,
          'saveData.iconData': data.iconData,
          incomeMoney: data.money
        })

      }
    })
  },
  resetFormData() {
    this.setData({
      incomeMoney: '￥0.00',
      expenditureMoney: '￥0.00',
      seledate: '选择时间',
      isSele: '',
      expenditureRemarks: '输入备注',
      incomeRemarks: '输入备注'
    })
  },

  moneyChange(e) {
    if (typeof e.detail == 'object') return
    if (this.data.current === '0') {
      this.setData({
        expenditureMoney: e.detail
      })
    } else {
      this.setData({
        incomeMoney: e.detail
      })
    }
    this.setData({ 'saveData.money': e.detail })
  },

  moneyConfirm(e){
    const type = this.data.saveData.type == '0' ? 'expenditure' : 'income'
    this.verifyMoneyInput(e.detail, type)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('tipMsg')) {
      wx.setStorageSync("tipMsg", 1)
      this.setData({
        incomeMoney: "可以试试10+15+20哦",
        expenditureMoney: "可以试试10+15+20哦"
      })
    }

    app.getToday = true;
    if (!options.hasOwnProperty('type')) return;
    const that = this;
    setTimeout(function () {
      that.setData({
        isSele: options.menuid,
        type: options.type,
        current: options.current,
        'saveData.type': options.current
      });
      that._data.BillID = options.id
      //获取数据
      that.getRecord({ id: that._data.BillID })
    }, 100)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
    //页面关闭刷新数据
    methods.getMonthDataList({
      desc: 'cerateTime',
      condition: {
        openid: app.globalData.openid,
        monthDate: _date.monthDate
      }
    }, this.saveGlobalData);
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
    return {
      title: '你还记得你的钱花哪去了吗，一起来累积生活的小点滴呀',
      path: 'pages/index/index?shareID=' + wx.getStorageSync('uopenid')
    }
  }
})
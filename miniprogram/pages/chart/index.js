// pages/chart/index.js

const getList = require('../../utlis/methods')
const _date = require('../../utlis/date')
const { $Toast } = require('../../dist/base/index')
Page({
  _data: {
    prompt: '',
    yearDataArr: {
      type: 'year',
      arr: []
    },
    monthDataArr: {
      type: 'month',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    todayDataArr28: {
      type: 'today',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    },
    todayDataArr30: {
      type: 'today',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    },
    todayDataArr31: {
      type: 'today',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    tags: [{
      name: '支出',
      checked: true,
      color: 'blue'
    },
    {
      name: '收入',
      checked: false,
      color: 'blue'
    }
    ],
    lineData: {},
    pieData: {},
    //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
    lineOpts: {
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [0, 0, 0, 0],
      legend: {},
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        disabled: true,
        disableGrid: true,
        gridType: "dash",
        dashLength: 2,
        showTitle: true
      },
      extra: {
        line: {
          type: "curve",
          width: 2
        }
      }
    },
    pieOpts: {
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [5, 5, 5, 5],
      extra: {
        pie: {
          activeOpacity: 0.5,
          activeRadius: 10,
          offsetAngle: 0,
          labelWidth: 15,
          border: true,
          borderWidth: 3,
          borderColor: "#FFFFFF",
          linearType: "custom"
        }
      }
    },
    selectArray: '',
    sele: {
      year: true,
      month: true,
      day: false,
      income: false,
      consumption: true
    },
    selectIndex: '',
    dataList: [],
    notData: true,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    today: new Date().getDate()
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
    this.getServerData();
    this.getPieData();
    this.setData({
      selectArray: this._data.monthDataArr
    })
    this.initData()
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

  //初始数据
  initData() {
    //初始年数据
    const date = new Date().getFullYear();
    for (let i = date - 5; i <= date; i++) {
      this._data.yearDataArr.arr.push(i);
    }
  },

  getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        series: [{
          name: "收入",
          data: [1000, 8000, 2500, 3700, 4000, 2000, 8000, 8410, 9210, 10215, 11251, 12121]
        }]
      };
      this.setData({
        lineData: JSON.parse(JSON.stringify(res))
      });
    }, 500);
  },
  getPieData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        series: [{
          data: [{
            "name": "餐饮",
            "value": 1520
          }, {
            "name": "交通",
            "value": 480
          }, {
            "name": "住宿",
            "value": 2000
          }, {
            "name": "水果",
            "value": 180
          }, {
            "name": "医疗",
            "value": 288
          }, {
            "name": "购物",
            "value": 688
          }, {
            "name": "学习",
            "value": 28
          }, {
            "name": "娱乐活动",
            "value": 388
          }]
        }]
      };
      this.setData({
        pieData: JSON.parse(JSON.stringify(res))
      });
    }, 500);
  },

  /*页面点击事件*/
  //点击年按钮
  bindYearBtn() {
    this.toast("按年筛选")
    this.setData({
      selectArray: this._data.yearDataArr,
      'sele.day': false,
      'sele.month': false
    })
  },

  //点击月按钮
  bindMonthBtn() {
    this.toast("按月筛选")
    this.setData({
      selectArray: this._data.monthDataArr,
      'sele.day': false
    })
    const month = `${this.data.year}-${_date.addZero(this.data.month)}`
    //查询当月全部数据
    this.getMonthDataLists(month)
  },

  // 点击日按钮
  bindTodayBtn() {
    this.toast("按日筛选")
    const arr = [1, 3, 5, 7, 8, 10, 12]; //31天的月份
    const months = this.data.month == 2 ? this.calculatingLeapMonth(this.data.year) : arr.includes(this.data.month) ? this._data.todayDataArr31 : this._data.todayDataArr30
    this.setData({
      selectArray: months,
      'sele.day': !this.data.sele.day
    })
    //日数据是否选中，如果不是真的则是按月选择
    if (!this.data.sele.day) {
      this.setData({
        selectArray: this._data.monthDataArr,
        selectIndex: ''
      })
    }
    const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`
    //查询当天全部数据
    this.getTodayDataLists(dayData)
  },

  //绑定支出按钮
  bindConsumptionBtn() {
    this.setData({
      'sele.consumption': !this.data.sele.consumption,
      'sele.income': this.data.sele.consumption
    })
    //如果选择天则按天查询
    if (this.data.sele.day) {
      this._data.prompt = '当天'
      const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`
      this.consumptionTypeScreenData(dayData, 'consumption', 'day')
    } else {
      this._data.prompt = '本月'
      const month = `${this.data.year}-${_date.addZero(this.data.month)}`
      this.consumptionTypeScreenData(month, 'consumption', 'month')
    }
  },

  //绑定收入按钮
  bindIncomeBtn() {
    this.setData({
      'sele.consumption': this.data.sele.income,
      'sele.income': !this.data.sele.income
    })
    //如果选择天则按天查询
    if (this.data.sele.day) {
      this._data.prompt = '当天'
      const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`

      this.consumptionTypeScreenData(dayData, 'income', 'day')

    } else {
      this._data.prompt = '本月'
      const month = `${this.data.year}-${_date.addZero(this.data.month)}`

      this.consumptionTypeScreenData(month, 'income', 'month')
    }
  },
  //根据选择的日期获取日数据
  getTodayDataLists(dayData, type) {

    let options = {}
    options = { desc: 'date', condition: { openid: wx.getStorageSync('uopenid'), date: dayData } }

    if (type == 'income') {
      options.condition.type = 1
    } else if (type == 'consumption') {
      options.condition.type = 0
    }
    //options 查询条件  process 回调函数，接收查询成功的数据
    // getList.getTodayDataList(options, this.process)
  },

  // 绑定选择详细日期
  bindSelectDate(e) {
    const todayVal = this.dateScreenData(e);
    //选择天则按天查询
    if (todayVal) {
      this._data.prompt = '当天'
      const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`

      if (this.data.sele.income && this.data.sele.consumption) {
        //两个选中，则查询当天全部
        this.getTodayDataLists(dayData)
      } else if (this.data.sele.income) {
        //收入选中，则查询当天的收入
        this.getTodayDataLists(dayData, 'income')
      } else if (this.data.sele.consumption) {
        //支出选中，则查询当天的支出
        this.getTodayDataLists(dayData, 'consumption')
      } else {
        //都不选中，查询当天全部
        this.getTodayDataLists(dayData)
      }

    } else {
      this._data.prompt = '本月'
      const month = `${this.data.year}-${_date.addZero(this.data.month)}`

      if (this.data.sele.income && this.data.sele.consumption) {
        //两个选中，则查询当月全部
        this.getMonthDataLists(month)
      } else if (this.data.sele.income) {
        //收入选中，则查询当天的收入
        this.getMonthDataLists(month, 'income')
      } else if (this.data.sele.consumption) {
        //支出选中，则查询当天的支出
        this.getMonthDataLists(month, 'consumption')
      } else {
        //都不选中，查询当月全部
        this.getMonthDataLists(month)
      }
    }
  },
  //根据日期筛选数据，具体查询日期
  dateScreenData(e) {
    let yearVal = '', monthVal = '', todayVal = '';

    switch (e.target.dataset.type) {
      case 'year':
        yearVal = e.target.dataset.date
        break;
      case 'month':
        monthVal = e.target.dataset.date
        break;
      case 'today':
        todayVal = e.target.dataset.date
        break;
    }
    this.setData({
      selectIndex: e.target.dataset.date,
      year: yearVal || this.data.year,
      month: monthVal || this.data.month,
      today: todayVal || this.data.today
    })
    return todayVal
  },

  //根据选择的日期获取月数据
  getMonthDataLists(month, type) {
    let options = {}
    options = {
      desc: 'date',
      condition: {
        openid: wx.getStorageSync('uopenid'),
        monthDate: month
      }
    }
    if (type == 'income') {
      options.condition.type = 1
    } else if (type == 'consumption') {
      options.condition.type = 0
    }
    //options 查询条件  process 回调函数，接收查询成功的数据
    // getList.getMonthDataList(options, this.process)
  },
  /** 
   * 消费类型筛选数据
   * date 时间
   * billType 消费类型
   * dateType 时间类型
  */
   consumptionTypeScreenData(date, billType, dateType) {
    if (dateType == 'day') {

      if (this.data.sele.consumption) {
        //按消费查询
        this.getTodayDataLists(date, billType)
      } else if (this.data.sele.income) {
        //按收入查询
        this.getTodayDataLists(date, billType)
      } else {
        //如果支出和收入没有选择或者都选择，则按全部查询
        this.getTodayDataLists(date)
      }
    } else {
      if (this.data.sele.consumption) {
        //按消费查询
        this.getMonthDataLists(date, billType)
      } else if (this.data.sele.income) {
        this.getMonthDataLists(date, billType)//按收入查询
      } else {
        //如果支出和收入没有选择或者都选择，则按全部查询
        this.getMonthDataLists(date)
      }
    }
  },

  toast(message){
    $Toast({
      content: message,
      duration: 1,
    });
  }

})
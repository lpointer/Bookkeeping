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
      dataLabel: false,
      xAxis: {
        disabled: false,
        disableGrid: true,
        labelCount: 15
      },
      yAxis: {
        disabled: true,
        disableGrid: true,
        gridType: "dash",
        dashLength: 2,
        showTitle: false
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
    selectDateType: 'month',
    dataList: [],
    notData: true,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    today: new Date().getDate(),
    consumptionType: 'consumption',

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
    this.queryDateTypeData()
    this.setData({
      selectArray: this._data.monthDataArr,
      selectIndex: this.data.month
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
    return {
      title: '我发现了一个很好看的记账小程序，很方便呢，快来瞧瞧',
      path: 'pages/index/index?shareID=' + wx.getStorageSync('uopenid')
    }
  },
  getLineIndex(e) {
    const currentIndex = e.detail.currentIndex.index
    const moneyCount = e.detail.opts.series[0].data[currentIndex]
    const type = this.data.consumptionType === 'income' ? "1" : 0
    const day = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(currentIndex + 1)}` // 获取月数据
    wx.navigateTo({ url: `../chartDetailRecord/index?day=${day}&name=${day}&moneyCount=${moneyCount}&type=${type}&chartType=line`})
  },
  getPieIndex(e) {
    const currentIndex = e.detail.currentIndex
    const typeName = e.detail.opts.series[currentIndex].name
    const moneyCount = e.detail.opts.series[currentIndex].value
    const color = e.detail.opts.color[currentIndex]
    const type = this.data.consumptionType === 'income' ? "1" : 0
    const month = `${this.data.year}-${_date.addZero(this.data.month)}` // 获取月数据
    wx.navigateTo({ url: `../chartDetailRecord/index?month=${month}&name=${typeName}&moneyCount=${moneyCount}&type=${type}&chartType=pie&color=${color}`})
  },

  //初始数据
  initData() {
    //初始年数据
    const date = new Date().getFullYear();
    for (let i = date - 5; i <= date; i++) {
      this._data.yearDataArr.arr.push(i);
    }
  },

  /*页面点击事件*/
  //点击年按钮
  bindYearBtn() {
    // this.toast("按年筛选")
    this.setData({
      selectArray: this._data.yearDataArr,
      'sele.day': false,
      'sele.month': false,
      selectIndex: this.data.year,
      selectDateType: 'year'
    })
    this.getYearDataLists(this.data.year, this.data.consumptionType)
  },

  //点击月按钮
  bindMonthBtn() {
    // this.toast("按月筛选")
    this.setData({
      'sele.month': true,
      selectArray: this._data.monthDataArr,
      'sele.day': false,
      selectIndex: this.data.month,
      selectDateType: 'month'
    })
    const month = `${this.data.year}-${_date.addZero(this.data.month)}`
    //查询当月全部数据
    this.getMonthDataLists(month)
  },

  // 点击日按钮
  bindTodayBtn() {
    // this.toast("按日筛选")
    const arr = [1, 3, 5, 7, 8, 10, 12]; //31天的月份
    const months = this.data.month == 2 ? this.calculatingLeapMonth(this.data.year) : arr.includes(this.data.month) ? this._data.todayDataArr31 : this._data.todayDataArr30
    this.setData({
      selectArray: months,
      'sele.day': true,
      selectIndex: this.data.today,
      selectDateType: 'today'
    })
    //日数据是否选中，如果不是真的则是按月选择
    // if (!this.data.sele.day) {
    //   this.setData({
    //     selectArray: this._data.monthDataArr,
    //   })
    // }
    const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`
    //查询当天全部数据
    this.getTodayDataLists(dayData)
  },

  //绑定支出按钮
  bindConsumptionBtn() {
    this.setData({
      'sele.consumption': true,
      'sele.income': false
    })
    this.data.consumptionType = 'consumption'
    this.queryDateTypeData()
  },

  //绑定收入按钮
  bindIncomeBtn() {
    this.setData({
      'sele.consumption': false,
      'sele.income': true
    })
    this.data.consumptionType = 'income'
    this.queryDateTypeData()
  },

  /**
   * 根据日期类型查询数据
   * 
  */
  queryDateTypeData() {
    //如果选择天则按天查询
    if (this.data.sele.day) {
      this._data.prompt = '当天'
      const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`
      this.consumptionTypeScreenData(dayData, 'consumption', 'day')
    } else if (this.data.sele.month) {
      this._data.prompt = '本月'
      const month = `${this.data.year}-${_date.addZero(this.data.month)}`
      this.consumptionTypeScreenData(month, 'consumption', 'month')
    } else {
      this._data.prompt = '今年'
      this.consumptionTypeScreenData(this.data.year, 'consumption', 'year')
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
    getList.getTodayDataList(options, this.process)
  },

  // 绑定选择详细日期
  bindSelectDate(e) {
    // todo 需要修改查询日期，比如按年，按月，按天。目前只处理了天
    const todayVal = this.dateScreenData(e);

    switch (e.currentTarget.dataset.type) {
      case 'year':
        this._data.prompt = '本年'
        this.getYearDataLists(this.data.year, this.data.consumptionType)
        break;
      case 'month':
        this._data.prompt = '本月'
        const month = `${this.data.year}-${_date.addZero(this.data.month)}`
        this.getMonthDataLists(month, this.data.consumptionType)
        break;
      case 'today':
        this._data.prompt = '当天'
        const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`
        this.getTodayDataLists(dayData, this.data.consumptionType)
        break;
    }
  },
  //根据日期筛选数据，具体查询日期
  dateScreenData(e) {
    let yearVal = '', monthVal = '', todayVal = '';

    switch (e.currentTarget.dataset.type) {
      case 'year':
        yearVal = e.currentTarget.dataset.date
        break;
      case 'month':
        monthVal = e.currentTarget.dataset.date
        break;
      case 'today':
        todayVal = e.currentTarget.dataset.date
        break;
    }
    this.setData({
      selectIndex: e.currentTarget.dataset.date,
      selectDateType: e.currentTarget.dataset.type,
      year: yearVal || this.data.year,
      month: monthVal || this.data.month,
      today: todayVal || this.data.today
    })
    return todayVal
  },

  // 根据选择的年份获取年数据
  getYearDataLists(year, type) {
    let options = {}
    options = {
      desc: 'date',
      condition: {
        openid: wx.getStorageSync('uopenid'),
        year: year
      }
    }
    if (type === 'income') {
      options.condition.type = "1"
    } else if (type === 'consumption') {
      options.condition.type = 0
    }
    //options 查询条件  process 回调函数，接收查询成功的数据
    getList.getMonthDataList(options, this.process)
  },

  //根据选择的日期获取月数据
  getMonthDataLists(month, type) {
    // todo type 存在null
    let options = {}
    options = {
      desc: 'date',
      condition: {
        openid: wx.getStorageSync('uopenid'),
        monthDate: month
      }
    }
    if (type === 'income') {
      options.condition.type = "1"
    } else if (type === 'consumption') {
      options.condition.type = 0
    }
    //options 查询条件  process 回调函数，接收查询成功的数据
    getList.getMonthDataList(options, this.process)
    // this.process(this.getJson())
  },
  /** 
   * 消费类型筛选数据
   * date 时间
   * billType 消费类型
   * dateType 时间类型
  */
  consumptionTypeScreenData(date, billType, dateType) {
    if (dateType == 'day') {

      //按消费查询
      this.getTodayDataLists(date, this.data.consumptionType)
    } else if (dateType == 'month') {
      //按消费查询
      this.getMonthDataLists(date, this.data.consumptionType)
    } else {
      //按消费查询
      this.getYearDataLists(date, this.data.consumptionType)
    }
  },
  process(data) {
    if (Object.prototype.toString.call(data) !== '[object Array]') return
    this.handlerLineData(data)
  },

  handlerLineData(data) {
    const name = this.data.consumptionType === 'consumption' ? "支出" : "收入"
    const consumptionType = this.data.consumptionType === 'consumption' ? 0 : 1
    // line 日期
    const categories = []
    // line 数据
    const series = [{ name: name, data: [] }]
    let money = 0
    let handleJson = {}
    let lineMap = new Map()
    let pieMaps = new Map()
    // 当前页面只有年和月可选，日不可选，所以不需要判断日
    const selectDateTypeIsYear = this.data.selectDateType === 'year'

    data.map((item, index) => {
      let tempDate = item.date.split('-')[selectDateTypeIsYear ? 1 : 2]
      const len = categories.length
      var nextData = data[index + 1]
      // 计算line图表的数据
      if (item.type == consumptionType && nextData && item.date == nextData.date) {
        if (money == 0) {
          money = parseFloat(item.money) + parseFloat(nextData.money)
        } else {
          money += parseFloat(nextData.money)
        }
      } else {
        if (money == 0) {
          money = parseFloat(item.money)
        }
        let saveMoney = money.toString().includes('.') ? parseFloat(money.toFixed(2)) : money
        const alreadyMoney = lineMap.get(tempDate)
        if (alreadyMoney) {
          saveMoney += alreadyMoney
          lineMap.set(tempDate, parseFloat(saveMoney.toFixed(2)))
        } else {
          lineMap.set(tempDate, saveMoney)
        }

        money = 0
      }

      // 计算pie饼图同一类型的消费/收入金额
      if (item.type == consumptionType) {
        const typeName = item.iconData.name
        let typeMoney = pieMaps.get(typeName)
        const pieMoney = parseFloat(item.money);
        if (typeMoney) {
          typeMoney = parseFloat(typeMoney.toFixed(2)) + pieMoney
          pieMaps.set(typeName, parseFloat(parseFloat(typeMoney).toFixed(2)))
        } else {
          pieMaps.set(typeName, parseFloat(pieMoney.toFixed(2)))
        }
      }

      if (index == (data.length - 1)) {
        this.handlerPieData(pieMaps)
      }
    })

    //获取当前线条显示的数据，只有年（12）或者月（30/31）
    const lineDate = selectDateTypeIsYear ? 12 : this.getMonthDate()
    // 把没有记录或者没有消费收入的日期设置为0
    for (let i = 0; i < lineDate; i++) {
      let j = i + 1
      if (j < 10) {
        j = "0" + j
      }
      let key = lineMap.get(j.toString())
      if (!key) {
        lineMap.set(j.toString(), 0)
      }
    }
    const categorie = []

    //把map转为数据，方便进行排序
    let arrayObj = Array.from(lineMap)
    // 根据key值排序
    arrayObj.sort((a, b) => a[0] - b[0])
    arrayObj.map(i => {
      categorie.push(i[0])  //key
      series[0].data.push(i[1].toString())  //value
    })
    handleJson = {
      'categories': categorie,
      'series': series
    }
    this.setData({
      lineData: JSON.parse(JSON.stringify(handleJson))
    });

    if (!data.length) {
      this.handlerPieData(pieMaps)
    }
  },

  handlerPieData(maps) {
    const series = [{ data: [] }]
    const res = []
    for (let [key, value] of maps) {
      res.push({ name: key, value: value })
    }
    series[0].data = res
    this.setData({
      pieData: JSON.parse(JSON.stringify({ series }))
    })
  },

  toast(message) {
    $Toast({
      content: message,
      duration: 1,
    });
  },

  getMonthDate() {
    const arr = [1, 3, 5, 7, 8, 10, 12]; //31天的月份
    return this.data.month == 2 ? this.calculatingLeapMonth(this.data.year).length : arr.includes(this.data.month) ? 31 : 30
  }
})
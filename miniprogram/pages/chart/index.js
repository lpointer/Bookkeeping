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
    dataList: [],
    notData: true,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    today: new Date().getDate(),
    consumptionType: '',

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
      console.log(res)
      this.setData({
        pieData: JSON.parse(JSON.stringify(res))
      });
    }, 500);
  },

  /*页面点击事件*/
  //点击年按钮
  bindYearBtn() {
    // this.toast("按年筛选")
    this.setData({
      selectArray: this._data.yearDataArr,
      'sele.day': false,
      'sele.month': false,
      selectIndex: this.data.year
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
      selectIndex: this.data.month
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
    console.log(options)
    //options 查询条件  process 回调函数，接收查询成功的数据
    getList.getTodayDataList(options, this.process)
  },

  // 绑定选择详细日期
  bindSelectDate(e) {
    // todo 需要修改查询日期，比如按年，按月，按天。目前只处理了天
    const todayVal = this.dateScreenData(e);
    //选择天则按天查询
    if (todayVal) {
      this._data.prompt = '当天'
      const dayData = `${this.data.year}-${_date.addZero(this.data.month)}-${_date.addZero(this.data.today)}`

      this.getTodayDataLists(dayData, this.data.consumptionType)

    } else {
      this._data.prompt = '本月'
      const month = `${this.data.year}-${_date.addZero(this.data.month)}`

      this.getMonthDataLists(month, this.data.consumptionType)
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
      options.condition.type = 1
    } else if (type === 'consumption') {
      options.condition.type = 0
    }
    console.log(options)
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
      options.condition.type = 1
    } else if (type === 'consumption') {
      options.condition.type = 0
    }
    console.log(options)
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

      if (this.data.consumptionType) {
        //按消费查询
        this.getTodayDataLists(date, this.data.consumptionType)
      } else {
        //如果支出和收入没有选择或者都选择，则按全部查询
        this.getTodayDataLists(date)
      }
    } else if (dateType == 'month') {
      if (this.data.consumptionType) {
        //按消费查询
        this.getMonthDataLists(date, this.data.consumptionType)
      } else {
        //如果支出和收入没有选择或者都选择，则按全部查询
        this.getMonthDataLists(date)
      }
    } else {
      if (this.data.consumptionType) {
        //按消费查询
        this.getMonthDataLists(date, this.data.consumptionType)
      } else {
        //如果支出和收入没有选择或者都选择，则按全部查询
        this.getMonthDataLists(date)
      }
    }
  },
  process(data) {
    if (Object.prototype.toString.call(data) !== '[object Array]') return
    this.handlerLineData(data)
  },

  handlerLineData(data) {
    const name = this.data.consumptionType === 'consumption' ? "收入" : "支出"
    const consumptionType = this.data.consumptionType === 'consumption' ? 1 : 0
    // line 日期
    const categories = []
    // line 数据
    const series = [{ name: name, data: [] }]
    let money = 0
    let handleJson = {}
    let lineMap = new Map()
    let pieMaps = new Map()
    data.map((item, index) => {
      let tempDate = item.date.split('-')[2]
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
        const saveMoney = money.toString().includes('.') ? parseFloat(money.toFixed(2)) : money
        lineMap.set(tempDate, saveMoney)
        money = 0
      }

      // 计算同一类型的消费/收入金额
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

    //获取当前月份天数
    const monthDate = this.getMonthDate()
    // 把没有记录或者没有消费收入的日期设置为0
    for (let i = 0; i < monthDate; i++) {
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

    // console.log(lineMap)
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
  },

  handlerPieData(maps) {
    const series = [{ data: [] }]
    const res = []
    console.log(maps);
    for (let [key, value] of maps) {
      res.push({ name: key, value: value })
    }
    series[0].data = res
    console.log(series);
    this.setData({
      pieData: JSON.parse(JSON.stringify({ series }))
    });
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
  },

})
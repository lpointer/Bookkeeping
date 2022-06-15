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
    // getList.getMonthDataList(options, this.process)
    this.process(this.getJson())
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
    this.handlerPieData(data)
  },

  handlerLineData(data) {
    const name = this.data.consumptionType === 'consumption' ? "收入" : "支出"
    const categories = [], series = [{ name: name, data: [] }]
    let money = 0
    let handleJson = {}
    data.map((item, index) => {
      let tempDate = item.date.split('-')[2]
      const len = categories.length
      var nextData = data[index + 1]
      if (item.type == 0 && nextData && item.date == nextData.date) {
        if (money == 0) {
          money = parseFloat(item.money) + parseFloat(nextData.money)
        } else {
          money += parseFloat(nextData.money)
        }
      } else {
        if (money == 0) {
          money = parseFloat(item.money)
        }
        series[0].data.push(money)
        money = 0

      }
      if (categories[len - 1] != tempDate) {
        categories.push(tempDate)
      }

      if (index == (data.length - 1)) {
        console.log(series[0].data)
        series[0].data.reverse()
        categories.reverse()
        const selectArray = this.data.selectArray.arr
        console.log(selectArray)
      }
    })

    handleJson = {
      'categories': categories,
      'series': series
    }
    console.log(handleJson)
    console.log(JSON.stringify(handleJson))
    // handleJson.series[0].data.reverse()
    this.setData({
      lineData: JSON.parse(JSON.stringify(handleJson))
    });
  },

  handlerPieData() {

  },

  toast(message) {
    $Toast({
      content: message,
      duration: 1,
    });
  },

  getJson() {
    return [{ "_id": "0ab5303b62a9dbc009816cf47b86e724", "cerateTime": 1655299009154, "date": "2022-06-15", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "午餐", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "monthDate": "2022-06", "money": "12.5" }, { "_id": "b69f67c062a9dbd1074bd2c06f2f1774", "money": "3", "monthDate": "2022-06", "remarks": "充电", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1655299025866, "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" }, "date": "2022-06-15", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0 }, { "_id": "8f75309d62a8821a088840c363494f6a", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-14", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "12", "year": 2022, "cerateTime": 1655210523094, "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "午餐" }, { "_id": "8f75309d62a8944b088a3b837324dbb8", "remarks": "晚餐", "year": 2022, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "27", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1655215180894, "date": "2022-06-14", "monthDate": "2022-06", "type": 0 }, { "_id": "f6e08a6462a7517507deee0b3bf6edaa", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1655132534159, "date": "2022-06-13", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "18", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "午餐", "monthDate": "2022-06", "type": 0, "year": 2022 }, { "_id": "0ab5303b62a894670955c465167f92ea", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-13", "iconData": { "icon": "icon-gouwu", "id": 3, "name": "购物" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "year": 2022, "cerateTime": 1655215208273, "money": "129", "monthDate": "2022-06", "remarks": "剃须刀", "type": 0 }, { "_id": "058dfefe62a8948308c342847cb00ac6", "date": "2022-06-13", "monthDate": "2022-06", "year": 2022, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1655215236091, "iconData": { "icon": "icon-gouwu", "id": 3, "name": "购物" }, "money": "146", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "鱼竿", "type": 0 }, { "_id": "058dfefe62a4a442084ed23e3c31a24a", "remarks": "停车费", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "money": 23, "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654957122579, "date": "2022-06-11", "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" } }, { "_id": "b69f67c062a4a45e06ca3c874d0573c2", "cerateTime": 1654957150781, "date": "2022-06-11", "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" }, "money": "15", "remarks": "过路费", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0 }, { "_id": "16db756f62a4af6d06b563b42a1470e1", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-11", "iconData": { "id": 1, "name": "水果", "icon": "icon-shuiguo" }, "money": "23", "monthDate": "2022-06", "remarks": "西瓜🍉葡萄🍇油桃", "type": 0, "cerateTime": 1654959981984, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4" }, { "_id": "8f75309d62a4afe408195cde44eb9be2", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0, "money": "15.5", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "李子香蕉🍌", "cerateTime": 1654960101231, "date": "2022-06-11", "iconData": { "id": 1, "name": "水果", "icon": "icon-shuiguo" } }, { "_id": "6d85a2b962a31ad709d74f333e40051d", "cerateTime": 1654856408304, "date": "2022-06-10", "money": "16", "monthDate": "2022-06", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "id": 2, "name": "餐饮", "icon": "icon-canyin" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "午餐", "type": 0 }, { "_id": "6842667962a207b00551a13b50b7fc51", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654785967576, "date": "2022-06-09", "money": "17", "remarks": "午餐" }, { "_id": "8f75309d62a207bb07d430f921dc4155", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "充电", "type": 0, "date": "2022-06-09", "iconData": { "id": 8, "name": "交通", "icon": "icon-jiaotong" }, "money": "2", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654785980153 }, { "_id": "b69f67c062a0c08e0671994138f2dd1d", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "money": "19", "monthDate": "2022-06", "remarks": "午餐", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654702223064, "date": "2022-06-08" }, { "_id": "b69f67c062a0c09706719a0b4bfda9d2", "cerateTime": 1654702231620, "date": "2022-06-08", "money": "2", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "充电", "type": 0, "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" } }, { "_id": "16db756f62a0c0b6065e1f482875a131", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-08", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "雨衣", "type": 0, "cerateTime": 1654702262868, "iconData": { "icon": "icon-gouwu", "id": 3, "name": "购物" }, "money": "18.8", "monthDate": "2022-06" }, { "_id": "16db756f62a0c0c6065e202c5e596396", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "1.5", "monthDate": "2022-06", "cerateTime": 1654702278943, "date": "2022-06-08", "remarks": "香菜葱", "type": 0 }, { "_id": "6d85a2b9629f66fa09525bc33d5a875a", "cerateTime": 1654613754400, "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "15", "remarks": "午餐", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-07", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0 }, { "_id": "ca780ad5629f6703066993f5580c6b71", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-07", "money": "3", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "充电", "type": 0, "cerateTime": 1654613763328, "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" } }, { "_id": "6d85a2b9629e0e3c091c355e7a562a8f", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "充电", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" }, "money": "3.6", "cerateTime": 1654525500444, "date": "2022-06-06", "type": 0 }, { "_id": "8f75309d629e0e47075b25125bed6b3e", "date": "2022-06-06", "iconData": { "name": "餐饮", "icon": "icon-canyin", "id": 2 }, "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654525511881, "money": "16", "remarks": "午餐" }, { "_id": "68426679629c5ff404d8a73c5335c8e2", "iconData": { "id": 9, "name": "医疗", "icon": "icon-yiliao" }, "monthDate": "2022-06", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-05", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "拿药", "cerateTime": 1654415348392, "money": "16.3" }, { "_id": "16db756f629c600505e677c66f826d83", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-05", "money": "2.5", "monthDate": "2022-06", "type": 0, "cerateTime": 1654415365121, "iconData": { "id": 2, "name": "餐饮", "icon": "icon-canyin" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "早餐" }, { "_id": "16db756f629c601705e67947536f2278", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-04", "money": "43.8", "monthDate": "2022-06", "remarks": "牛奶", "type": 0, "cerateTime": 1654415383055, "iconData": { "icon": "icon-lingshi", "id": 4, "name": "零食" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4" }, { "_id": "058dfefe629c6036074f3c363593d05a", "cerateTime": 1654415413505, "date": "2022-06-04", "iconData": { "id": 2, "name": "餐饮", "icon": "icon-canyin" }, "money": "61", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "午餐", "type": 0 }, { "_id": "68426679629c604c04d8aca8046aca97", "cerateTime": 1654415436146, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "money": "15", "monthDate": "2022-06", "remarks": "桶装水", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-04", "iconData": { "icon": "icon-lingshi", "id": 4, "name": "零食" } }, { "_id": "6d85a2b9629c609a08d21a6b3fb5eaab", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654415513518, "monthDate": "2022-06", "remarks": "早餐", "date": "2022-06-04", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "3" }, { "_id": "8f75309d629a1af706e2acaa47bf3616", "cerateTime": 1654266614987, "date": "2022-06-03", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "房租", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "icon": "icon-zhusui", "id": 11, "name": "住宿" }, "money": "2002", "type": 0 }, { "_id": "16db756f629a1b2005b5124c4e9367fc", "iconData": { "icon": "icon-lingshi", "id": 4, "name": "零食" }, "money": "113", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "牛奶🥛和苹果🍎", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654266656740, "date": "2022-06-03", "type": 0 }, { "_id": "f6e08a64629a1b4b06781f797bc30c8a", "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" }, "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "高速费", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654266699202, "date": "2022-06-03", "money": 162.65 }, { "_id": "68426679629a1b9d04b04edd6974a5c3", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654266781680, "date": "2022-06-03", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "顺风车", "iconData": { "icon": "icon-qitashouru", "id": 25, "name": "其他收入" }, "money": 163, "monthDate": "2022-06", "type": "1" }, { "_id": "0a4ec1f9629a1a0c087832f906bdf544", "cerateTime": 1654266380527, "date": "2022-06-02", "monthDate": "2022-06", "remarks": "停车", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "money": "20", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "icon": "icon-jiaotong", "id": 8, "name": "交通" } }, { "_id": "0a4ec1f9629a1a27087834e8410db8eb", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "money": "34", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "午餐", "type": 0, "cerateTime": 1654266407404, "date": "2022-06-02", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" } }, { "_id": "ca780ad5629a1a4a05e2d166422d953d", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654266442758, "iconData": { "icon": "icon-shuiguo", "id": 1, "name": "水果" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "榴莲", "date": "2022-06-02", "money": "88", "monthDate": "2022-06", "type": 0 }, { "_id": "b69f67c0629a1a5905c2902374cee343", "cerateTime": 1654266455092, "money": "11", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "remarks": "青菜", "type": 0, "date": "2022-06-02" }, { "_id": "ca780ad5629a1ab805e2d83c403bb4dd", "monthDate": "2022-06", "remarks": "麻辣烫备菜", "cerateTime": 1654266552416, "date": "2022-06-02", "iconData": { "icon": "icon-canyin", "id": 2, "name": "餐饮" }, "money": "15.00", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4" }, { "_id": "8f75309d629a1ae206e2a8c51a8152c0", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "樱桃🍒苹果🍎", "date": "2022-06-02", "money": "18.5", "monthDate": "2022-06", "type": 0, "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654266594501, "iconData": { "icon": "icon-shuiguo", "id": 1, "name": "水果" } }, { "_id": "058dfefe629a1972071359a47ada64fc", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "爱乐维", "type": 0, "cerateTime": 1654266226535, "money": "269", "monthDate": "2022-06", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-01", "iconData": { "icon": "icon-yiliao", "id": 9, "name": "医疗" } }, { "_id": "b69f67c0629a198e05c280372adb5f04", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "cerateTime": 1654266254503, "iconData": { "icon": "icon-gouwu", "id": 3, "name": "购物" }, "remarks": "钓铅", "type": 0, "date": "2022-06-01", "money": "8", "monthDate": "2022-06", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4" }, { "_id": "f6e08a64629a19cc067801da58581737", "cerateTime": 1654266485916, "iconData": { "icon": "icon-lingshi", "id": 4, "name": "零食" }, "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "remarks": "超市", "type": "0", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "date": "2022-06-01", "money": "35.5", "monthDate": "2022-06" }, { "_id": "8f75309d629a19e106e2901e00e67912", "monthDate": "2022-06", "remarks": "充电", "type": 0, "cerateTime": 1654266337366, "date": "2022-06-01", "iconData": { "id": 8, "name": "交通", "icon": "icon-jiaotong" }, "money": "4", "openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4", "_openid": "ofCua5TWiwWKmsK6H1f_hXk8Ncm4" }]
  }
})
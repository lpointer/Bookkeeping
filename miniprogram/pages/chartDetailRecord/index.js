// miniprogram/pages/demo/index.js
const processData = require('../../utlis/ProcessingData')
const getList = require('../../utlis/methods')
const { dbTable, deleteData, msgTips } = require('../../services/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actions: [
      { name: '修改', color: '#fff', fontsize: '20', width: 100, icon: 'editor', background: '#79afff' },
      { name: '删除', color: '#000', width: 100, color: '#80848f', fontsize: '20', icon: 'delete' }
    ],
    dataList: [],
    notData: true,
    moneyCount: 0,
    montyColor: '#e91e63'
  },

  //获取查询到的数据进行过滤
  process(data) {
    const tempList = this.filterToday(data)
    this.setData({ dataList: tempList })
  },

  //过滤日期，每天只显示一个日期
  filterToday(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') return arr
    const dList = arr;
    if (dList.length < 1) return dList
    dList.forEach((item, index) => {
      var nextData = arr[index + 1]
      if (!item.hasOwnProperty("date")) return arr
      if (nextData && item.date == nextData.date) {
        nextData.isSameTime = true
      }
    })

    return dList;
  },

  loadLineDetailData(options) {
    const queryOpt = {
      desc: 'cerateTime',
      condition: {
        openid: wx.getStorageSync('uopenid'),
        date: options.day,
        type: options.type == '0' ? 0 : "1"
      }
    }
    this.loadData(queryOpt)
  },

  loadPieDetailData(options) {
    const queryOpt = {
      desc: 'cerateTime',
      condition: {
        openid: wx.getStorageSync('uopenid'),
        monthDate: options.month,
        type: options.type == '0' ? 0 : "1",
        iconData: {
          name: options.name
        }
      }
    }
    this.loadData(queryOpt)
  },

  loadData(queryOpt) {
    let isNotData = true
    getList.getBillRecord(queryOpt).then(res => {
      isNotData = false
      this.process(res)
    }).catch(err => {
      console.log(err)
    })
    this.setData({
      notData: isNotData
    })
  },

  
  //列表滑动菜单
  clickSwipeoutMenu(e) {
    const options = {
      index: e.detail.index,
      id: e.currentTarget.dataset.id,
      menuid: e.currentTarget.dataset.menuid,
      type: e.currentTarget.dataset.type,
      money: e.currentTarget.dataset.money,
      currIndex: e.currentTarget.dataset.index
    };
    this.operatData(options)
  },

  
  //列表长按事件
  handlerCloseButton(e) {
    const that = this;
    that.setData({
      toggle: e.detail.index
    });
    wx.showActionSheet({
      itemList: ['修改', '删除'],
      success(res) {
        const options = {
          index: res.tapIndex,
          id: e.currentTarget.dataset.id,
          menuid: e.currentTarget.dataset.menuid,
          type: e.currentTarget.dataset.type,
          money: e.currentTarget.dataset.money,
          currIndex: e.currentTarget.dataset.index
        }
        that.operatData(options)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  //修改/删除数据
  operatData(options) {
    const that = this;
    if (Object.prototype.toString.call(options) !== '[object Object]') throw options + 'Not an object'
    if (!options.index) {
      //修改
      const url = `../addMoney/index?id=${options.id}&menuid=${options.menuid}&type=edit&current=${options.type}`
      wx.navigateTo({ url: url });
    } else {
      //防止删除某天第一条数据后合并到上一天的数据
      if (!that.data.dataList[options.currIndex].isSameTime) {
        that.data.dataList[options.currIndex + 1].isSameTime = false
      }
      //删除      
      deleteData({ db: dbTable.cb, id: options.id }, function (flag, data) {
        if (flag) {
          msgTips('删除成功')
          const newData = that.data.dataList.filter(item => {
            if (options.id !== item._id) {
              return true
            }
          })
          let switchsShow = true
          if (!newData.length) switchsShow = false
          that.setData({
            dataList: newData,
            'switchs.dataList': switchsShow
          })
          that.removeRecalculate(options.money, options.type)

        }
      })
    }
  },

  //删除重新计算
  removeRecalculate(num, type) {
    if (type == '0') {
      this.setData({
        //支出
        moneyConsumption: (this.data.money.moneyConsumption - 0) - (num - 0)
      })
    } else {
      this.setData({
        //收入
        moneyIncome: (this.data.money.moneyIncome - 0) - (num - 0)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.chartType == 'pie') {
      this.loadPieDetailData(options)
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: options.color,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }
    if (options.chartType == 'line') {
      this.loadLineDetailData(options)
    }
    this.setData({
      moneyCount: options.moneyCount,
      montyColor: options.type == '0' ? '#e91e63' : '#0aff0a'
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
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
      title: '小点滴记账，快来记录生活的小点滴！',
      path: 'pages/index/index?shareID=' + wx.getStorageSync('uopenid')
    }
  },
})
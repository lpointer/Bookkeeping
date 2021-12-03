const { db, dbTable, addData, msgTips, addErrorMsg } = require('../../services/api')
const methods = require('../../utlis/methods')
const _date = require('../../utlis/date')
Page({

  /**
   * 页面的初始数据
   */
  _data: {
    openid: ''
  },
  data: {
    radioItem: [
      { id: '1', name: '建议', checked: true },
      { id: '2', name: '反馈', checked: false }
    ],
    type: '建议',
    contentVal: '',
    contactInfoVal: ''
  },

  radioChange: function (e) {
    const value = e.detail.value;
    this.setData({
      type: value
    })
  },
  content: function (e) {
    const value = e.detail.value;
    if (!value) return;
    this.setData({
      contentVal: value
    })
  },
  contactInfo: function (e) {
    const value = e.detail.value;
    if (!value) return;
    this.setData({
      contactInfoVal: value
    })
  },
  saveData() {
    const that = this;
    if (!that.data.contentVal) return msgTips(`请输入${that.data.type}的描述`);
    const options = {
      saveData: {
        all: 'all',
        time: Date.now(),              //添加时间
        type: that.data.type,         //类型
        content: that.data.contentVal,//内容
        contactInfo: that.data.contactInfoVal,//联系方式
        openid: this._data.openid,          //如果是分享的就有openid
        dev: methods.getUserDev()
      },
      db: dbTable.sf
    }
    addData(options, (flag, data) => {
      if (flag) {
        wx.showToast({
          title: `我已经收到你的${that.data.type}的信息啦，我会马上去处理的，感谢你的信任。`,
          icon: 'none',
          duration: 3500,
          mask: true
        })
      } else {
        addErrorMsg({ error: data, dev: methods.getUserDev(), dete: _date.time })
      }
    })
  },
  add() {
    this.saveData();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.shareID) this._data.share = options.share
    this.getOpenId();
  },
  getOpenId() {

    this._data.openid = wx.getStorageSync('uopenid');
    if (this._data.openid) return
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this._data.openid = res.result.openid;
        wx.setStorageSync('uopenid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)

      }
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
      title: '快来帮我评评价',
      path: 'pages/suggestFeedback/index?share=1'
    }
  }
})
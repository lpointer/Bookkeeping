// miniprogram/pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  _data: {
    authorization: false,  //默认没有授权
  },
  data: {
    isAdmin: false,
    avatarUrl: '',
    username: '匿名者',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authorization: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里设置一个缓冲，在index页面获取到有这个缓冲就不设置红点

    // 隐藏红点
    if (!wx.getStorageSync('RedDot')) {
      wx.setStorageSync('RedDot', 1)
      wx.hideTabBarRedDot({ index: 2 })
    }



  },
  //建议与反馈
  bindSF() {
    wx.navigateTo({ url: '../suggestFeedback/index' })
  },
  //我的账单
  bindBill() {
    if (this._data.authorization) return wx.navigateTo({ url: '../bill/index' })
    //没有授权弹出框授权提示框
    this.setData({ authorization: true })
  },
  //查看反馈信息
  bindSfInfo() {
    wx.navigateTo({ url: '../sfInfo/index' })
  },
  cloneMask() {
    this.setData({ authorization: false })
  },

  bindGetUserInfo(e) {
    const that = this;
    that.setData({ authorization: false })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that._data.authorization = true;
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                username: res.userInfo.nickName
              })
            }
          })
        } else {
          //如果没有授权，点击我的账单则需要提示授权
          // that.setData({ authorization: true })
        }
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
    const adminArr = ['ofCua5TWiwWKmsK6H1f_hXk8Ncm4']
    if (adminArr.includes(wx.getStorageSync('uopenid'))) this.setData({ isAdmin: true })
    wx.setBackgroundColor({
      backgroundColor: '#ffffff', // 窗口的背景色为白色
    })
    const that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that._data.authorization = true;
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                username: res.userInfo.nickName
              })
            }
          })
        } else {
          //如果没有授权，点击我的账单则需要提示授权
        }
      }
    })
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
      title: '我发现了一个很有用的记账小程序，快来瞧瞧',
      path: 'pages/index/index?shareID=' + wx.getStorageSync('uopenid')
    }
  }
})
// pages/chart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartData: {},
    //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
    opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [0,0,0,0],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          disabled:true,
          disableGrid:true,
          gridType: "dash",
          dashLength: 2,
          showTitle:true
        },
        extra: {
          line: {
            type: "curve",
            width: 2
          }
        }
      }
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

  getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            categories: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
            series: [
              {
                name: "收入",
                data: [1000,8000,2500,3700,4000,2000,8000,8410,9210,10215,11251,12121]
              },
              {
                name: "支出",
                data: [7000,4000,6500,10000,4400,6800,7112,8412,6245,10214,1874,15695]
              }
            ]
          };
          this.setData({ chartData: JSON.parse(JSON.stringify(res)) });
      }, 500);
    },
})
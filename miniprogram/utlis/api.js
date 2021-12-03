const jwdb = wx.cloud.database({
  config: {
    env: 'jianwenh-d6e482'
  }
})
const jzdb = wx.cloud.database({
  config: {
    env: 'jizhang-519e30'
  }
})
const dbTable = {
  cb: 'consumptionBill',   //消费账单
  budget: 'budget',        //预算消费
  user: 'baseUser',        //用户信息
}
module.exports = {
  jwdb,
  jzdb,
  dbTable,
  getUser() {

  },
  getDataDemo() {
    const MAX_LIMIT = 100
    exports.main = async (event, context) => {
      // 先取出集合记录总数
      const countResult = await jzdb.collection(dbTable.cb).count()
      //总数
      const total = countResult.total
      // 计算需分几次取
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = jzdb.collection(dbTable.cb).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
      }
      console.log(tasks);
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => ({
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }))
    }
  },
  getData(options) {
    console.log(options);
    //表名称
    jzdb.collection(dbTable.cb).doc(options.id).get().then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  getDataList() {

  },
  addData(options) {

    // console.log(db);
    console.log(options.saveData);
    //counters数据表
    jzdb.collection(dbTable.cb).add({
      data: options.saveData
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '添加成功',
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
    })
  }
}
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
const db = wx.cloud.database();

const dbTable = {
  cb: 'ConsumptionBill',   //消费账单
  budget: 'budget',        //预算消费
  user: 'BaseUser',        //用户信息
  errMsg: 'ErrorMessage',   //错误信息
  record: 'AddRecord',     //添加记录
  sf: 'SuggestFeedback'    //建议与反馈
}
module.exports = {
  jwdb,
  jzdb,
  db,
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
      // 等待所有
      return (await Promise.all(tasks)).reduce((acc, cur) => ({
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }))
    }
  },

  getData(options, fn) {
    //表名称
    jzdb.collection(dbTable.cb)
      .doc(options.id)
      .get()
      .then(res => fn(true, res.data))
      .catch(err => fn(false, err))
  },

  getDataList(options, fn) {
    //表名称
    jzdb.collection(options.db)
      .where(options.condition)
      .get()
      .then(res => {
        if (typeof fn === 'function') fn(res.data)
      })
      .catch(err => {
        if (typeof fn === 'function') fn(err)
      })
  },

  //添加数据
  addData(options, fn) {
    //counters数据表
    jzdb.collection(options.db)
      .add({ data: options.saveData })
      .then(res => fn(true))
      .catch(err => fn(false, err))
  },

  //根据id修改一条数据
  upData(options, fn) {
    db.collection(options.db)
      .doc(options.id)
      .update({ data: options.data }) // data 传入需要局部更新的数据，表示将 done 字段置为 true 
      .then(res => fn(true, res.stats.updated))
      .catch(err => fn(false, err))
  },

  //根据id删除一条数据
  deleteData(options, fn) {
    db.collection(options.db)
      .doc(options.id)
      .remove()
      .then(res => fn(true, res.stats.removed))
      .catch(err => fn(false, err))
  },

  //添加错误信息
  addErrorMsg(options) {
    //counters数据表
    jzdb.collection(dbTable.errMsg).add({
      data: options
    }).then(res => {
      wx.showToast({
        title: '问题上报成功',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none',
        duration: 2000,
        mask: true
      })
    })
  },
  msgTips(content, icon = 'none', duration = 2000) {
    wx.showToast({
      title: content,
      icon: `${icon}`,
      duration: duration,
      mask: true
    })
  },
}
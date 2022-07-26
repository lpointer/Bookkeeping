// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'yiqiju-8541ed'
})
const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const { dbTable, condition, desc } = event
  const wxContext = cloud.getWXContext()

  // 先取出集合记录总数
  const countResult = await db.collection(dbTable).where(condition).count()
  console.log(countResult);
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection(dbTable)
      .where(condition)
      .orderBy(desc, 'desc')
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg,
  }))
}
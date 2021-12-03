module.exports = {

  /*
  数据过滤
  arr 数组
  attr 对象属性
  con 过滤条件
  */
  DataFilter(arr, attr, con) {
    return arr.filter((item) => {
      if (!item.hasOwnProperty(attr)) return arr
      return item[attr] == con
    })
  },

  /*
  数据模糊过滤
  arr 数组
  attr 对象属性
  con 过滤条件
  */
  DataLikeFilter(arr, attr, con) {
    return arr.filter((item) => {
      if (!item.hasOwnProperty(attr)) return arr
      return item[attr].includes(con)
    })
  },

  //统计收入数据
  incomeDataCount(x, y) {
    // debugger
    if (!y.money.toString().includes('.')) return (y.money - 0) + (x - 0);
    return ((y.money - 0) + (x - 0)).toFixed(2);

  },
  //统计消费数据
  consumptionDataCount(x, y) {
    if (y.type == '0') {
      if (!y.money.toString().includes('.')) return (y.money - 0) + (x - 0);
      return ((y.money - 0) + (x - 0)).toFixed(2);
    }
  },
  DataCount(x, y) {
    if (!y.toString().includes('.')) return (y - 0) + (x - 0);
    return ((y - 0) + (x - 0)).toFixed(2);
  },

}


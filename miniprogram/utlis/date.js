
//补零
const addZero = num => num > 9 ? num : '0' + num

const date = new Date();
const FullYear = date.getFullYear();
const Month = (date.getMonth() + 1);
const DateTime = date.getDate();
const Hour = date.getHours();
const Minute = date.getMinutes();
const Second = date.getSeconds();

const monthDate = FullYear + '-' + addZero(Month);
const todayDate = FullYear + '-' + addZero(Month) + '-' + addZero(DateTime);
const time = FullYear + '-' + addZero(Month) + '-' + addZero(DateTime) + ' ' + Hour + ':' + Minute + ':' + addZero(Second);

module.exports = {
  FullYear, Month, monthDate, todayDate, time, addZero
}

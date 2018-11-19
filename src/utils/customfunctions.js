const customfunction = {
  setCookie: function (name, value, day) {
    if (day !== 0) {
      // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var curDate = new Date()
      var curTamp = curDate.getTime()
      var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1
      var passedTamp = curTamp - curWeeHours
      var leftTamp = 24 * 60 * 60 * 1000 - passedTamp
      var leftTime = new Date()
      leftTime.setTime(leftTamp + curTamp)
      document.cookie = name + '=' + escape(value) + ';expires=' + leftTime.toGMTString()
    } else {
      document.cookie = name + '=' + escape(value)
    }
  },
  getCookie: function (name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    var arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
}

export default customfunction

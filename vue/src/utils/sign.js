import md5 from 'js-md5'
let secret = '2de70a88fe65e0a7423c60ce9f96ee21'
let version = '2.2.0'
let appver = 'H5'

const sign = {
  getSecret () {
    return secret
  },
  getNowTime () {
    let timestamp = new Date().getTime()
    timestamp = timestamp.toString().substring(0, 10)
    return timestamp
  },
  getTimestamp (timestamp) {
    timestamp = timestamp.toString().substring(0, 7) + '000'
    let timearr = timestamp.split('')
    let time1 = timearr[0]
    let time4 = timearr[3]
    timearr[0] = time4
    timearr[3] = time1
    timestamp = timearr.join('')
    return timestamp
  },
  getVersion () {
    return version
  },
  getAppver () {
    return appver
  },
  getSign (signture) {
    // 自定义排序规则，按对象的keys排序
    let signsort = Object.keys(signture)
    let newsign = ''
    signsort.sort((a, b) => {
      // 倒序
      return b > a
    }).map((val) => {
      newsign += '&' + val + '=' + signture[val]
    })
    newsign = newsign.length > 0 ? md5(newsign.substring(1)) : '123456'
    return newsign
  }
}

export default sign

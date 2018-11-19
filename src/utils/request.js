import axios from 'axios'
import { MessageBox } from 'mint-ui'
import sign from './sign.js'
import qs from 'qs'

// 创建axios实例
const service = axios.create({})

axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
axios.defaults.withCredentials = true

// 自定义的axios响应拦截器 ,验证签名和status
service.interceptors.response.use((response) => {
  // 获取响应headers
  if (response.status === 200) {
    if (response.data.code === 200) {
      let timestamp = sign.getTimestamp(response.data.timestamp)
      let returnsign = response.data.sign
      let signture = response.data
      signture.timestamp = timestamp
      signture.scaret = sign.getSecret()
      delete (signture.sign)
      delete (signture.debug)
      let signreturn = sign.getSign(signture)
      if (signreturn !== returnsign) {
        MessageBox.alert('签名错误')
        return false
      }
      response.data.data = JSON.parse(response.data.data)
      console.log('%c%s', 'color:#5cb85c;', '接口----->' + response.data.action + '-----' + '响应成功：', response.data.data)
      return Promise.resolve(response.data)
    } else {
      MessageBox.alert(response.data.msg)
      return false
    }
  } else {
    MessageBox.alert(response.data.msg)
    return false
  }
}, (error) => {
  switch (error.response.status) {
    // 401
    case 401:
      MessageBox.alert('请求失败' + 401)
      break
    case 400:
      MessageBox.alert('请求失败' + 400)
      break
  }
  return Promise.reject(error)
})

// 自定义的axios请求拦截器 ,生成签名
service.interceptors.request.use((request) => {
  let params = JSON.stringify(request.data)
  let newTime = sign.getNowTime()
  let timestamp = sign.getTimestamp(newTime)
  let signture = {
    'action': request.url,
    'appver': sign.getAppver(),
    'scaret': sign.getSecret(),
    'timestamp': timestamp,
    'version': sign.getVersion(),
    'api_param': params
  }
  let apiparam = {
    'action': request.url,
    'appver': sign.getAppver(),
    'timestamp': sign.getNowTime(),
    'version': sign.getVersion(),
    'api_param': params,
    'sign': sign.getSign(signture)
  }
  request.url = ''
  request.data = qs.stringify(apiparam)
  return Promise.resolve(request)
})

export default service

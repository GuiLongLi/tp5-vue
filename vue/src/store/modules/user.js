import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../api/index.js'

Vue.use(Vuex)

const post = {
  state: {
  },
  mutations: {
  },
  actions: {
    // 登录
    login ({dispatch, commit}, params) {
      return new Promise(function (resolve, reject) {
        // respond是响应的返回值
        api.post('User/login', params).then(respond => {
          // 响应返回200
          if (respond.code === 200) {
            resolve(respond.data)
          }
        }).catch((e) => {
          // 抛出异常
          reject(new Error(e))
        })
      })
    },
    // 发放红包
    followWexins ({dispatch, commit}, params) {
      return new Promise(function (resolve, reject) {
        // respond是响应的返回值
        api.post('User.followWexins', params).then(respond => {
          // 响应返回200
          if (respond.code === 200) {
            resolve(respond.data)
          }
        }).catch((e) => {
          // 抛出异常
          reject(new Error(e))
        })
      })
    }
  }
}

export default post

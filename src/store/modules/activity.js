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
    // 获取配对列表
    pairUserList ({dispatch, commit}, params) {
      return new Promise(function (resolve, reject) {
        // respond是响应的返回值
        api.post('Activity/getPairUserList', params).then(respond => {
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

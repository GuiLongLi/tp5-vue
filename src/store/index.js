import Vue from 'vue'
import Vuex from 'vuex'
import activity from './modules/activity'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    activity,
    user
  }
})

export default store

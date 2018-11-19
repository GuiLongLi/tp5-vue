import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import layui from '@/components/layui'
import mint from '@/components/mint'
import Mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
import MtRadio from 'mint-ui/lib/radio'
import 'mint-ui/lib/radio/style.css'
import newsframe from '@/frame/news'
import activityframe from '@/frame/activity'
import userframe from '@/frame/user'
import news from './news.js'
import activity from './modules/activity.js'
import user from './modules/user.js'

Vue.use(Router)
Vue.use(Mintui)
Vue.use(Vuex)
Vue.component(MtRadio.name, MtRadio, Mintui.Loadmore)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/news',
      component: newsframe,
      children: news
    },
    {
      path: '/activity',
      component: activityframe,
      children: activity
    },
    {
      path: '/user',
      component: userframe,
      children: user
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/layui',
      name: 'layui',
      component: layui
    },
    {
      path: '/mint',
      name: 'mint',
      component: mint
    }
  ]
})

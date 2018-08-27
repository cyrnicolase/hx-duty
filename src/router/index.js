import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Duty from '@/components/Duty'
import Month from '@/components/Month'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/duty',
      name: 'duty',
      component: Duty
    },
    {
      path: '/month',
      name: 'month',
      component: Month
    }
  ]
})

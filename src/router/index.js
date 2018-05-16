import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mymenu from '@/components/Mymenu'
import Inner from '@/components/Inner'
import Inner2 from '@/components/Inner2'
import Three from '@/components/Three'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mymenu',
      name: 'Mymenu',
      component: Mymenu
    },
    {
      path: '/three',
      name: 'Three',
      component: Three
    },
    {
      path: '/inner',
      name: 'Inner',
      component: Inner
    },
    {
      path: '/inner2',
      name: 'Inner2',
      component: Inner2
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: '404',
      component: Home
    }
  ]
})

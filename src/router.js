import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BaseModule from "./router/base"
import TestModule from "./router/test"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        ...BaseModule,
        ...TestModule
      ]
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})

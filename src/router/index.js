import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Driver from '../views/Drivers/ListDriver.vue'
import Queue from '../views/Queue/ListQueue.vue'
import Template from '../views/Templates/ListTemplate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/driver',
    name: 'Driver',
    component: Driver
  },
  {
    path: '/queue',
    name: 'Queue',
    component: Queue
  },
  {
    path: '/template',
    name: 'Template',
    component: Template
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'

// Master
import Driver from '../views/Master/Drivers/ListDriver.vue'
import DriverDetail from '../views/Master/Drivers/DriverDetail.vue'
import Point from '../views/Master/Point/ListPoint.vue'
import PointDetail from '../views/Master/Point/PointDetail.vue'
import PointSub from '../views/Master/PointSub/ListPointSub.vue'
import PointSubDetail from '../views/Master/PointSub/PointSubDetail.vue'


import Template from '../views/Master/Templates/ListTemplate.vue'

// Transaction
import Queue from '../views/Transaction/Queue/ListQueue.vue'


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
  // Master
  {
    path: '/driver',
    name: 'Driver',
    component: Driver
  },
  {
    path: '/driver-detail/:id',
    props: true,
    name: 'DriverDetail',
    component: DriverDetail
  },
  {
    path: '/point',
    name: 'Point',
    component: Point
  },
  {
    path: '/point-detail/:id',
    props: true,
    name: 'PointDetail',
    component: PointDetail
  },
  {
    path: '/pointsub',
    name: 'PointSub',
    component: PointSub
  },
  {
    path: '/pointsub-detail/:id',
    props: true,
    name: 'PointSubDetail',
    component: PointSubDetail
  },
  {
    path: '/template',
    name: 'Template',
    component: Template
  },
  // Transaction
  {
    path: '/queue',
    name: 'Queue',
    component: Queue
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

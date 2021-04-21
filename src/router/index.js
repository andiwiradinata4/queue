import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

// Master
import Driver from '../views/Master/Drivers/ListDriver.vue'
import DriverDetail from '../views/Master/Drivers/DriverDetail.vue'
import Point from '../views/Master/Point/ListPoint.vue'
import PointDetail from '../views/Master/Point/PointDetail.vue'
import PointSub from '../views/Master/PointSub/ListPointSub.vue'
import PointSubDetail from '../views/Master/PointSub/PointSubDetail.vue'
import Timeline from '../views/Master/Timeline/ListTimeline.vue'
import TimelineDetail from '../views/Master/Timeline/TimelineDetail.vue'

// System
import Login from '../views/System/Login/Login.vue';

// Transaction
import Queue from '../views/Transaction/Queue/ListQueue.vue'
import QueueDetail from '../views/Transaction/Queue/QueueDetail.vue'

// Testing
import Testing from '../views/Testing.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/testing',
    name: 'Testing',
    component: Testing
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
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
    path: '/timeline',
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/timeline-detail/:id',
    props: true,
    name: 'TimelineDetail',
    component: TimelineDetail
  },

  // System
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  // Transaction
  {
    path: '/queue',
    name: 'Queue',
    component: Queue
  },
  {
    path: '/queue-detail/:id',
    props: true,
    name: 'QueueDetail',
    component: QueueDetail
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

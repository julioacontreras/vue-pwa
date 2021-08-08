import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

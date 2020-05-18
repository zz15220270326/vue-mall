import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由懒加载
const home = () => import("../views/tab-bar/home/Home")
const category = () => import("../views/tab-bar/category/Category")
const cart = () => import("../views/tab-bar/cart/Cart")
const profile = () => import("../views/tab-bar/profile/Profile")

//routes config
const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/profile',
    component: profile
  },
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
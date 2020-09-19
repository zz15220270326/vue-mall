import Vue from "vue"
import VueRouter from "vue-router"
// use-router
Vue.use(VueRouter)
// lazy-load components
const Home = () => import("views/tab-bar/home/Home")
const Detail = () => import("views/detail/Detail")
const Category = () => import("views/tab-bar/category/Category")
const Cart = () => import("views/tab-bar/cart/Cart")
const Profile = () => import("views/tab-bar/profile/Profile")
// 09-19 Login & Register
const Login = () => {"views/login/Login"}
const Register = () => {"views/register/Register"}
// set-routes
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

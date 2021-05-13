import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import Cookies from "js-cookie"
import router from './router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const whiteList = ['/login']// no redirect whitelist
Vue.use(Router)



router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  NProgress.start()
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done(true)
    } else {
      next()
      NProgress.done(true)
      // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   store.dispatch('GetInfo').then(() => { // 拉取user_info
      //     // 动态路由，拉取菜单
      //     loadMenus(next, to)
      //   }).catch(() => {
      //     store.dispatch('LogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // // 登录时未拉取 菜单，在此处拉取
      // } else if (store.getters.loadMenus) {
      //   // 修改成false，防止死循环
      //   store.dispatch('updateLoadMenus')
      //   loadMenus(next, to)
      // } else {
      //   next()
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
      NProgress.done(true)
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done(true)
    }
  }
})
export default router
function getToken(){
  return Cookies.get('token')
}
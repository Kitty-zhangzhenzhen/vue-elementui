import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/login',
        name: 'Login',
        component: (resolve) => require(['@/views/login/index'], resolve)
      },
      {
        path: '/',
        component:  (resolve) => require(['@/views/layout/index'], resolve),
        redirect: '/index',
        children: [
          {
            path: '/index',
            name: 'index',
            component: (resolve) => require(['@/views/index/index'], resolve),
            meta: {
              title: '首页'
            }
          }
        ]
      },
      {
        path: '/htmlStatement',
        component: (resolve) => require(['@/views/layout/index'], resolve),
        hidden: true,
        children: [
          {
            path: '/htmlStatement:path*',
            component: (resolve) => require(['@/views/htmlStatement/index'], resolve),
            name: 'htmlStatement',
            meta: {
              title: '前端编码规范'
            }
          }
        ]
      },
      {
        path: '/applicationTwo',
        component:  (resolve) => require(['@/views/layout/index'], resolve),
        hidden: true,
        children: [
          {
            path: '/applicationTwo/tableManage:path*',
            component: (resolve) => require(['@/views/applicationTwo/tableManage/index'], resolve),
            name: 'tableManage',
            meta: {
              title: 'Table'
            }
          },
          {
            path: '/applicationTwo/chartPanel:path*',
            component: (resolve) => require(['@/views/applicationTwo/chartPanel/index'], resolve),
            name: 'chartPanel',
            meta: {
              title: 'chartPanel'
            }
          },
          {
            path: '/applicationTwo/imgCropper:path*',
            component: (resolve) => require(['@/views/applicationTwo/imgCropper/index'], resolve),
            name: 'imgCropper',
            meta: {
              title: 'imgCropper'
            }
          }
        ]
      },
      {
        path: '/exception',
        component:  (resolve) => require(['@/views/layout/index'], resolve),
        hidden: true,
        children: [
          {
            path: '/exception/error403:path*',
            component: (resolve) => require(['@/views/exception/error403'], resolve),
            name: 'error403',
            meta: {
              title: '403'
            }
          },
          {
            path: '/exception/error401:path*',
            component: (resolve) => require(['@/views/exception/error401'], resolve),
            name: 'Error401',
            meta: {
              title: '401'
            }
          },
          {
            path: '/exception/error404:path*',
            component: (resolve) => require(['@/views/exception/error404'], resolve),
            name: 'error404',
            meta: {
              title: '404'
            }
          },
          {
            path: '/exception/error500:path*',
            component: (resolve) => require(['@/views/exception/error500'], resolve),
            name: 'error500',
            meta: {
              title: '500'
            }
          }
        ]
      },
      {
        path: '/Chart',
        component:  (resolve) => require(['@/views/layout/index'], resolve),
        hidden: true,
        children: [
          {
            path: '/Chart/Chart:path*',
            component: (resolve) => require(['@/views/chart'], resolve),
            name: 'Chart',
            meta: {
              title: 'Chart'
            }
          }
        ]
      }
    ]
  })
  
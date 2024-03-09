import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores'
// console.log(import.meta.env.DEV)
// 环境变量
// import.meta.env.BASE_URL
// 指的是vite.config.js中的base项
const router = createRouter({
  // webhistory
  // webhashhistory
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      // 重定向
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
// 默认为直接放行
// 返回值：
// 1、undefined/true 放行
// 2、false 拦截回from的地址页面
// 3、具体对象 拦截到对应的地址
router.beforeEach((to) => {
  const userStore = useUserStore()
  console.log('token', userStore.token)
  if (!userStore.token && to.path !== '/login') return '/login'

  return true
})
export default router

import type { RouteRecordRaw } from 'vue-router';

export const staticRouters: RouteRecordRaw[] = [
  // 默认情况下去home
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
    // component: () => import('../../views/Login')
  },
  // layout布局
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/Layouts/index.vue')
    // redirect: '/home',
    // children: [{ path: '/home', name: 'home', component: () => import('@/views/Home'), meta: {} }]
  }
];

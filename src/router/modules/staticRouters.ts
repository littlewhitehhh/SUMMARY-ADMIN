import type { RouteRecordRaw } from 'vue-router';

export const staticRouters: RouteRecordRaw[] = [
  // 默认情况下去home
  {
    path: '/',
    redirect: '/home'
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
    // component: () => import('../../views/Login')
  },
  // layout布局
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/Layouts'),
    redirect: '/home',
    children: []
  }
];

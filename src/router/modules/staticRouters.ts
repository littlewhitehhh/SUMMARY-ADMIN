import type { RouteRecordRaw } from 'vue-router';

export const staticRouters: RouteRecordRaw[] = [
  // 默认情况下去home
  {
    path: '/',
    redirect: '/home/index'
  },
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
    component: () => import('@/Layouts/index.vue'),
    redirect: '/home/index',
    children: []
  }
];

export const errorRouters: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面'
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面'
    }
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面'
    }
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorMessage/404.vue')
  }
];

import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { staticRouters } from './modules/staticRouters';
const routes: RouteRecordRaw[] = [...staticRouters];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach(to => {
  // 获取缓存token
  const token = undefined;
  if (!token && to.path !== '/login') {
    return { name: 'login' };
  }
});

export default router;

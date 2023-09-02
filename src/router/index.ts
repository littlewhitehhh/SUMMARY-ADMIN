import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { staticRouters } from './modules/staticRouters';
const routes: RouteRecordRaw[] = [...staticRouters];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

export default router;

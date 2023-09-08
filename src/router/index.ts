import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/modules/uers';
import { useAuthStore } from '@/store/modules/auth';

import { staticRouters } from './modules/staticRouters';
import { initDynamicRouter } from './modules/dynamicRouters';

const routes: RouteRecordRaw[] = [...staticRouters];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  if (to.path.toLocaleLowerCase() === '/login') {
    if (userStore.token) return from.fullPath;
    resetRouter();
    return true;
  }
  if (!userStore.token) return { path: '/login', replace: true };

  if (!authStore.authMenuList.length) {
    await initDynamicRouter();
    return { ...to, replace: true };
  }
});

export default router;
/**
 * @description 重置路由
 */
export const resetRouter = () => {
  const authStore = useAuthStore();
  authStore.flatAuthMenuListGet.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

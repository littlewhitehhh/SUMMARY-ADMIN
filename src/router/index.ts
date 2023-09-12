import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/modules/uers';
import { useAuthStore } from '@/store/modules/auth';

import { staticRouters, errorRouters } from './modules/staticRouters';
import { initDynamicRouter } from './modules/dynamicRouters';

const routes: RouteRecordRaw[] = [...staticRouters, ...errorRouters];

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
  // 动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if (!userStore.token) return { path: '/login', replace: true };

  if (!authStore.authMenuList.length) {
    await initDynamicRouter();
    return { ...to, replace: true };
  }
});

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

/**
 * @description 路由跳转错误
 */
router.onError(error => {
  console.warn('路由错误', error.message);
});

/**
 * @description 路由跳转结束
 */
router.afterEach(() => {
  // 这里优化有关 添加progress进度条等
});

export default router;

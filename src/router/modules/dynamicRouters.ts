import { getAuthMenuListApi, getAuthButtonListApi } from '@/api/module/login';
import { useAuthStore } from '@/store/modules/auth';
import { useUserStore } from '@/store/modules/uers';
// import { useRouter } from 'vue-router';
import router from '@/router/index';
import { RouteRecordRaw } from 'vue-router';

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue');
console.log('modules', modules);
console.log('modules', Object.keys(modules).length);

export const initDynamicRouter = async () => {
  console.log('动态路由');
  const userStore = useUserStore();
  const authStore = useAuthStore();
  // const router = useRouter();
  // 请求动态路由了  然后路由存放在哪里呢？ pinia  authStore吧
  // 1、获取路由菜单 并存储到authStore中
  try {
    const { data: data1 } = await getAuthMenuListApi();
    const { data } = await getAuthButtonListApi();
    console.log(data);

    // console.log('res', data1);
    authStore.setAuthMenuList(data1);
    // console.log('before', authStore.flatAuthMenuListGet);
    // 2、判断当前用户有没有菜单权限
    if (!authStore.authMenuList.length) {
      console.log('当前账号无任何菜单权限，请联系管理员');
      userStore.setToken('');
      router.push('./login');
      return Promise.reject('NO Permission');
    }
    // 添加动态路由
    // state中的数据修改
    authStore.flatAuthMenuListGet.forEach(item => {
      // item.children
      item.children && delete item.children;
      if (item.component && typeof item.component == 'string') {
        item.component = modules['/src/views' + item.component + '.vue'];
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw);
      }
    });
    // console.log('after', authStore.authMenuList);
    // console.log('router', router);
  } catch (error) {
    userStore.setToken('');
    router.push('./login');

    return Promise.reject(error);
  }
};

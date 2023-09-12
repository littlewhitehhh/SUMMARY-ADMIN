import { defineStore } from 'pinia';
// import piniaPersistConfig from '@/config/piniaPersist';
import { AuthState } from '../interface';
import {
  getShowMenuList,
  getFlatMenuList,
  getAllBreadcrumbList
} from '@/utils';

export const useAuthStore = defineStore({
  id: 'summaty-admin-auth',
  state: (): AuthState => {
    return {
      // 菜单权限列表
      authMenuList: []
    };
  },

  getters: {
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showAuthMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 用于渲染路由，将深层的menuList flat扁平化，用于动态添加路由
    // flatAuthMenuListGet: state => {
    //   const res = getFlatMenuList(state.authMenuList);
    //   // console.log('flatAuthMenuListGet', res);
    //   return res;
    // },
    flatAuthMenuListGet: state => getFlatMenuList(state.authMenuList),

    // 面包屑导航
    breadCrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    //存储菜单
    setAuthMenuList(menuList) {
      console.log('auth', menuList);

      this.authMenuList = menuList;
    }
  }
  // 权限store  好像不需要持久化
  // persist: piniaPersistConfig('summary-admin-suth')
});

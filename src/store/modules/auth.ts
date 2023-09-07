import { defineStore } from 'pinia';
// import piniaPersistConfig from '@/config/piniaPersist';
import { AuthState } from '../interface';

export const useAuthStore = defineStore({
  id: 'summaty-admin-auth',
  state: (): AuthState => {
    return {
      // 菜单权限列表
      authMenuList: []
    };
  },

  getters: {
    authMenuListGet: state => state.authMenuList
  },
  actions: {
    //存储菜单
    setAuthMenuList(menuList) {
      this.authMenuList = menuList;
    }
  }
  // 权限store  好像不需要持久化
  // persist: piniaPersistConfig('summary-admin-suth')
});

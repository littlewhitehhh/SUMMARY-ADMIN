import { defineStore } from 'pinia';
import persistedConfig from '@/config/piniaPersist';

import { UserState } from '@/store/interface';

export const useUserStore = defineStore({
  id: 'summary-admin-user',
  state: (): UserState => ({
    token: '',
    userInfo: {
      name: 'summary'
    }
  }),
  getters: {},
  actions: {
    // set Token
    setToken(token: string) {
      this.token = token;
    },
    // setUserInfo
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    }
  },
  persist: persistedConfig('summary-admin-user')
});

import { defineStore } from 'pinia';
import { tabsState, tabsMenuProps } from '../interface/index';
// import { useRouter } from 'vue-router';
import router from '@/router/index';
import persistedConfig from '@/config/piniaPersist';

export const useTabsState = defineStore({
  id: 'tabs',
  state: (): tabsState => ({
    tabsMenuLists: []
  }),
  getters: {},
  actions: {
    addMenuItem(tabsItem: tabsMenuProps) {
      // 判断 如果已经存在了 直接返回 不存在添加
      if (this.tabsMenuLists.every(item => item.path !== tabsItem.path)) this.tabsMenuLists.push(tabsItem);
    },
    removeTabs(tabPath: string, isCurrent: boolean = true) {
      const tabsMenuList = this.tabsMenuLists;
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          // const router = useRouter();
          router.push(nextTab.path);
        });
      }
      this.tabsMenuLists = tabsMenuList.filter(item => item.path !== tabPath);
    }
  },

  persist: persistedConfig('tabs')
});

import { defineStore } from 'pinia';
import { GlobalState } from '../interface/index';
import persistedConfig from '@/config/piniaPersist';

export const useGlobalStore = defineStore({
  id: 'globalStore',
  state: (): GlobalState => {
    return {
      //是否折叠菜单
      isCollapse: false,
      // 面包屑导航图标
      breadcrumbIcon: true,
      // element组件大小
      assemblySize: 'default',
      // 当前系统语言
      language: 'zh'
    };
  },
  getters: {
    isCollapseGet: state => state.isCollapse
  },
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    setAssemblySize(size) {
      this.assemblySize = size;
    },
    setLanguage(lang) {
      this.language = lang;
    },

    // 这是一个通用的修改state的方法
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  // global 持久化了
  persist: persistedConfig('globalStore')
});

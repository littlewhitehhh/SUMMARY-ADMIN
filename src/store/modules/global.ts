import { defineStore } from 'pinia';
import { GlobalState } from '../interface/index';
import persistedConfig from '@/config/piniaPersist';
import { DEFAULT_PRIMARY } from '@/config';

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
      language: 'zh',
      // 是否全屏
      maximize: false,
      // 主题颜色
      primary: DEFAULT_PRIMARY,
      // layout布局模式
      layout: 'vertical',
      // 深色模式
      isDark: false,
      // 色弱模式
      isWeak: false,
      // 灰色模式
      isGrey: false,
      // 侧边栏反转
      asideInverted: false,
      // m面包屑导航
      breadCrumb: true,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true
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
    setLayout(layout) {
      this.layout = layout;
    },
    // 这是一个通用的修改state的方法
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  // global 持久化了
  persist: persistedConfig('globalStore')
});

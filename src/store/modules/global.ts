import { defineStore } from 'pinia';
import { GlobalState } from '../interface/index';

export const useGlobalStore = defineStore({
  id: 'globalStore',
  state: (): GlobalState => {
    return {
      isCollapse: false,
      breadcrumbIcon: true
    };
  },
  getters: {
    isCollapseGet: state => state.isCollapse
  },
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
});

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTabsState } from '@/store/modules/tabs';
import { useAuthStore } from '@/store/modules/auth';
import { useGlobalStore } from '@/store/modules/global';
import { TabsPaneContext, TabPaneName } from 'element-plus';
const activeName = ref('first');

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsState();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const tabsMenuList = computed(() => tabsStore.tabsMenuLists);
const tabsIcon = computed(() => globalStore.tabsIcon);
const tabsMenuValue = ref(route.fullPath);
// console.log(menuList);

// 初始化tabs 例如 首页必须固定在首页
const initTabs = () => {
  // console.log('init');

  authStore.flatAuthMenuListGet.forEach(item => {
    // console.log(item);

    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,

        path: item.path,
        name: item.name,
        close: !item.meta.isAffix
      };

      tabsStore.addMenuItem(tabsParams);
    }
  });
};
// tab click
const tabClick = (tabItem: TabsPaneContext) => {
  // console.log(tabItem);
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
};
// remove Tab
const tabRemove = (fullPath: TabPaneName) => {
  // const name = tabsStore.tabsMenuLists.filter(item => item.name === fullPath);
  tabsStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix
    };
    tabsStore.addMenuItem(tabsParams);
  },
  { immediate: true }
);
onMounted(() => {
  initTabs();
});
</script>
<template>
  <div class="tabs-menu">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabClick" type="card" @tab-remove="tabRemove">
      <template v-for="item in tabsMenuList" :key="item.path">
        <el-tab-pane :name="item.path" :closable="item.close">
          <template #label>
            <el-icon v-show="item.icon && tabsIcon" class="tabs-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>

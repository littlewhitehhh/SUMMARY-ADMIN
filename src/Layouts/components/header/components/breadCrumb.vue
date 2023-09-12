<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import { useGlobalStore } from '@/store/modules/global';
import { HOME_URL } from '@/enums/index';
import { Menu } from '@/store/interface/index';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
// console.log('route', route);
// watch(route, () => {
//   console.log(route);
//   console.log(router);

//   console.log(authStore.breadCrumbListGet);
// });

const breadCrumbList = computed(() => {
  // braedCrumbGet 数组 每一个item  path：[parentObj,item本身]

  // 什么是 route.matched  是不是当前页面加载过程中所匹配过的所有路由组成的数组
  // 例如 home/index    -->  [/layoutObj,index/homeObj]
  // login   --> [login]

  // 这个就是获取当前 route的parent 本身所组成的数组
  let breadCrumbData = authStore.breadCrumbListGet[route.matched[route.matched.length - 1].path] ?? [];

  if (breadCrumbData[0].path != HOME_URL) {
    breadCrumbData = [{ path: HOME_URL, meta: { icon: 'HomeFilled', title: '首页' } }, ...breadCrumbData];
  }
  return breadCrumbData;
});

const onBreadcrumbClick = (item: Menu.AuthMenuListItem, index: number) => {
  // console.log(item, index);
  if (index !== breadCrumbList.value.length - 1) router.push(item.path);
};
</script>
<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="item.path">
        <div class="el-breadcrumb__inner is-link" @click="onBreadcrumbClick(item, index)">
          <el-icon v-show="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span class="breadcrumb-title">{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  .breadcrumb-icon {
    margin-right: 4px;
  }
}
</style>

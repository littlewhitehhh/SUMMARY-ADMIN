<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import { HOME_URL } from '@/enums/index';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

console.log('route', route);
watch(route, () => {
  console.log(route);
  console.log(router);

  console.log(authStore.breadCrumbListGet);
});

const breadCrumbList = computed(() => {
  // 什么是 route.matched
  let breadCrumbData = authStore.breadCrumbListGet[route.matched[route.matched.length - 1].path] ?? [];

  if (breadCrumbData[0].path != HOME_URL) {
    breadCrumbData = [{ path: HOME_URL, meta: { icon: 'HomeFilled', title: '首页' } }, ...breadCrumbData];
  }
  return breadCrumbData;
});
</script>
<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.path">
      <div class="el-breadcrumb__inner is-link">
        <!-- <el-icon v-show="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
          <component :is="item.meta.icon"></component>
        </el-icon> -->
        <span class="breadcrumb-title">{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>

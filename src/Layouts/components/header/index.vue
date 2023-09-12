<script lang="ts" setup>
import { computed } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import breadCrumb from './components/breadCrumb.vue';

const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const changeCollapse = () => {
  globalStore.changeCollapse();
};
</script>
<template>
  <div class="tool-bar-left">
    <el-icon v-if="!isCollapse" @click="changeCollapse" size="22px"><Fold /></el-icon>
    <el-icon v-else @click="changeCollapse" size="22px"><Expand /></el-icon>

    <!-- TODO 面包屑导航 -->
    <breadCrumb></breadCrumb>
  </div>

  <div class="tool-bar-right">右侧</div>
</template>

<style scoped>
@import './index.scss';
</style>

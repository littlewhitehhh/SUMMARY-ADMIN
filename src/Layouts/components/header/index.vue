<script lang="ts" setup>
import { computed } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import breadCrumb from './components/breadCrumb.vue';
import AssemblySize from './components/assemblySize.vue';
import Language from './components/language.vue';
import SearchMenu from './components/searchMenu.vue';
import ThemeSetting from './components/themeSetting.vue';
import Message from './components/message.vue';
import Fullscreen from './components/fullScreen.vue';

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
    <!-- 面包屑导航 -->
    <breadCrumb></breadCrumb>
  </div>

  <div class="tool-bar-right">
    <div class="header-icon">
      <AssemblySize id="assemblySize" />
      <Language id="language" />
      <SearchMenu id="searchMenu" />
      <ThemeSetting id="themeSetting" />
      <Message id="message" />
      <Fullscreen id="fullscreen" />
    </div>

    <div class="user">
      <span class="username">one-tow-three</span>
      <!-- TODO 头像功能 -->
    </div>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>

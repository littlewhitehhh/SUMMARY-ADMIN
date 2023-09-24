<script lang="ts" setup>
import Aside from './components/aside/index.vue';
import Header from './components/header/index.vue';
import Tabs from './components/tabs/index.vue';
import { useGlobalStore } from '@/store/modules/global';
import { computed } from 'vue';
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
// console.log(isCollapse.value);

const asideWidth = computed(() => {
  return isCollapse.value === false ? '210px' : '65px';
});
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="asideWidth">
        <!-- <el-aside width="200px"> -->
        <!-- 标题和logo -->
        <div class="title_container">
          <div class="logo">
            <img src="@/assets/images/logo.svg" />
          </div>
          <span class="title" v-if="!isCollapse">Aky-Admin</span>
        </div>
        <el-scrollbar>
          <Aside></Aside>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <div class="tabs-box">
          <Tabs></Tabs>
          <!-- TODO more button -->
          <el-button class="moreButton" size="small">更多</el-button>
        </div>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>

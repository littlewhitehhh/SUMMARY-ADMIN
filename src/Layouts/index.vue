<script lang="ts" setup>
import Aside from './components/aside/index.vue';
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
@import './inrex.scss';
</style>

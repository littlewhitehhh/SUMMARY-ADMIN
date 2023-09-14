<script lang="ts" setup>
import { useGlobalStore } from '@/store/modules/global';
import { computed } from 'vue';
const languageList = [
  { label: '简体中文', value: 'zh' },
  { label: 'English', value: 'en' }
];
const globalStore = useGlobalStore();
const currentLanguage = computed(() => globalStore.language);

const changeLanguage = language => {
  if (currentLanguage.value === language) return;
  globalStore.setLanguage(language);
};
</script>
<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="item in languageList" :key="item.value">
          <el-dropdown-item :disabled="item.value === currentLanguage" :command="item.value">{{ item.label }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>

<script lang="ts" setup>
import { computed } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import { AssemblySizeType } from '@/store/interface/index';

const globalStore = useGlobalStore();

const assemblySizeList = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' }
];
// 提取出去
// type AssemblySizeType = 'large' | 'default' | 'small';
// const currentSize = ref<AssemblySizeType>(globalStore.assemblySize);
const currentSize = computed(() => globalStore.assemblySize);

const setAssemblySize = (size: AssemblySizeType) => {
  // TODO 修改整体样式吧  具体怎么做呢？
  if (currentSize.value === size) return;
  // currentSize.value = size;
  globalStore.setAssemblySize(size);
};
</script>
<template>
  <!-- 自己引入iconfont啦 -->
  <el-dropdown trigger="click" @command="setAssemblySize">
    <i :class="'iconfont icon-contentright'" class="toolBar-icon"></i>

    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="item in assemblySizeList" :key="item.value">
          <el-dropdown-item :disabled="item.value === currentSize" :command="item.value">{{ item.label }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>

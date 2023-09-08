<script lang="ts" setup>
import { Menu } from '@/store/interface/index';

const props = defineProps<{
  MenuList: Menu.AuthMenuListItem[];
}>();
</script>
<template>
  <div class="subMenuItem">
    <template v-for="item in props.MenuList" :key="item.path">
      <template v-if="item.children?.length">
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon size="large"><component :is="item.meta.icon"></component></el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <subMenuItem :MenuList="item.children"></subMenuItem>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path">
          <el-icon size="large"><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<style scoped></style>

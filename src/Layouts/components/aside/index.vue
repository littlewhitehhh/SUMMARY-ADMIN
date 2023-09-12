<script lang="ts" setup>
import { useAuthStore } from '@/store/modules/auth';
import { useGlobalStore } from '@/store/modules/global';
import { computed } from 'vue';
import subMenuItem from './subMenuItem.vue';

const authStore = useAuthStore();
const globalStore = useGlobalStore();
const authMenuList = computed(() => authStore.showAuthMenuListGet);
const isCollapse = computed(() => globalStore.isCollapse);
// console.log(authMenuList);
// console.log(authStore);
// console.log(authStore.authMenuList); // 没有数据  请求发生在initDynamicRouter之前
// console.log(authStore.authMenuListGet);
// console.log(computed(() => authStore.authMenuListGet));
</script>

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    router
    :collapse="isCollapse"
    :collapse-transition="false"
    :unique-opened="true"
  >
    <!-- <template v-for="item in authMenuList" :key="item.path">
      <template v-if="item.children">
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon size="large"><component :is="item.meta.icon"></component></el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-for="children in item.children" :key="children.path">
            <el-menu-item :index="children.path">
              <el-icon size="large"><component :is="children.meta.icon"></component></el-icon>
              <span>{{ children.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path">
          <el-icon size="large"><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template> -->
    <subMenuItem :MenuList="authMenuList"></subMenuItem>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>

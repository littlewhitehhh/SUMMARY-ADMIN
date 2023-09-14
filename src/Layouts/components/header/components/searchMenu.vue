<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { ElAutocomplete } from 'element-plus';
// import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
// import type { inputInstance } from 'element-plus';
import { useAuthStore } from '@/store/modules/auth';
import { Menu } from '@/store/interface/index';

const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() => authStore.flatAuthMenuListGet.filter(item => !item.meta.isHide));
const searchDialogVisible = ref(false);
type MenuInputRef = InstanceType<typeof ElAutocomplete>;
const menuInputRef = ref<MenuInputRef>();
const searchMenu = ref('');

const searchMenuList = (queryString: string, cb: any) => {
  const result = queryString ? menuList.value.filter(createFilter(queryString)) : menuList.value;
  return cb(result);
};
// 打开dialog
const handleOpen = () => {
  searchDialogVisible.value = true;
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value.focus();
    });
  });
};

// 关闭dialog
const closeDialog = () => {
  searchDialogVisible.value = false;
  searchMenu.value = '';
};

const createFilter = (queryString: string) => {
  return (menuListItem: Menu.AuthMenuListItem) => {
    return (
      menuListItem.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      menuListItem.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
    );
  };
};

const handleClickMenu = (menuItem: Menu.AuthMenuListItem) => {
  searchMenu.value = '';
  if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, '_blank');
  else router.push(menuItem.path);
  closeDialog();
};
</script>
<template>
  <div class="menu-search-dialog">
    <i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleOpen"></i>
    <el-dialog
      v-model="searchDialogVisible"
      destroy-on-close
      :modal="false"
      :show-close="false"
      fullscreen
      @click="closeDialog"
      center
    >
      <el-autocomplete
        ref="menuInputRef"
        v-model="searchMenu"
        value-key="path"
        placeholder="菜单搜索 ：支持菜单名称、路径"
        :fetch-suggestions="searchMenuList"
        @select="handleClickMenu"
        @click.stop
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span> {{ item.meta.title }} </span>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.menu-search-dialog {
  // 直接用el-dialog样式不生效
  // .el-dialog {
  :deep(.el-dialog) {
    background-color: rgb(0 0 0 / 50%);
    border-radius: 0 !important;
    box-shadow: unset !important;
    .el-dialog__header {
      border-bottom: none !important;
    }
  }
  :deep(.el-autocomplete) {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 550px;
    transform: translateX(-50%);
    .el-input__wrapper {
      background-color: var(--el-bg-color);
    }
  }
}
.el-autocomplete__popper {
  .el-icon {
    position: relative;
    top: 2px;
    font-size: 16px;
    span {
      margin: 0 0 0 10px;
      font-size: 14px;
    }
  }
}
</style>

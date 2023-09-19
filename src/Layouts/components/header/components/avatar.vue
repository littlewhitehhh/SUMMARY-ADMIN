<script lang="ts" setup>
import { ref } from 'vue';
import infoDialog from './infoDialog.vue';
import passwordDialog from './passwordDialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { logoutApi } from '@/api/module/login';
import { useUserStore } from '@/store/modules/uers';
import { LOGIN_URL } from '@/config';
import { useRouter } from 'vue-router';
// const infoDialogVisible = ref(false);
// const passwordDialogVisible = ref(false);
const userStore = useUserStore();
const router = useRouter();
const infoRef = ref<InstanceType<typeof infoDialog> | null>(null);
const passwordRef = ref<InstanceType<typeof passwordDialog> | null>(null);

const openDialog = val => {
  console.log(val);
  // if (val === 'infoRef') infoDialogVisible.value = !infoDialogVisible.value;
  // if (val === 'passwordRef') passwordDialogVisible.value = !passwordDialogVisible.value;
  console.log('infoRef', infoRef);
  console.log('passwordRef', passwordRef);
  if (val === 'infoRef') infoRef.value.openDialog();
  if (val === 'passwordRef') passwordRef.value.openDialog();
};

const logout = () => {
  console.log('layout');
  // 退出登录  有啥可是做的？
  ElMessageBox.confirm('你是否确认退出登录？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 调用api 退出登录
    await logoutApi();
    // 清空token
    userStore.setToken('');
    // 重定向到login
    router.replace(LOGIN_URL);
    ElMessage.success('退出登录成功');
  });
};
</script>
<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon><User /></el-icon>个人信息
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- TODO userInfo dialog -->
  <infoDialog ref="infoRef"></infoDialog>
  <!-- <el-dialog v-model="infoDialogVisible" title="个人信息" width="500px">
    <span>This is userInfo</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="infoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="infoDialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog> -->

  <!-- TOdO passward dialog -->
  <passwordDialog ref="passwordRef"></passwordDialog>
  <!-- <el-dialog v-model="passwordDialogVisible" title="修改密码" width="30%">
    <span>This is Password</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="passwordDialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

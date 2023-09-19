<script lang="ts" setup>
import { ref } from 'vue';

const infoDialogVisible = ref(false);

const openDialog = () => {
  infoDialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
<template>
  <el-dialog v-model="infoDialogVisible" title="个人信息" width="500px">
    <span>This is userInfo</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="infoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="infoDialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

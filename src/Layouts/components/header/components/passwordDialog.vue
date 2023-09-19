<script lang="ts" setup>
import { ref } from 'vue';

const passwordDialogVisible = ref(false);

const openDialog = () => {
  passwordDialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
<template>
  <el-dialog v-model="passwordDialogVisible" title="修改密码" width="30%">
    <span>This is Password</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="passwordDialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

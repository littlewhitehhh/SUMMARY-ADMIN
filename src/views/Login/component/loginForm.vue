<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock, CircleClose, UserFilled } from '@element-plus/icons-vue';

interface RuleForm {
  name: string;
  password: string;
}

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: '',
  password: ''
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ]
});
</script>
<template>
  <div class="loginContainer">
    <div class="login_left">
      <img src="@/assets/images/login_left.png" />
    </div>
    <div class="login_right">
      <div class="login_title">
        <div class="logo">
          <img src="@/assets/images/logo.svg" />
        </div>
        <div class="title">Summary-Admin</div>
      </div>
      <div class="login_form">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" :prefix-icon="User" placeholder="用户名：" size="large" />
          </el-form-item>
          <el-form-item prop=" password">
            <el-input
              v-model="ruleForm.password"
              :prefix-icon="Lock"
              type="password"
              show-password
              placeholder="密码："
              size="large"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="login_submit">
        <el-button size="large" :icon="CircleClose" round>重置</el-button>
        <el-button size="large" :icon="UserFilled" round type="primary">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>

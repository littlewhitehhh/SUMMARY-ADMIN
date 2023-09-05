<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock, CircleClose, UserFilled } from '@element-plus/icons-vue';
import { LoginApi } from '@/api/module/login';
import md5 from 'js-md5';
interface RuleForm {
  username: string;
  password: string;
}

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: '',
  password: ''
});

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入正确的用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

// login
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (vaild, fields) => {
    if (!vaild) return;
    // 验证通过
    // loading， 用户体验优化
    try {
      console.log('submit');
      // 1、执行登录接口
      const res = await LoginApi({ ...ruleForm, password: md5(ruleForm.password) });
      console.log(res);

      // 2、动态添加路由

      // 3、清空tabs、keepAlie

      // 4、跳转大屏首页
    } catch {
      console.log('Error login', fields);
    } finally {
      // loading
    }
  });
};
// 重置
const resetForm = (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
};
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
            <el-input v-model="ruleForm.username" :prefix-icon="User" placeholder="用户名：" size="large" />
          </el-form-item>
          <el-form-item prop="password">
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
        <el-button size="large" :icon="CircleClose" round @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button size="large" :icon="UserFilled" round type="primary" @click="login(ruleFormRef)">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>

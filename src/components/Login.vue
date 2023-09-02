<script lang="ts" setup>
// import { test } from '@/api';
import { test } from '../../src/api';

const loginTest = async () => {
  let res = await test();
  console.log(res);
};
</script>
<template>
  <div id="app">
    456
    <el-button type="success" @click="loginTest">123132</el-button>
    <div class="scssTest">scss Test</div>
    <a>test postcss autoprefixer</a>
  </div>
</template>

<style scoped lang="scss">
.scssTest {
  color: $theme-color;
}
a {
  text-decoration: dashed;
  user-select: none;
}
</style>

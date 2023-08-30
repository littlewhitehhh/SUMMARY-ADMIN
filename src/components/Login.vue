import autoprefixer from 'autoprefixer';
<script lang="ts" setup></script>
<template>
  <div id="app">
    <el-button type="success">123132</el-button>
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

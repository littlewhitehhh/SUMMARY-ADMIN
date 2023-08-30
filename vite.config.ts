import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';

// unocss
import UnoCSS from 'unocss/vite';
// postcss
import postcssPresetEnv from 'postcss-preset-env';
// import autoprefixer from 'autoprefixer';

import path from 'path';

const variableScssPath = normalizePath(path.resolve(__dirname, './src/style/variable.scss'));
console.log(path.resolve(__dirname, './src/main.ts'));
console.log('varibaleScssPATH', variableScssPath);

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import"${variableScssPath}";`
        }
      },
      modules: {
        // 一般可以通过generateScopeName属性对生成的类名进行自定义
        generateScopedName: '[name]_[local]_[hash64:8]'
      },
      // postcss: {
      //   plugins: [
      //     autoprefixer({
      //       // 指定目标浏览器
      //       overrideBrowserslist: ['> 1%', 'last 2 versions']
      //     })
      //   ]
      // }

      postcss: {
        plugins: [postcssPresetEnv()]
      }
    },

    plugins: [vue(), UnoCSS()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            elementPlus: ['element-plus']
          }
        }
      }
    }
  };
});

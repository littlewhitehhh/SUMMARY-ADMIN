import { defineConfig, normalizePath, loadEnv } from 'vite';
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
export default defineConfig(variable => {
  console.log('variable', variable); //{mode，command，ssrbuild}
  // loadEnv 加载 envDir 中的 .env
  const root = process.cwd();

  console.log('root:', root);
  console.log('__dirname', __dirname);

  const env = loadEnv(variable.mode, __dirname);
  console.log('env', env);

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

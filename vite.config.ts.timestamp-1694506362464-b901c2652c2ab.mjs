// vite.config.ts
import {
  defineConfig,
  normalizePath,
  loadEnv
} from 'file:///H:/program/vite-admin/vite-vue3-typescript-admin/summary-admin/node_modules/.pnpm/vite@4.4.9_@types+node@20.5.7+sass@1.66.1/node_modules/vite/dist/node/index.js';
import vue from 'file:///H:/program/vite-admin/vite-vue3-typescript-admin/summary-admin/node_modules/.pnpm/@vitejs+plugin-vue@4.3.3_vite@4.4.9+vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs';
import postcssPresetEnv from 'file:///H:/program/vite-admin/vite-vue3-typescript-admin/summary-admin/node_modules/.pnpm/postcss-preset-env@9.1.2_postcss@8.4.29/node_modules/postcss-preset-env/dist/index.mjs';
import path from 'path';
import AutoImport from 'file:///H:/program/vite-admin/vite-vue3-typescript-admin/summary-admin/node_modules/.pnpm/unplugin-auto-import@0.16.6/node_modules/unplugin-auto-import/dist/vite.js';
import Components from 'file:///H:/program/vite-admin/vite-vue3-typescript-admin/summary-admin/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs';
import { ElementPlusResolver } from 'file:///H:/program/vite-admin/vite-vue3-typescript-admin/summary-admin/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs';

// build/getEnv.ts
function wrapperEnv(envConfig) {
  const ret = {};
  for (const key of Object.keys(envConfig)) {
    let realVale = envConfig[key].replace(/\\n/g, '\n');
    realVale =
      realVale === 'true' ? true : realVale === 'false' ? false : realVale;
    if (key === 'VITE_PORT') realVale = Number(realVale);
    if (key === 'VITE_PROXY') {
      try {
        realVale = JSON.parse(realVale);
      } catch {
        throw 'error';
      }
    }
    ret[key] = realVale;
  }
  return ret;
}

// build/proxy.ts
var createProxy = proxyEnv => {
  const ret = {};
  for (const [prefix, target] of proxyEnv) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path2 => path2.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    };
  }
  return ret;
};

// vite.config.ts
var __vite_injected_original_dirname =
  'H:\\program\\vite-admin\\vite-vue3-typescript-admin\\summary-admin';
var variableScssPath = normalizePath(
  path.resolve(__vite_injected_original_dirname, './src/style/variable.scss')
);
var vite_config_default = defineConfig(variable => {
  const env = loadEnv(variable.mode, __vite_injected_original_dirname);
  const ViteEnv = wrapperEnv(env);
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
    resolve: {
      extensions: ['.ts', '.vue', '.json'],
      alias: {
        '@': path.resolve(__vite_injected_original_dirname, './src')
      }
    },
    server: {
      // proxy: {
      //   '/api': {
      //     target: '',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, '')
      //   }
      // }
      proxy: createProxy(ViteEnv.VITE_PROXY)
    },
    plugins: [
      vue(),
      // unocss插件
      // UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         elementPlus: ['element-plus']
    //       }
    //     }
    //   }
    // }
  };
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSDpcXFxccHJvZ3JhbVxcXFx2aXRlLWFkbWluXFxcXHZpdGUtdnVlMy10eXBlc2NyaXB0LWFkbWluXFxcXHN1bW1hcnktYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkg6XFxcXHByb2dyYW1cXFxcdml0ZS1hZG1pblxcXFx2aXRlLXZ1ZTMtdHlwZXNjcmlwdC1hZG1pblxcXFxzdW1tYXJ5LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9IOi9wcm9ncmFtL3ZpdGUtYWRtaW4vdml0ZS12dWUzLXR5cGVzY3JpcHQtYWRtaW4vc3VtbWFyeS1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbm9ybWFsaXplUGF0aCwgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcblxyXG4vLyB1bm9jc3NcclxuLy8gaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSc7XHJcblxyXG4vLyBwb3N0Y3NzXHJcbmltcG9ydCBwb3N0Y3NzUHJlc2V0RW52IGZyb20gJ3Bvc3Rjc3MtcHJlc2V0LWVudic7XHJcbi8vIGltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy8gZWxlbWVudC1wbHVzIFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5cclxuLy8gXHU0RTJBXHU0RUJBXHU1QzAxXHU4OEM1XHJcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tICcuL2J1aWxkL2dldEVudic7XHJcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSAnLi9idWlsZC9wcm94eSc7XHJcblxyXG5jb25zdCB2YXJpYWJsZVNjc3NQYXRoID0gbm9ybWFsaXplUGF0aChwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc3R5bGUvdmFyaWFibGUuc2NzcycpKTtcclxuLy8gY29uc29sZS5sb2cocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL21haW4udHMnKSk7XHJcbi8vIGNvbnNvbGUubG9nKCd2YXJpYmFsZVNjc3NQQVRIJywgdmFyaWFibGVTY3NzUGF0aCk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcodmFyaWFibGUgPT4ge1xyXG4gIC8vIGNvbnNvbGUubG9nKCd2YXJpYWJsZScsIHZhcmlhYmxlKTsgLy97bW9kZVx1RkYwQ2NvbW1hbmRcdUZGMENzc3JidWlsZH1cclxuICAvLyBsb2FkRW52IFx1NTJBMFx1OEY3RCBlbnZEaXIgXHU0RTJEXHU3Njg0IC5lbnZcclxuICAvLyBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgLy8gY29uc29sZS5sb2coJ3Jvb3Q6Jywgcm9vdCk7XHJcbiAgLy8gY29uc29sZS5sb2coJ19fZGlybmFtZScsIF9fZGlybmFtZSk7XHJcblxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYodmFyaWFibGUubW9kZSwgX19kaXJuYW1lKTtcclxuICAvLyBjb25zb2xlLmxvZygnZW52JywgZW52KTsgLy9lbnYgXHU2MjUzXHU1MzcwXHU1MUZBXHU2NzY1XHU3Njg0IHZhbHVlXHU5MEZEXHU2NjJGc3RyaW5nXHU3QzdCXHU1NzhCICBcdTYyNDBcdTRFRTVcdTg5ODFcdThGREJcdTg4NENcdTdDN0JcdTU3OEJcdTY1MzlcdTUzRDggIFx1NEUzQlx1ODk4MVx1NjYyRlx1N0VEOVZpdGVcdTUyMDZcdTkxNERcdTdDN0JcdTU3OEJcdUZGMUZcclxuXHJcbiAgY29uc3QgVml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KTtcclxuICAvLyBjb25zb2xlLmxvZygnVml0ZUVudicsIFZpdGVFbnYpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnRcIiR7dmFyaWFibGVTY3NzUGF0aH1cIjtgXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb2R1bGVzOiB7XHJcbiAgICAgICAgLy8gXHU0RTAwXHU4MjJDXHU1M0VGXHU0RUU1XHU5MDFBXHU4RkM3Z2VuZXJhdGVTY29wZU5hbWVcdTVDNUVcdTYwMjdcdTVCRjlcdTc1MUZcdTYyMTBcdTc2ODRcdTdDN0JcdTU0MERcdThGREJcdTg4NENcdTgxRUFcdTVCOUFcdTRFNDlcclxuICAgICAgICBnZW5lcmF0ZVNjb3BlZE5hbWU6ICdbbmFtZV1fW2xvY2FsXV9baGFzaDY0OjhdJ1xyXG4gICAgICB9LFxyXG4gICAgICBwb3N0Y3NzOiB7XHJcbiAgICAgICAgcGx1Z2luczogW3Bvc3Rjc3NQcmVzZXRFbnYoKV1cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLnRzJywgJy52dWUnLCAnLmpzb24nXSxcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgLy8gcHJveHk6IHtcclxuICAgICAgLy8gICAnL2FwaSc6IHtcclxuICAgICAgLy8gICAgIHRhcmdldDogJycsXHJcbiAgICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIC8vICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfVxyXG4gICAgICBwcm94eTogY3JlYXRlUHJveHkoVml0ZUVudi5WSVRFX1BST1hZKVxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIC8vIHVub2Nzc1x1NjNEMlx1NEVGNlxyXG4gICAgICAvLyBVbm9DU1MoKSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxyXG4gICAgICB9KVxyXG4gICAgXVxyXG4gICAgLy8gYnVpbGQ6IHtcclxuICAgIC8vICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgLy8gICAgIG91dHB1dDoge1xyXG4gICAgLy8gICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAvLyAgICAgICAgIGVsZW1lbnRQbHVzOiBbJ2VsZW1lbnQtcGx1cyddXHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfTtcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSDpcXFxccHJvZ3JhbVxcXFx2aXRlLWFkbWluXFxcXHZpdGUtdnVlMy10eXBlc2NyaXB0LWFkbWluXFxcXHN1bW1hcnktYWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkg6XFxcXHByb2dyYW1cXFxcdml0ZS1hZG1pblxcXFx2aXRlLXZ1ZTMtdHlwZXNjcmlwdC1hZG1pblxcXFxzdW1tYXJ5LWFkbWluXFxcXGJ1aWxkXFxcXGdldEVudi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vSDovcHJvZ3JhbS92aXRlLWFkbWluL3ZpdGUtdnVlMy10eXBlc2NyaXB0LWFkbWluL3N1bW1hcnktYWRtaW4vYnVpbGQvZ2V0RW52LnRzXCI7Ly8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG4vLyBcdTVDMDFcdTg4QzVcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBwZXJFbnYoZW52Q29uZmlnOiBSZWNvcmRhYmxlKTogVml0ZUVudiB7XHJcbiAgY29uc3QgcmV0OiBhbnkgPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhlbnZDb25maWcpKSB7XHJcbiAgICAvLyBcdThGRDlcdTRFMkFcdTZCNjNcdTUyMTlcdTY2MkZcdTVFNzJcdTU1NjVcdTc2ODRcdUZGMUZcclxuICAgIGxldCByZWFsVmFsZSA9IGVudkNvbmZpZ1trZXldLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcclxuXHJcbiAgICByZWFsVmFsZSA9IHJlYWxWYWxlID09PSAndHJ1ZScgPyB0cnVlIDogcmVhbFZhbGUgPT09ICdmYWxzZScgPyBmYWxzZSA6IHJlYWxWYWxlO1xyXG4gICAgaWYgKGtleSA9PT0gJ1ZJVEVfUE9SVCcpIHJlYWxWYWxlID0gTnVtYmVyKHJlYWxWYWxlKTtcclxuICAgIGlmIChrZXkgPT09ICdWSVRFX1BST1hZJykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlYWxWYWxlID0gSlNPTi5wYXJzZShyZWFsVmFsZSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIHRocm93ICdlcnJvcic7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKGtleSwgZW52Q29uZmlnW2tleV0pO1xyXG4gICAgLy8gY29uc29sZS5sb2codHlwZW9mIGVudkNvbmZpZ1trZXldKTtcclxuICAgIHJldFtrZXldID0gcmVhbFZhbGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmV0O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSDpcXFxccHJvZ3JhbVxcXFx2aXRlLWFkbWluXFxcXHZpdGUtdnVlMy10eXBlc2NyaXB0LWFkbWluXFxcXHN1bW1hcnktYWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkg6XFxcXHByb2dyYW1cXFxcdml0ZS1hZG1pblxcXFx2aXRlLXZ1ZTMtdHlwZXNjcmlwdC1hZG1pblxcXFxzdW1tYXJ5LWFkbWluXFxcXGJ1aWxkXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9IOi9wcm9ncmFtL3ZpdGUtYWRtaW4vdml0ZS12dWUzLXR5cGVzY3JpcHQtYWRtaW4vc3VtbWFyeS1hZG1pbi9idWlsZC9wcm94eS50c1wiO2ltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSAndml0ZSc7XHJcblxyXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ107XHJcblxyXG50eXBlIFByb3h5TGlzdCA9IFByb3h5SXRlbVtdO1xyXG5cclxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVByb3h5ID0gKHByb3h5RW52OiBQcm94eUxpc3QpID0+IHtcclxuICBjb25zdCByZXQ6IFByb3h5VGFyZ2V0TGlzdCA9IHt9O1xyXG4gIC8vIGNvbnN0IHJlbFByb3h5ID0gSlNPTi5wYXJzZShwcm94eUVudik7XHJcbiAgZm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIHByb3h5RW52KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygncHJveHlFbnYnLCBwcm94eUVudik7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coJ3ByZWZpeCcsIHByZWZpeCk7IC8vIC9hcGlcclxuICAgIC8vIGNvbnNvbGUubG9nKCd0YXJnZXQnLCB0YXJnZXQpO1xyXG5cclxuICAgIGNvbnN0IGh0dHBzUkUgPSAvXmh0dHBzOlxcL1xcLy87XHJcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldCk7XHJcbiAgICByZXRbcHJlZml4XSA9IHtcclxuICAgICAgdGFyZ2V0LFxyXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIHdzOiB0cnVlLFxyXG4gICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtwcmVmaXh9YCksICcnKSxcclxuICAgICAgLy8gaHR0cHMgaXMgcmVxdWlyZSBzZWN1cmU9ZmFsc2VcclxuICAgICAgLi4uKGlzSHR0cHMgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KVxyXG4gICAgfTtcclxuICB9XHJcbiAgLy8gY29uc29sZS5sb2coJ3JldCcsIHJldCk7XHJcblxyXG4gIHJldHVybiByZXQ7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1gsU0FBUyxjQUFjLGVBQWUsZUFBZTtBQUMzYSxPQUFPLFNBQVM7QUFNaEIsT0FBTyxzQkFBc0I7QUFHN0IsT0FBTyxVQUFVO0FBR2pCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCOzs7QUNaN0IsU0FBUyxXQUFXLFdBQWdDO0FBQ3pELFFBQU0sTUFBVyxDQUFDO0FBQ2xCLGFBQVcsT0FBTyxPQUFPLEtBQUss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

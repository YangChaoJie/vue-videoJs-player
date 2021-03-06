import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import externalGlobals from 'rollup-plugin-external-globals';
const primedExternalGlobals = externalGlobals({
  'global': 'window',
  'global/window': 'window',
  'global/document': 'document'
});
const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@vue/composition-api/dist/vue-composition-api.esm.js': '@vue/composition-api/dist/vue-composition-api.mjs',
      "@": path.resolve(__dirname, "src")
      // "@video": path.resolve(__dirname, "src/types")
    }
  },
  plugins: [
    vue(),
    primedExternalGlobals,
    styleImport({
      resolves: [VantResolve()],
    }),
    // styleImport({
      // libs: [
      //   {
      //     libraryName: 'vant',
      //     esModule: true,
      //     resolveStyle: (name) => `vant/es/${name}/style`,
      //   },
      //   {
      //     libraryName: 'vcom-video-player',
      //     esModule: true,
      //     resolveStyle: () => `vcom-video-player/dist/style.css`,
      //   },
      // ],
    //   resolves: [VantResolve()]
    // })      @import "./src/components/SettingMenu/SettingMenu.scss";
  ],
  css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./src/lib/video.js/dist/video-js.css";
          @import "./src/components/SettingMenu/SettingMenu.scss";
          `
        }
    }
  },
   // 在文件中添加以下内容
  server: {
    // host: 'y.vcom.com',
    host: '0.0.0.0',
    port: '80'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.js'),
      name: 'vcom-video-player',
      fileName: (format) => `yy-lib.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

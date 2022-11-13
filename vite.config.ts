import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/f2e-sign/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  css: {
    // css 前處理器
    preprocessorOptions: {
      scss: {
        charset: false,
        //需要在 assets 下建立對應的檔案 global.scss
        additionalData: '@import "./src/style/_main.scss";',
      },
    },
  },
})
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  outDir: path.resolve(__dirname, ""),
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    open: '/src/pages/index/index.html', //设置项目启动打开的首页
  },
  
})

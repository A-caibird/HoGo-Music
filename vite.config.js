import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const pathSrc = path.resolve(__dirname, 'home')
export default defineConfig({
    outDir: path.resolve(__dirname, ""),
    plugins: [vue(),
    AutoImport({
        imports: ['vue', 'vue-router',],
        resolvers: [
            ElementPlusResolver(),
            IconsResolver({
                prefix: 'Icon',
            }),
        ],
    }),
    Components({
        resolvers: [ElementPlusResolver(),
        IconsResolver({
            enabledCollections: ['ep'],
        }),],
    }),
    Icons({
        autoInstall: true,
    }),],
    build: {
        rollupOptions: {
            input: {
                // 配置所有页面路径，使得所有页面都会被打包
                home: path.resolve(__dirname, './home/index.html'),
                login: path.resolve(__dirname, './login/index.html'),
                index: path.resolve(__dirname, './index.html'),
            }
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, "src"),
            'root': __dirname,
        }
    },
    server: {
        open: '', //设置项目启动打开的首页,
        proxy: {                              //配置跨域请求
            "/download": {
                target: "http://localhost:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/download/, ""),
            }
        },
        host: '0.0.0.0',
        port: 5173
    }
})

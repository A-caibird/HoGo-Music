import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Postcss from 'postcss'
const pathSrc = path.resolve(__dirname, 'src')
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
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
        resolvers: [ElementPlusResolver(),
        IconsResolver({
            enabledCollections: ['ep'],
        }),],
        dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    Icons({
        autoInstall: true,
    }),],
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    server: {
        open: '/src/pages/login/index.html', //设置项目启动打开的首页,
        proxy: {                              //配置跨域请求
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'src/pages/index/index.html'),
                // nested: path.resolve(__dirname, 'src/pages/nested/index.html'),
            }
        }
    }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    server: {
        open: '/src/pages/index/index.html', //设置项目启动打开的首页
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

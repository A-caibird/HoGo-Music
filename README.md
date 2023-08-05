# 基于Vue 3 + Vite 在线音乐平台

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## vite-vue项目初始化
`pnpm create vite <project-name>  --template vue`

## 初始化git项目
1. cd 进入项目根目录
2. `git init`
3. 关联远端仓库:`git remote add <remote-resgisty-name> url 链接`
4. 第一次提交: `git push -u  <远端仓库名字> <远端分支名字>` ,这个会将远端的分支和本地这个分支关联.
## 安装sass
`pnpm install sass`

## [配置elment-plus组件](https://element-plus.org/zh-CN/guide/quickstart.html)

## [vite多页面的配置](https://juejin.cn/post/7106707438900314148)
`/`在vite中表示根目录,注意无论是vite还是webpack,还是vue-cli初始的index.html路径不能改变.在index.html中去跳转页面
```
<script>
  window.location.href = '/src/pages/login/index.html'
</script>
```

## [配置多页面路由router](https://blog.csdn.net/qq_42825870/article/details/120749062)
安装vue-router :`pnpm i vue-router@4`

## [安装tailwind-css框架](https://www.tailwindcss.cn/docs/guides/vite#vue)

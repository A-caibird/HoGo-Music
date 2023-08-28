# 基于Vue 3 + Vite 在线音乐平台

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## 依赖配置
### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### vite-vue项目初始化
`pnpm create vite <project-name>  --template vue`

### 初始化git项目
1. cd 进入项目根目录
2. `git init`
3. 关联远端仓库:`git remote add <remote-resgisty-name> url 链接`
4. 第一次提交: `git push -u  <远端仓库名字> <远端分支名字>` ,这个会将远端的分支和本地这个分支关联.
## 安装sass
`pnpm install sass`

### [配置elment-plus组件](https://element-plus.org/zh-CN/guide/quickstart.html)

## [vite多页面的配置](https://juejin.cn/post/7106707438900314148)
`/`在vite中表示根目录,注意无论是vite还是webpack,还是vue-cli初始的index.html路径不能改变.在index.html中去跳转页面
```
<script>
  window.location.href = '/src/pages/login/index.html'
</script>
```

### [配置多页面路由router](https://blog.csdn.net/qq_42825870/article/details/120749062)
安装vue-router :`pnpm i vue-router@4`

### [安装tailwind-css框架](https://www.tailwindcss.cn/docs/guides/vite#vue)


### [自动导入element-plus的icon图标](https://blog.csdn.net/qq_39111074/article/details/130063159)
使用需要加上前缀 `i-ep-` `<i-ep-Edit style="width: 1em; height: 1em; margin-right: 8px" />`


### [安装express](https://www.expressjs.com.cn/starter/hello-world.html)

### [安装mysql2,支持myql8](https://www.npmjs.com/package/mysql2)

### [安装pinia实现vue共享状态](https://pinia.vuejs.org/zh/core-concepts/)

###  [nodejs服务器,安装cors,解决跨域请求问题](https://juejin.cn/post/6844903945656074248)
```js
npm install cors --save-dev
const cors = require('cors');
app.use(cors());

//手动安装
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
```


## 数据库表结构

### 用户信息表
```mysql
CREATE TABLE `users` (
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

增加用户信息表属性
```mysql
ALTER TABLE users ADD COLUMN email VARCHAR(255);
UPDATE users SET email = 
    CASE 
        WHEN id = 1 THEN 'user1@example.com'
        WHEN id = 2 THEN 'user2@example.com'
        WHEN id = 3 THEN 'user3@example.com'
        ELSE 'unknown@example.com'
    END;
```


## [vite配置反向代理,解决跨域问题](https://zxuqian.cn/vite-proxy-config/)

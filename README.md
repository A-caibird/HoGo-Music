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
### 安装[multer](https://github.com/expressjs/multer/blob/master/README.md)
安装multer处理文件上传请求,js包,上述是他的说明文档

## 数据库表结构

### 用户信息表table
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

增加账户是否激活状态,默认设置为1,也就是激活的状态
```mysql
ALTER TABLE users ADD active INT DEFAULT 1;
```
### 歌曲列表table
歌曲列表
```mysql
CREATE TABLE `musicList` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `musicName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `singerName_album` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timeLength` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### 歌曲列表table
歌曲评价列表
```mysql
CREATE TABLE `commentList` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `musicName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commentContent` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

修改歌曲评价列表时间列,让时间为更新列表的时间,如果新增元组,默认是新增时候的元组
```mysql
alter table  `commentList`
modify `date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```

## [vite配置反向代理,解决跨域问题](https://zxuqian.cn/vite-proxy-config/)


## [audio元素创建,播放音频](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)


## vue路由
router.push跳转路由有浏览器缓存记录,如果当前页面是/,点击a以后url为/a,点击b以后会为/b,而不是/a/b;

## 上传文件,保存到服务器指定地址.如何保留原始文件名称和文件类型
使用`multer` 磁盘管理引擎diskStorage
```javascript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/mp3/'); // 指定上传的目标文件夹
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;  // 获取文件名称
        const extension = path.extname(originalFileName); // 获取文件的扩展名
        const fileName = originalFileName.slice(0, originalFileName.lastIndexOf(extension));
        cb(null, fileName + extension);
        // cb(null, fileName + '-' + Date.now() + extension); // 添加时间戳以确保文件名的唯一性
    }
});
const uploadFile = multer({ storage });
```

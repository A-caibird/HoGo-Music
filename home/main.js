import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '/router/router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 没登陆就跳转路由到登陆
const isLoggedIn = !!localStorage.getItem('name'); // 前端检查用户是否已登录
const currentPath = window.location.pathname; // 获取当前路径
console.log(currentPath)
if (currentPath === '/src/pages/index/index.html' && !isLoggedIn) {
    // 用户未登录且访问的是 "/home"，重定向到登录页
    window.location.href = '/src/pages/login/index.html';
    console.log("用户没有登录");
}
/*
// 在页面加载时执行的代码
window.addEventListener('DOMContentLoaded', () => {

DOMContentLoaded：当初始的 HTML 文档已经完全加载和解析时触发。
load：当整个页面及其所有资源（如图片和样式表）都已加载完毕时触发。
DOMContentLoaded 和 load 事件都需要等待页面资源完全加载才会触发，因此可能需要一些时间。
如果你希望在页面加载的早期阶段执行代码，可以考虑使用以下事件：

readystatechange：当文档的 readyState 属性发生变化时触发。readyState 属性表示文档的加载状态，可以有不同的取值（例如 "loading"、"interactive"、"complete"）。
DOMContentLoaded 和 readystatechange 事件在页面的 DOM 结构构建完成后就会触发，而不需要等待其他资源的加载完成。
readystatechange 事件可以在页面加载的早期阶段执行代码，但需要根据 readyState 属性的值进行适当的判断。
 });
*/
createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(createPinia())
    .mount('#app')


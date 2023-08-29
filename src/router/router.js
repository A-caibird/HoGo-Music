import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import mine from '/src/components/mine/mine.vue';
import Home from '/src/components/index/index.vue';
import userMange from '/src/components/userMange/userMange.vue';
const routes = [
    { path: '/', component: Home },
    { path: '/mine', component: mine },
    { path: '/userMange', component: userMange },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;

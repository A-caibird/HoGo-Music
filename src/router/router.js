import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import mine from '/src/components/mine/mine.vue';
import Home from '/src/components/index/index.vue';
import userMange from '/src/components/userMange/userMange.vue';
import musicList from '/src/components/musicList/index.vue';
const routes = [
    { path: '/', component: Home },
    { path: '/mine', component: mine },
    { path: '/userMange', component: userMange },
    { path: '/musicList', component: musicList },
    { path: '/musicList/:musicName', component: musicList },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;

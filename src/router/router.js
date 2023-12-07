import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import mine from '/src/components/mine/mine.vue';
import Home from '/src/components/index/index.vue';
import userMange from '/src/components/userMange/userMange.vue';
import musicList from '/src/components/musicList/index.vue';
import songHome from '/src/components/musicComment/index.vue';
import aboutUs from '/src/components/aboutUs/index.vue';
import musicMange from '/src/components/musicMange/index.vue';
import addMusic from '/src/components/addMusic/index.vue';
import modifyMusic from '/src/components/modifyMusic/index.vue';
import vip from '/src/components/vip/index.vue'
import TopIn from '/src/components/top-in/index.vue'
const routes = [
    { path: '/', component: Home },
    { path: '/mine', component: mine },
    { path: '/userMange', component: userMange },
    { path: '/musicList', component: musicList },
    { path: '/musicList/:musicName', component: musicList },
    { path: '/songHome/:musicName', component: songHome },
    { path: '/aboutUs', component: aboutUs },
    { path: '/musicMange', component: musicMange },
    { path: '/addMusic', component: addMusic },
    { path: '/modifyMusic/:musicName', component: modifyMusic },
    { path: '/vip', component: vip },
    { path: '/topin', component: TopIn }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;

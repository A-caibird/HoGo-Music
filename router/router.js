import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import mine from '/components/mine/mine.vue';
import Home from '/components/index/index.vue';
import userMange from '/components/userMange/userMange.vue';
import musicList from '/components/musicList/index.vue';
import songHome from '/components/musicComment/index.vue';
import aboutUs from '/components/aboutUs/index.vue';
import musicMange from '/components/musicMange/index.vue';
import addMusic from '/components/addMusic/index.vue';
import vip from '/components/vip/index.vue'
import TopIn from '/components/top-in/index.vue'
import 'nprogress/nprogress.css'
import { useNProgress } from '@vueuse/integrations/useNProgress'
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
    { path: '/vip', component: vip },
    { path: '/topin', component: TopIn },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 通过useNProgress，导出一个isLoading
const { isLoading } = useNProgress(null, {
    showSpinner: false
})
// 在路由进入和离开的时候时候，改变isLoading
router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
})
router.afterEach((to, from, next) => {
    isLoading.value = false
    next()
})
export default router;

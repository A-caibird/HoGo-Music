import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import mine from '/src/components/mine/mine.vue';
import Home from '/src/components/index/index.vue';
const routes = [
    { path: '/', component: Home },
    { path: '/mine', component: mine },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '/src/components/index/index.vue';
const routes = [
    { path: '/', component: Home },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router;

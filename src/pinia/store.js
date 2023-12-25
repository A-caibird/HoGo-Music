import { defineStore } from 'pinia';
import $ from 'jquery'
export const useAlertsStore = defineStore('pageSwitch', {
    state: () => ({ current: 'home' }),
})


// 是否打开套餐设置侧边抽屉
export const drawerStatus = defineStore('drawer', {
    state: () => {
        return { status: false}
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        open() {
            this.status = true;
        },
        close() {
            this.status = false;
        },
    },
})
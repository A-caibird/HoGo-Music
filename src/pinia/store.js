import {defineStore} from 'pinia';
import {ref} from 'vue'
import $ from "jquery";


/**
 * vip套餐设置侧边抽屉展示状态  --pinia
 */
export const drawerStatus = defineStore('drawer', {
    state: () => {
        return {status: false}
    }, // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        open() {
            this.status = true;
        }, close() {
            this.status = false;
        },
    },
})

/**
 *  vip套餐信息 --pinia
 */
export const vipInfo = defineStore('vipinfo', () => {
    const vipinfo = ref(null)

    return {vipinfo}
})

/**
 * 音乐修改对话框展示状态 --pinia
 */
export const musicDiago = defineStore('musiciago', () => {
    let dis = ref(false);

    function open() {
        dis.value = true;

        // 当对话框加入到dom的时候删除头部
        $(function () {
            $("header[class=\"el-dialog__header\"]").remove();
        })
    }

    function close() {
        dis.value = false;
    }

    return {dis, open, close}
})
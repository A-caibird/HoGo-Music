<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { getComboList, upgradeCombo } from '@/api/api.js'
import { ElMessage } from 'element-plus'
const list = ref([])
function submitOk() {
    upgradeCombo(list.value).then(res => {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    }).catch(e => {
        console.log(e.response)
        if (e.response.status == 401) {
            ElMessage({
                message: 'Session过期,请重新登录后再试!',
                type: 'error'
            })
        }
        else {
            ElMessage({
                message: '服务器错误,修改失败',
                type: 'error',
            })
        }
    })
}
onMounted(() => {
    getComboList().then(res => {
        list.value = res.data
    }).catch(e => {
        console.log(e)
    })
})
</script>
<template>
    <div class="flex flex-col items-center ">
        <div class="grid grid-rows-[40px_600px] mt-[40px] px-[]">
            <div class="row-span-1  bg-slate-300 w-full h-[200px] justify-center flex flex-row p-[10px]">
                <span>
                    套餐价格设置
                </span>
            </div>
            <div class="row-span-1 panel  w-full px-[20px] relative ">
                <div class="flex flex-row gap-x-[80px] w-full mb-[1rem]">
                    <span class="w-[100px] bg-red-500 flex justify-center text-[20px] p-[2px]">
                        套餐名称
                    </span>
                    <span class="w-[100px] bg-red-500 flex justify-center text-[20px] p-[2px]">
                        初始价格
                    </span>
                    <span class="w-[100px] bg-red-500 flex justify-center text-[20px] p-[2px] ">
                        活动价格
                    </span>
                </div>
                <div class="flex flex-col gap-4">
                    <div v-for="(item, index) in list" :key="index" class="flex flex-row gap-x-[80px] w-full">
                        <span class="w-[100px] flex justify-center">
                            {{ item.name }}
                        </span>
                        <span class="flex justify-center w-[100px]">
                            <input v-model="item.price_origin" class="w-[100px] text-center" type="number" min="0" />
                        </span>
                        <span classs="flex justify-center w-[100px]">
                            <input v-model="item.price_now" class="w-[100px] text-center" type="number" min="0" />
                        </span>
                    </div>
                </div>
                <div class="absolute bottom-[60px] w-full">
                    <div class="flex justify-center">
                        <span class="px-[20px] py-[3px] rounded-2xl bg-red-700 w-[200px] text-center" @click="submitOk">
                            修改完成
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.panel {
    background: #ee9ca7;
    background: -webkit-linear-gradient(to right, #ffdde1, #ee9ca7);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ffdde1, #ee9ca7);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
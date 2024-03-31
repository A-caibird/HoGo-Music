<template>
    <el-drawer v-model="drawer.status" header=" VIP 套餐价格修改" direction="rtl" size="50%" show-close="false">
        <div class="flex flex-col justify-between">
            <div class="grid grid-rows-[100px_600px]">
                <div class="row-span-1  bg-slate-700 w-full justify-center flex flex-row p-[10px] box-border text-[25px]">
                    <span>
                        VIP 套餐价格修改
                    </span>
                </div>
                <div class="row-span-1 panel  w-full px-[20px] relative panle">
                    <div class="flex flex-row gap-x-[80px] w-full mb-[1rem] justify-around">
                        <span class="w-[100px] bg-red-500 flex justify-center text-[20px] p-[2px]" ji="2323">
                            套餐名称
                        </span>
                        <span class="w-[100px] bg-red-500 flex justify-center text-[20px] p-[2px]">
                            初始价格
                        </span>
                        <span class="w-[100px] bg-red-500 flex justify-center text-[20px] p-[2px] ">
                            活动价格
                        </span>
                    </div>
                    <div class="flex flex-col gap-4 ">
                        <div v-for="(item, index) in list" :key="index"
                            class="flex flex-row gap-x-[80px] w-full justify-around">
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
    </el-drawer>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { getComboList, upgradeCombo } from '/api/api.js'
import { ElMessage, ElDrawer } from 'element-plus'
import { drawerStatus } from '/pinia/store.js'
import $ from 'jquery'

const list = ref([])
// pinna打开状态管理
const drawer = drawerStatus()

// 移除抽屉头部
$(document).ready(function () {
    $(".el-drawer__header").remove()
    console.log($("#el-id-6983-6"))
    $(".el-drawer").addClass(function () {
        return "back1"
    })
})

// 提交
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

<style scoped>
:deep(.el-drawer__header) {
    display: none !important;
}


:deep(.el-drawer) {
    background-color: #ED213A !important;
}
</style>
<script setup>
import { shopVip, payVip, getVipInfo } from '@/api/api.js'
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const name = localStorage.getItem("name")
const isVip = ref(false)
const time = new Date()
const price = ref(180)

const curYear = ref(time.getFullYear())
const curMonth = ref(time.getMonth())
const curTime = ref(curYear.value + "-" + curMonth.value + "-" + time.getDate())
const destTime = ref((curYear.value + 1) + "-" + (curMonth.value) + "-" + time.getDate())

const arr = ref([1, 0, 0, 0])
function funcClickSelect(t, p, index) {
    // 改变vip时间
    price.value = p
    let m = curMonth.value + t
    let y = curYear.value
    let res = new String("")
    if (m / 12 > 1) {
        y++
        m -= 12
    }
    destTime.value = y + "-" + m + "-" + time.getDate()

    // 改变样式
    let temp = [0, 0, 0, 0]
    temp[index] = 1
    arr.value = temp
}

const selectPayMethods = ref(true)
function funcSelectPay(index) {
    if (index === 1) {
        selectPayMethods.value = true;
    } else {
        selectPayMethods.value = false;
    }
}

function funcClickPay() {
    payVip({ price: price.value, name: localStorage.getItem("name") }).then(res => {
        shopVip({
            username: localStorage.getItem('name'),
            startDate: curTime.value,
            endDate: destTime.value
        }).then(response => {
            alert("支付成功")
            console.log(response.data)
        }).then(error => {
            console.error(error.data)
        })
        console.log(res.data)

    }).catch(error => {
        if (error.response.status == 400) {
            let ok = confirm("余额不足,请充值")
            if (ok) {
                alert("即将跳转到充值页面       ")
                router.push({ path: '/topin' })
            }
        } else {
            alert("服务器错误,请稍后再试")
        }
    })
}

// 套餐信息
let comboInfo = ref([])
{
    watch(//这个时候不能用.value且必须是深度监听，这种写法不仅可以监听数组本身的变化，也可以监听 数组元素的变化
        comboInfo,
        () => {
            console.log('空数组变化了')
        },
        {
            deep: true
        }
    )
}

onMounted(() => {
    getVipInfo({
        username: localStorage.getItem('name')
    }).then(res => {
        isVip.value = res.data.vipStatus;
    }).catch(e => {
        console.error(e)
        console.log("获取vip状态错误")
    })

    // 通过WebSocket接收最新的套餐信息
    {
        let ws = null;
        let host = window.location.host
        console.log(host)
        try {
            ws = new WebSocket("ws://localhost:8080" + "/websocket/comboInfo");
        } catch (e) {
            console.log("错误:" + e)
        }

        ws.onopen = function () {
            const message = 'Hello from client!';
            ws.send(message);
        };

        ws.onmessage = function (data) {
            let temp = JSON.parse(data.data)
            console.log(temp)
            comboInfo.value = temp.list
            console.log(comboInfo.value)
            if (temp.type && name !== 'root')
                alert("套餐价格已经更新")
        };

        ws.onclose = function () {
            console.log('Disconnected from WebSocket server');
        };
    }
})
</script>
<template>
    <div class="grid grid-cols-[200px_auto_200px] h-full py-[60px] w-full">
        <div class="cols-start-2 col-end-3 ] h-[600px] rounded-lg grid grid-cols-[200px_auto]">
            <div class="col-span-1 h-full border-r-2 border-black bg-[#EF6351]">
                <div class="flex flex-col items-center">
                    <image src="/vip.jpeg" class="w-full h-full">
                    </image>
                    <div class="flex flex-col items-center gap-y-5">
                        <span class="mt-[20px] font-DiyChineseFont">
                            千万曲库
                        </span>
                        <span>
                            不限量下载
                        </span>
                        <span>
                            无损音质
                        </span>
                        <span>
                            尊贵身份标识
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-span-1 h-full px-[20px] bg-[#F38375] relative">
                <div class="w-full flex  py-[20px]  border-fuchsia-200 border-dashed border-b-[1px]">
                    <span class="w-[110px]">
                        开通账号
                    </span>
                    <span class="mr-[20px]">
                        {{ name }}
                    </span>
                    <span class="p-[3px] bg-yellow-300 rounded-lg text-[12px] ">
                        已开通豪华VIP
                    </span>
                    <span>

                    </span>
                </div>
                <div class="py-[20px] gap-[20px] flex flex-col  w-full">
                    <div class="">
                        <span class="w-[90px] inline-block">
                            产品类型
                        </span>
                        <span>
                            （豪华VIP特权，开通即送音乐包）
                        </span>
                    </div>
                    <div class=" h-[60px] flex">
                        <span class="w-[90px] inline-block mr-[14px]">
                            开通时长
                        </span>
                        <span class="flex  gap-x-[20px]" v-if="comboInfo.length > 0">
                            <span class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300"
                                :class="{
                                    'border-white': arr[0]
                                }" @click="funcClickSelect(12, 180, 0)">
                                <div class="flex gap-2">
                                    <span>
                                        {{ comboInfo[0].name }}
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        {{ comboInfo[0].price_now }}元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        {{ comboInfo[0].price_origin }}元
                                    </del>
                                </div>
                            </span>
                            <span class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300"
                                @click="funcClickSelect(6, 90, 1)" :class="{
                                    'border-white': arr[1]
                                }">
                                <div class="flex gap-2">
                                    <span>
                                        {{ comboInfo[0].name }}
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        {{ comboInfo[1].price_now }}元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        {{ comboInfo[1].price_origin }}元
                                    </del>
                                </div>
                            </span>
                            <span class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300 "
                                @click="funcClickSelect(3, 45, 2)" :class="{
                                    'border-white': arr[2]
                                }">
                                <div class="flex gap-2">
                                    <span>
                                        {{ comboInfo[2].name }}
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        {{ comboInfo[2].price_now }}元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        {{ comboInfo[2].price_origin }}元
                                    </del>
                                </div>
                            </span>
                            <span class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300"
                                @click="funcClickSelect(1, 15, 3)" :class="{
                                    'border-white': arr[3]
                                }">
                                <div class="flex gap-2">
                                    <span>
                                        {{ comboInfo[3].name }}
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        {{ comboInfo[3].price_now }}元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        {{ comboInfo[3].price_origin }}元
                                    </del>
                                </div>
                            </span>
                        </span>
                    </div>
                    <div class="w-full">
                        <span class="w-[100px] inline-block ">
                            应付金额
                        </span>
                        <span class="text-[#f43f5e] text-[30px]">
                            {{ price }}
                        </span>
                        <span>
                            元
                        </span>
                    </div>
                    <div>
                        <span class="w-[100px] inline-block">
                            <span>
                                VIP
                            </span>
                            <span>
                                有效期
                            </span>
                        </span>
                        <span>
                            <span>
                                {{ curTime }}
                            </span>
                            <span>
                                -
                            </span>
                            <span>
                                {{ destTime }}
                            </span>
                        </span>
                    </div>
                    <div class="flex">
                        <div class="w-[100px]">
                            支付平台
                        </div>
                        <div class="flex justify-center gap-[60px]">
                            <div class="w-[100px] h-[100px] hover:"
                                :class="{ 'border': selectPayMethods, 'border-indigo-600': selectPayMethods, 'drop-shadow-2xl': selectPayMethods }"
                                @click="funcSelectPay(1)">
                                <img src="/pay/WePay.png" class="w-full h-full">
                            </div>
                            <div class="w-[100px] h-[100px]"
                                :class="{ 'border': !selectPayMethods, 'border-indigo-600': !selectPayMethods, 'drop-shadow-2xl': !selectPayMethods }"
                                @click="funcSelectPay(2)">
                                <img src="/pay/AliPay.png" class="w-full h-full scale-[1]">
                            </div>
                        </div>
                    </div>
                    <div class="absolute bottom-[40px] flex">
                        <div class="w-[100px]">
                        </div>
                        <div class="flex justify-center">
                            <span class="px-[20px] py-[10px] bg-[#F4C3C2] rounded-l" @click="funcClickPay">确认付款</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

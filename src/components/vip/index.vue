<script setup>
import { ref } from 'vue'
const name = localStorage.getItem("name")
const time = new Date()
const price = ref(180)
const destTime = ref("")
const curYear = ref(time.getFullYear())
const curMonth = ref(time.getMonth())
const curTime = ref(curYear.value + "-" + curMonth.value + "-" + time.getDate())

destTime.value = (curYear.value + 1) + "-" + (curMonth.value) + "-" + time.getDate()
function clickSelect(t, p) {
    price.value = p
    let m = curMonth.value + t
    let y = curYear.value
    let res = new String("")
    if (m / 12 > 1) {
        y++
        m -= 12
    }
    destTime.value = y + "-" + m + "-" + time.getDate()
}

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
                    <span>
                        {{ name }}
                    </span>
                </div>
                <div class="py-[20px] gap-[20px] flex flex-col  w-full">
                    <div class="">
                        <span class="w-[90px] inline-block bg-">
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
                        <span class="flex  gap-x-[20px]">
                            <span
                                class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300 hover:border-white"
                                @mouseover="clickSelect(12, 180)">
                                <div>
                                    <span>
                                        1年
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        180元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        216元
                                    </del>
                                </div>
                            </span>
                            <span
                                class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300 hover:border-white"
                                @mouseover="clickSelect(6, 90)">
                                <div>
                                    <span>
                                        6个月
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        90元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        108元
                                    </del>
                                </div>
                            </span>
                            <span
                                class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300 hover:border-white" @mouseover="clickSelect(3, 45)">
                                <div>
                                    <span>
                                        3个月
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        45元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        54元
                                    </del>
                                </div>
                            </span>
                            <span
                                class="border-[1px] flex items-center flex-col justify-center p-[10px] border-red-300 hover:border-white" @mouseover="clickSelect(1, 15)">
                                <div>
                                    <span>
                                        1个月
                                    </span>
                                    <span class=" text-[#f43f5e]">
                                        15元
                                    </span>
                                </div>
                                <div class="text-[10px]">
                                    <span class="">
                                        原价
                                    </span>
                                    <del class="">
                                        18元
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
                            <div class="w-[100px] h-[100px] hover:drop-shadow-2xl"  >

                                <img src="/pay/WePay.png" class="w-full h-full">
                            </div>
                            <div class="w-[100px] h-[100px] hover:drop-shadow-2xl">
                                <img src= "/pay/AliPay.png" class="w-full h-full scale-[1]">
                            </div>
                        </div>
                    </div>
                    <div class="absolute bottom-[40px] flex">
                        <div class="w-[100px]">
                        </div>
                        <div class="flex justify-center">
                            <span class="px-[20px] py-[10px] bg-[#F4C3C2] rounded-xl drop-shadow-lg">确认付款</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

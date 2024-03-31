<script setup>
import { onMounted, ref, toDisplayString } from 'vue';
import { getVipInfo, topIn } from '/api/api.js'
import { ElMessage } from 'element-plus';
// 输入时候的输入框样式
const inputClass = ref(false);

// 是否是vip
const vip = ref(false);

// 支付方式激活样式
const payMethodActiveClass = ref(true);
let payMethod = "Alipay";

function fnCickSelect(n) {
    if (n == 1) {
        payMethod = "Alipay"
        payMethodActiveClass.value = payMethodActiveClass.value ? false : true;
    } else {
        payMethod = "Wechat"
        payMethodActiveClass.value = false;
    }
}

let ArrTrue = ref([true, false, false, false, false, false])
let amount = 20
function fnClickPrice(i) {
    let arr = [false, false, false, false, false, false];
    arr[i] = true;
    amount = (1 + i) * 20;
    ArrTrue.value = arr;
    console.log(ArrTrue.value)
}


function fnClickPay() {
    console.log({ username: localStorage.getItem("name"), payMethod, amount });
    topIn({ username: localStorage.getItem("name"), payMethod, amount }).then(res => {
        ElMessage.success("充值成功")
    }).catch(err => {
        ElMessage.error("抱歉,服务器出现错误,请稍后再试");
    })
}
onMounted(function () {
    // 获取vip状态
    getVipInfo({ username: localStorage.getItem('name') }).then(res => {
        vip.value = res.data.vipStatus
    }).catch(err => {
        ElMessage.error("抱歉,服务器出现错误,请稍后再试");
    })
})
</script>
<template>
    <div class="container flex justify-center  pt-[20px] box-border font-sans">
        <div class="grid grid-cols-[240px_auto] w-[800px] h-[670px]">
            <div class="left bg-[rgba(0,169,255,0.1)] col-span-1 p-[40px] box-border flex flex-col items-center">
                <div class="image-box  w-[160px] h-[160px]">
                    <img src="/avatar/default.jpg" class="w-full h-full rounded-full">
                </div>
                <div class="name mt-[10px]">梦想起航</div>
                <div class=" text-[12px]/[12px] whitespace-nowrap mt-[8px] text-[#000000]">账号:5085285fd22</div>
                <p class="bg-[linear-gradient(to_top_left,_#f0d08d,_#ffe5b4)] rounded-[14px] py-[5px] px-[25px] text-[#6B4726] text-[12px]/[12px] mt-[12px]"
                    :class="{ 'visible': vip }">
                    尊贵的豪华VIP
                </p>
            </div>
            <div class="right bg-[white] col-span-1 p-[20px] flex flex-col gap-y-10">
                <div class="flex flex-col gap-y-4">
                    <div>
                        优惠码
                    </div>
                    <div class="h-[30px]">
                        <input class="w-full h-full outline-none border-2 border-[#d946ef] rounded-[12px] "
                            :class="{ 'inputActive': inputClass }" @focus="inputClass = true" @blur="inputClass = false"
                            ref="inputDom" />
                    </div>
                </div>
                <div class="flex flex-col gap-y-4">
                    <div>
                        充值金额
                    </div>
                    <div class="grid grid-cols-3 grid-rows-2 gap-[20px]">
                        <span class="border-0  rounded-[12px] flex justify-center items-center h-[40px]"
                            v-for="(item, index) in 6" :key="item"
                            :class="{ 'active': ArrTrue[index], 'bg-[#d946ef]': !ArrTrue[index] }"
                            @click="fnClickPrice(index)">
                            {{ (item) * 20 }}元
                        </span>
                    </div>
                </div>
                <div class="flex flex-col gap-y-4">
                    <div>
                        支付方式
                    </div>
                    <div class="flex gap-x-8">
                        <span class="w-[160px] h-[160px] p-[2px] " @click="fnCickSelect(1)"
                            :class="{ 'bg-[#81F4E1]': payMethodActiveClass }">
                            <img src="/pay/AliPay.png" />
                        </span>
                        <span class="w-[160px] h-[160px] p-[2px] " @click="fnCickSelect(2)"
                            :class="{ 'bg-[#81F4E1]': !payMethodActiveClass }">
                            <img src="/pay/WePay.png">
                        </span>
                    </div>
                </div>
                <div class="w-full flex justify-center items-center h-full">
                    <span class="bg-[#d946ef] px-[80px] py-[10px] rounded-3xl" @click="fnClickPay">
                        确认支付
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.active {
    @apply transition;
    @apply delay-[50];
    @apply duration-300;
    @apply ease-in-out;
    @apply shadow-2xl;
    @apply bg-[#81F4E1];
}

.inputActive {
    color: red;
    border-color: #81F4E1 !important;
    @apply transition;
    @apply delay-[50];
    @apply duration-300;
    @apply ease-in-out;
    @apply shadow-2xl;
}
</style>


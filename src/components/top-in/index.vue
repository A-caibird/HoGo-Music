<script setup>
import { ref } from 'vue';
const payMethod = ref(true);
const inputClass = ref(false)
function fnCickSelect(n) {
    if (n == 1) {
        payMethod.value = payMethod.value ? false : true;
    }
    else
        payMethod.value = false;
}
let ArrTrue = ref([true, false, false, false, false, false])
function fnClickPrice(i) {
    let arr = [false, false, false, false, false, false];
    arr[i] = true;
    ArrTrue.value = arr;
    console.log(ArrTrue.value)
}
function fnInput(e) {
    console.log(e.target.tagName);
    if (e.target.tagName == "INPUT")
        inputDom.value.classList.add("inputActive");

    else
        inputDom.value.classList.remove("inputActive");
}

</script>
<template>
    <div class="container flex justify-center  pt-[20px] box-border font-sans">
        <div class="grid grid-cols-[240px_auto] w-[800px] h-[670px]">
            <div class="left bg-[rgba(0,169,255,0.1)] col-span-1 p-[40px] box-border flex flex-col items-center">
                <div class="image-box  w-[160px] h-[160px]">
                    <img src="/avatar/1.jpg" class="w-full h-full rounded-full">
                </div>
                <div class="name mt-[10px]">梦想起航</div>
                <div class=" text-[12px]/[12px] whitespace-nowrap mt-[8px] text-[#000000]">账号:5085285fd22</div>
                <p
                    class="bg-[linear-gradient(to_top_left,_#f0d08d,_#ffe5b4)] rounded-[14px] py-[5px] px-[25px] text-[#6B4726] text-[12px]/[12px] mt-[12px]">
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
                            :class="{ 'bg-[#81F4E1]': payMethod }">
                            <img src="/pay/AliPay.png" />
                        </span>
                        <span class="w-[160px] h-[160px] p-[2px] " @click="fnCickSelect(2)"
                            :class="{ 'bg-[#81F4E1]': !payMethod }">
                            <img src="/pay/WePay.png">
                        </span>
                    </div>
                </div>
                <div class="w-full flex justify-center items-center h-full">
                    <span class="bg-[#d946ef] px-[80px] py-[10px] rounded-3xl">
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


<script setup>
import { ref } from 'vue';
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
                        <input class="w-full h-full outline-none border-2 border-[#d946ef] rounded-[12px] " />
                    </div>
                </div>
                <div  class="flex flex-col gap-y-4">
                    <div>
                        充值金额
                    </div>
                    <div class="grid grid-cols-3 grid-rows-2 gap-[20px]">
                        <span class="border-0 bg-[#d946ef] rounded-[12px] flex justify-center items-center h-[40px]"  v-for="item in 6" :key="item">
                            {{item*20}}元
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped></style>

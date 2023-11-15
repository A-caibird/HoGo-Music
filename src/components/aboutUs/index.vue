<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
</script>
<template>
    <div class="w-full h-full relative flex flex-col items-center justify-center">
        <div class="">
            <div class="flex items-center flex-col mb-[60px]">
                <div class="w-[100px] h-[100px]">
                    <image src="/avatar/icon.png" class="w-full h-full">
                    </image>
                </div>
            </div>
            <div class="flex flex-col items-center font-serif ">
                <span style="font-family: 'Lobster', cursive;">
                    HoGo Music aims to be a DIY online music platform mainly in light colors, listening and pleasing
                    people's voices
                </span>
            </div>
            <div class="flex flex-col items-center justify-center font-serif ">
                <div class="flex gap-x-[20px]">
                    <span class="">HoGo Version:</span>
                    <span>
                        1.2.4
                    </span>
                </div>
                <span>
                    &copy; 2003-2023 Dvil.com 版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin Email:newcoder@icloud.com
                </span>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center absolute mb-[90px] w-full">
        <div class="w-full flex justify-between px-[200px]" >
            <span>
                增值电信业务经营许可证： 浙B2-20080101
            </span>
            <span>
                域名注册服务机构许可： 浙D3-20210002 京D3-20220015
            </span>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-icon) {
    color: #64748b !important;
}

:deep(.stop>.el-icon) {
    color: red !important;
}

:deep(.el-input__wrapper) {
    box-shadow: none !important;
}
</style>

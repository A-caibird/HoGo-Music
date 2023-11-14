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
            <div class="flex flex-col items-center font-serif">
                <span>
                    本网站旨在作为一个以浅色调为主的第三方音乐平台,支持下载音乐,上传音乐
                </span>
                <span>
                    若有问题请联系管理员: newcoder@icloud.com
                </span>
                <span class="mt-[20px] flex gap-x-[20px]">
                    <span class="">Version:</span>
                    <span>
                        1.2.1
                    </span>
                </span>
            </div>
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

<script setup>
function goBlog() {
    window.open('http://a-caibird.github.io','_blank')
}
</script>
<template>
    <div class="relative mt-[40px] flex flex-col justify-between h-[100vh]">
        <div class="w-full h-full  flex flex-col items-center justify-center">
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
                    <span @click="goBlog">
                        &copy; 2003-2023 a-caibird.github.io 版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin Email:newcoder@icloud.com
                    </span>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center mt-[100px] w-full">
            <div class="w-full flex justify-between px-[200px] ">
                <span style="color:black !important">
                    增值电信业务经营许可证： 浙B2-20080101
                </span>
                <span style="color:black !important">
                    域名注册服务机构许可： 浙D3-20210002 京D3-20220015
                </span>
            </div>
            <!-- 占位 -->
            <div class="h-[20px]">
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

* {
    color: #f87171;
}

::-webkit-scrollbar {
    display: none;
}

</style>

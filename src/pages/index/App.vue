<script setup>
import { ref, onMounted } from 'vue'
import soltcom from '@/components/index/HelloWorld.vue'


// 生命周期钩子
onMounted(() => {

// 计算轮播图高度
CarouselHeight.value = elCarousel1.value.offsetHeight + 'px';
})


// 导航栏顶部
let activeIndex = ref('1')
function handleSelect(e) {
    console.log('handleSelect')
}

// 轮播图
const elCarousel1 = ref(null) //获取DOM元素
let CarouselHeight = ref('') //高度

// 歌曲部分
let MusicName = ref('') //歌曲名
</script>
<template>
    <div class="container absolute inset-0 bg-slate-50 overflow-y-auto grid grid-rows-[auto_repeat(2,1fr)]">
        <div class="">
            <el-menu :default-active="activeIndex" class="el-menu-demo flex justify-around" mode="horizontal"
                background-color="#020617" text-color="#ffffff" active-text-color="#67e8f9" @select="handleSelect"
                :unique-opened="true" menu-trigger="hover">
                <el-menu-item index="1">首页</el-menu-item>
                <el-sub-menu index="2">
                    <template #title>工作区</template>
                    <el-menu-item index="2-1">专辑发布</el-menu-item>
                    <el-menu-item index="2-2">专辑管理</el-menu-item>
                    <el-menu-item index="2-3">版权交易</el-menu-item>

                </el-sub-menu>
                <el-menu-item index="3">
                    <el-icon><i-ep-User /></el-icon>用户中心</el-menu-item>
                <el-menu-item index="4"><el-icon><i-ep-Promotion /></el-icon>VIP</el-menu-item>
                <el-menu-item index="5">
                    <el-icon color="red">
                        <i-ep-Download />
                    </el-icon>
                    客户端下载
                </el-menu-item>
                <el-menu-item index="6"><el-icon><i-ep-QuestionFilled /></el-icon>帮助中心</el-menu-item>
                <el-menu-item index="7"><el-icon><i-ep-ElementPlus /></el-icon>关于我们</el-menu-item>


            </el-menu>
        </div>
        <div class="w-full grid grid-cols-[1fr_2fr_1fr] grid-rows-[120px_1fr_2fr] ">
            <div class="w-full  col-start-2 col-end-3 row-span-1  grid place-items-center">
                <div class="bg-[white]  w-full   rounded-[20px] p-2 flex flex-row  items-center" style="font-family: ;">
                    <el-icon><i-ep-Search /></el-icon>
                    <el-input placeholder="歌曲名" class="input-with-select" :clearable="true" v-model="MusicName"  input-style="font-family:PingFang SC;color:">
                    </el-input>
                </div>
            </div>
            <div class="w-full   col-start-2 col-end-3  ">
                <div class="title flex flex-col ">
                    <h1 class="self-center font-serif text-[black] text-4xl">歌单推荐</h1>
                    <ul class="flex flex-row gap-[10px_20px]  justify-center font-sans m-[20px]">
                        <li>为你推荐</li>
                        <li>旅行</li>
                        <li>网络歌曲</li>
                        <li>官方歌单</li>
                        <li>情歌</li>
                        <li>经典</li>
                    </ul>
                </div>
            </div>
            <div class="col-span-3 " ref="elCarousel1">
                <el-carousel :height="CarouselHeight">
                    <el-carousel-item v-for="item1 in 3" :key="item1" class="grid grid-cols-[repeat(5,1fr)] gap-[0_20px] ">
                        <div class="  bg-[yellowgreen] w-full  h-full inline-block" v-for="item2 in 5" :key="item2">
                            <div class="w-full h-[70%] bg-white border-none ">
                                <img class=" " />
                            </div>
                            <p class="text-blue-600/100">{{ item2 }}</p>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-icon) {
    color: red !important;
}

:slotted(title) {
    color: red !important;
}

:deep(.el-carousel__arrow--left) {
    left: 0;
}


/* 轮播图右侧的切换图标,需要同时设置el-icon和svg */
:deep(.el-carousel__arrow>.el-icon) {
    color: #f87171 !important;
    width: 40px !important;
    height: 40px !important;

}

:deep(.el-carousel__arrow>.el-icon>svg) {
    width: 100em !important;
    height: 100em !important;

}

:deep(.el-input__wrapper) {
    box-shadow: none !important;
}

:deep(.el-carousel__arrow--right) {
    right: 0;
}

:deep(.el-carousel) {
    --el-carousel-arrow-font-size: 12px;
    --el-carousel-arrow-size: 36px;
    --el-carousel-arrow-background: transparent;
    --el-carousel-arrow-hover-background: transparent;
}

:deep(.el-carousel__item) {
    box-sizing: border-box;
    padding: 0 200px;
}

:deep(.el-carousel__button) {
    background-color: red;
    border-radius: 50% !important;
    width: 10px;
    height: 10px;
    transition: all 0s;
    opacity: 0.1;
    /*去除颜色变化动画*/
    /* 指示器的高度,以及是否为圆点的控制 */

    /* opacity: 0.7; */
    /* 指示器没有选中的时候应用的透明度 */
}

:deep(.el-carousel__indicators>.is-active) {
    opacity: 1;
}

:deep(.el-carousel__indicators) {
    margin: 30px 0;
    position: relative;
    text-align: center;
}

:root {
    --main-color: #ff0000;
}
</style>

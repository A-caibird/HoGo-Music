<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 生命周期钩子
onMounted(() => {
    // 计算轮播图高度
    CarouselHeight.value = elCarousel1.value.offsetHeight + 'px';
})
// 跳转到不同歌单的音乐详情里面去
function goMusicList() {
    router.replace({ path: '/musicList' })
}
// 轮播图
const elCarousel1 = ref(null) //获取DOM元素
let CarouselHeight = ref('') //高度
//轮播图列表
let itemList = ref([[{
    imgPath: '/carousel/1.png',
    title: '古风前奏 | 曲悠悠入人心'
}, {
    imgPath: '/carousel/2.png',
    title: '抖音热歌：全网最火超好听的歌曲'
}, {
    imgPath: '/carousel/3.png',
    title: '抖音热歌：全网最火首首入心'
}, {
    imgPath: '/carousel/4.png',
    title: '0.8×降调情歌：emo慢放更显深刻'
}, {
    imgPath: '/carousel/5.png',
    title: '有故事的人，听了一定会落泪'
},],
[{
    imgPath: '/carousel/6.png',
    title: '舒压轻音：安静听风，将疲惫暂缓'
}, {
    imgPath: '/carousel/7.png',
    title: '韩流音乐节开SHOW！'
}, {
    imgPath: '/carousel/8.png',
    title: '抖音热播单曲收录（持续更新）'
}, {
    imgPath: '/carousel/9.png',
    title: '全网超好听抖音情歌（持续更新）'
}, {
    imgPath: '/carousel/10.png',
    title: '周深 · 治愈人心的天籁歌手'
},],
[{
    imgPath: '/carousel/11.png',
    title: '抖音劲爆中文DJ（持续更新）'
}, {
    imgPath: '/carousel/12.png',
    title: '英文治愈良方：愿日子清透且干净'
}, {
    imgPath: '/carousel/13.png',
    title: '驾车良曲：耳机里的是专属温柔'
}, {
    imgPath: '/carousel/14.png',
    title: '深情烟嗓：开口即是沧桑泪'
}, {
    imgPath: '/carousel/15.png',
    title: '伯远 · 热血难凉的追梦少年'
},]])
// 歌曲部分
let MusicName = ref('') //歌曲名



</script>
<template>
    <!-- 这里设置为repeat(1,1fr)可以添加歌曲列表什么的 -->
    <div class="grid grid-rows-[repeat(1,1fr)]">
        <div class="w-full grid grid-cols-[1fr_2fr_1fr] grid-rows-[120px_1fr_2fr] ">
            <div class="w-full  col-start-2 col-end-3 row-span-1  grid place-items-center">
                <div class="bg-[white]  w-full   rounded-[20px] p-2 flex flex-row  items-center" style="font-family: ;">
                    <el-icon><i-ep-Search /></el-icon>
                    <el-input placeholder="歌曲名" class="input-with-select" :clearable="true" v-model="MusicName"
                        input-style="font-family:PingFang SC;color:">
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
                    <el-carousel-item v-for="(item1, index) in itemList" :key="index"
                        class="grid grid-cols-[repeat(5,1fr)] gap-[0_20px] ">
                        <div class="w-full  h-full inline-block" v-for="(item2, index) in item1" :key="index"
                            @click="goMusicList">
                            <div class="w-full h-[70%] bg-white border-none overflow-hidden">
                                <img class="w-full h-full transition ease-in-out delay-200 hover:scale-[1.2]"
                                    :src="item2.imgPath" alt="a" />
                            </div>
                            <p class="text-blue-600/50  hover:text-green-300 mt-[20px]">{{ item2.title }}</p>
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
</style>

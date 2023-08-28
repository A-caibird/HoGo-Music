<script setup>
import { ref, onMounted } from 'vue'
import navBar from '@/components/nav.vue'
import indexPage from '@/components/index/index.vue'
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
    <div class="container absolute inset-0 bg-slate-50 overflow-y-auto ">
        <nav-bar></nav-bar>
        <index-page></index-page>
    </div>
</template>
<style scoped>
</style>

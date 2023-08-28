<script setup>
import { ref } from 'vue'
let activeIndex = ref('1')
function handleSelect(e) {
    console.log('handleSelect')
}
</script>

<template>
    <div class="nav">
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
</template>

<style scoped>
:deep(.el-icon) {
    color: red !important;
}
</style>

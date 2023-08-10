<script setup>
import { ref } from 'vue'

</script>
<template>
    <div style="width:400px;height:200px;margin:200px auto;">
        <div style="font-size: 20px">
            <!-- 由于SVG图标默认不携带任何属性 -->
            <!-- 你需要直接提供它们 -->
            <i-ep-Edit style="width: 1em; height: 1em; margin-right: 8px" />
            <i-ep-Share style="width: 1em; height: 1em; margin-right: 8px" />
            <i-ep-Delete style="width: 1em; height: 1em; margin-right: 8px" />
            <i-ep-Search style="width: 1em; height: 1em; margin-right: 8px" />
        </div>
    </div>
</template>
<style></style>

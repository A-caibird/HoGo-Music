<script setup>
import { ref } from 'vue'

defineProps({
    msg: String,
})

const count = ref(0)
</script>

<template>
    <div style="background-color: red;">
        <p>div1</p>
        <slot name="slot1"></slot>
    </div>
    <div style="background-color: yellowgreen;">
        <p>div2</p>
        <slot name="slot2"></slot>
    </div>
</template>

<style scoped></style>

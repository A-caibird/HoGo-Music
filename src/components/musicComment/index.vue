<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getSongComment, getSongByName } from '/src/api/api.js';
const router = useRouter();
const route = useRoute();
const musicName = route.params.musicName;
const time = localStorage.musicTimeLength;
const singer = localStorage.singerName_album;
let yourComment = ref('');
let musicComment = ref([]);
onMounted(() => {
    getSongComment({
        params: {
            name: musicName
        }
    }).then((res) => {
        musicComment.value = res.data;
        console.log(musicComment.value);
    }).catch((err) => {
        console.log(err)
    })
});
</script>
<template>
    <div class="flex flex-col items-center font-sans">
        <div class="bg-red-100 w-[800px] min-h-[600px] mt-[20px] box-border p-[20px] rounded-lg">
            <!-- 歌曲详情 -->
            <div class="m-full h-[200px] bg-red-200 flex flex-row ">
                <span class="box-border p-[10px] w-[200px] h-[200px] bg-yellow-50 inline-block">
                    <img class=" w-full h-full" src="/album.png" />
                </span>
                <span class="box-border flex flex-col w-full p-[10px]">
                    <p class=" self-center">
                        {{ musicName }}
                    </p>
                    <div class="flex flex-row justify-between mt-[20px] mb-[10px]">
                        <p>
                            歌手/专辑: {{ singer }}
                        </p>
                        <p>
                            歌曲时长: {{ time }}
                        </p>
                    </div>
                    <el-input v-model="yourComment" :rows="2" type="textarea" placeholder="留下评论,共探讨音乐的美好"
                        class="font-san" />
                </span>
            </div>
            <!-- 歌曲评论 -->
            <div class="mt-[20px] " v-for="(item, index) of musicComment" :key="index">
                <div class="">
                    <div class="relative">
                        <span class="text-yellow-900">
                            {{ item.userName }}
                        </span>
                        <span class="font-sans text-zinc-400 text-[12px]/[12px] absolute right-0">
                            {{ item.date }}
                        </span>
                    </div>
                    <div class="min-h-[20px] w-full  rounded-md py-[10px] text-gray-500 font-serif">
                        {{ item.commentContent }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/*  textarea 高度设置 */
:deep(.el-textarea) {
    height: 100% !important;
}

:deep(.el-textarea__inner) {
    height: 100% !important;
    color: black;
}

:deep(.el-textarea__inner::placeholder) {
    color: #cbd5e1;
    @apply text-slate-300;
}
</style>

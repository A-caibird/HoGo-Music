<script setup>
import {ref, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {getSongComment, commentSong} from '/api/api.js';
import {ElMessage} from 'element-plus';

const router = useRouter();
const route = useRoute();
console.log(document.getElementsByClassName("mt-[20px]").length)
// 获取路由参数
const musicName = route.params.musicName;

// 读取浏览器存储的歌曲信息
const time = localStorage.musicTimeLength;
const singer = localStorage.singerName_album;

// 我的评论
let yourComment = ref('');
let musicComment = ref([]);

// 新增我的评论
function handleComment() {
    if (yourComment.value.trim().length < 5) {
        ElMessage.warning('评论至少需要五个字符以上,请重新输入')
        return;
    }
    commentSong({
        musicName: musicName,
        comment: yourComment.value.trim(),
        userName: localStorage.name
    }).then(
        (res) => {
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
        }
    ).catch((err) => {
        console.log(err);
    })
}

// 页面加载,拿到歌曲评论列表
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
        <div class="w-[1000px] min-h-[600px] mt-[20px] box-border p-[20px] rounded-lg ">
            <!-- 歌曲详情 -->
            <div class="m-full h-[200px] bg-yellow-50 flex flex-row ">
                <span class="box-border p-[10px] w-[200px] h-[200px] bg-yellow-50 inline-block">
                    <img class=" w-full h-full" src="/comment.png"/>
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
                    <el-input v-model="yourComment" :rows="2" type="textarea"
                              placeholder="留下评论,共探讨音乐的美好!      注意:shift+enter换行,enter评论!" class="font-san"
                              @keydown.enter="handleComment"/>
                </span>
            </div>
            <!-- 歌曲评论 -->
            <div class="bg-[#A0F6D2] p-4 overflow-auto h-[600px] panel">
                <div class="mt-[20px] border-b-2 border-[#72DFD0]" v-for="(item,index) of musicComment" :key="index">
                    <div class="">
                        <div class="relative">
                            <span class="text-yellow-900">
                                用户名:{{ musicComment[musicComment.length - index - 1].userName }}
                            </span>
                            <span class="font-sans  text-[12px]/[12px] absolute right-0">
                                评论时间: {{ musicComment[musicComment.length - index - 1].date }}
                            </span>
                        </div>
                        <div class="min-h-[20px] w-full  rounded-md py-[10px]  font-serif">
                            {{ musicComment[musicComment.length - index - 1].commentContent }}
                        </div>
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

.panel {
    background-image: linear-gradient(25deg, #026a92, #6588ac, #a3a7c7, #dec6e2);
    background-image: linear-gradient(25deg, #ed4c79, #ea8c66, #e1c04c, #d0ef13);
    background-image: linear-gradient(25deg, #149cc9, #7daaa3, #aab87a, #cbc849)
}


</style>

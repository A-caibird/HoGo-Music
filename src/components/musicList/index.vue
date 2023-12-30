<script setup>
import { onMounted, ref, computed, onUnmounted, h, render } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getSongList, getVipInfo } from '/src/api/api.js';
import { ElMessage, ElNotification } from 'element-plus';
import $ from 'jquery';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const isVip = ref(false)

// 音乐播放状态管理
let playState = ref(false);
let playIndex = ref(-1);

// 音乐对象
let audio = ref(null);

// 新建音乐对象
function newMusic(path, index) {
    let url = "http://localhost:8080/music/" + path;
    audio.value = new Audio(url);
    audio.value.play();
    playState.value = true;
    playIndex.value = index;

    // 处理播放结束后的让播放状态修改为
    audio.value.addEventListener('ended', () => {
        console.log('音频播放结束');
        playState.value = false;
    });
    return;
}


function playMusic(path, index, state) {
    if (state == 'stop') {
        audio.value.pause();
        playState.value = false;
    }
    else {
        if (index != playIndex.value) {
            if (playIndex.value == -1) {
                newMusic(path, index);
            }
            audio.value.pause();
            playState.value = false;
            playIndex.value = index;
        }
        newMusic(path, index);
    }
}


// 搜索框歌曲名
let musicName = ref('');

// 网页上显示的表格数据
let displayTable = computed(() => {
    if (musicName.value == '') {
        return songList.value;
    }
    else {
        return songList.value.filter(function (item, index) {
            if (item.musicName.includes(musicName.value)) {
                return item;
            }
        });
    }
})

// 跳转到音乐详情页面
function goToMusicHome(name, time, singer) {
    localStorage.setItem('musicName', name);
    localStorage.setItem('musicTimeLength', time);
    localStorage.setItem('singerName_album', singer);
    let pathUrl = '/songHome/' + name;
    router.push({
        path: pathUrl,
    });
}
function downloadMusic(path, index) {
    let url = "http://localhost:8080/music/" + path;
    if (!isVip.value) {
        ElNotification.warning({
            title: '提醒',
            message: '音乐下载为会员专享特权!',
            offset: 100,
        })
    } else {
    }
}
// 网页加载拿到数据库的音乐列表
const songList = ref([]);
onMounted(() => {
    getSongList().then((res) => {
        songList.value = res.data;
    });
    if (typeof route.params.musicName != 'undefined') {
        musicName.value = route.params.musicName;
    }

    getVipInfo({
        username: localStorage.getItem('name')
    }).then(res => {
        isVip.value = res.data.vipStatus;
    }).catch(e => {
        console.error(e)
        console.log("获取vip状态错误")
    })
});
onUnmounted(() => {
    if (playState.value) {
        audio.value.pause();
    }
})
</script>
<template>
    <div class="container flex flex-col items-center w-full font-sans">
        <!-- 搜索框 -->
        <div class="bg-[white]  w-[1050px]   mt-[40px] rounded-[20px] p-2 flex flex-row  items-center"
            style="font-family:inherit;">
            <el-icon><i-ep-Search /></el-icon>
            <el-input placeholder="歌曲名" class="input-with-select" :clearable="true" v-model="musicName"
                input-style="font-family:PingFang SC;color:">
            </el-input>
        </div>
        <!-- 音乐部分 -->
        <div class="mt-[20px] " ref="musicList">
            <!-- 歌曲头部 -->
            <div class="flex flex-row bg-[#a5f3fc] px-[25px] py-[10px]">
                <div class=" w-[560px]">歌曲名</div>
                <div class=" w-[280px]">专辑/歌手</div>
                <div class=" w-[160px] flex flex-row justify-end">
                    时长
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="flex flex-row px-[25px] py-[10px] bg-[#ecfeff] group" v-for="(item, index) of displayTable"
                :key="index" :class="{ 'drop-shadow-lg': (playState == true) && playIndex == index }">
                <div class=" w-[560px]">{{ item.musicName }}</div>
                <div class=" w-[280px]">{{ item.singerName_album }}</div>
                <div class=" w-[160px] flex flex-row justify-end items-center">
                    <span class="relative top-[3px] invisible group-hover:visible mr-[20px] flex gap-x-[5px]">
                        <template v-if="(playState == true) && playIndex == index">
                            <el-tooltip class="box-item" effect="dark" content="暂停播放" placement="top-start">
                                <span @click="playMusic(item.url, index, 'stop')" class="stop">
                                    <el-icon><i-ep-VideoPause /></el-icon>
                                </span>
                            </el-tooltip>
                        </template>
                        <template v-else>
                            <el-tooltip class="box-item" effect="dark" content="开始播放" placement="top-start">
                                <span @click="playMusic(item.url, index, 'play')">
                                    <el-icon>
                                        <i-ep-VideoPlay />
                                    </el-icon>
                                </span>
                            </el-tooltip>
                        </template>
                        <el-tooltip class="box-item" effect="dark" content="下载单曲" placement="top-start">
                            <span @click="downloadMusic(item.url, index)">
                                <el-icon>
                                    <i-ep-Download />
                                </el-icon>
                                <a v-bind:href="'http://localhost:8080/music/' + item.url" download class="hidden"
                                    v-bind:id="index">下载文件</a>
                            </span>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="收藏单曲" placement="top-start">
                            <span>
                                <el-icon>
                                    <i-ep-Star />
                                </el-icon>
                            </span>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="评论单曲" placement="top-start">
                            <span @click="goToMusicHome(item.musicName, item.timeLength, item.singerName_album)">
                                <el-icon>
                                    <i-ep-Comment />
                                </el-icon>
                            </span>
                        </el-tooltip>
                    </span>
                    <span>
                        {{ item.timeLength }}
                    </span>
                </div>
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

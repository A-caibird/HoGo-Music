<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getSongList } from '/src/api/api.js';
const router = useRouter();
const route = useRoute();

// 音乐播放状态管理
let playState = ref(false);
let playIndex = ref(-1);
let audio = ref(null);
function playMusic(path, index, state) {
    if (state == 'stop') {
        audio.value.pause();
        playState.value = false;
    }
    else {
        if (index != playIndex.value) {
            if (playIndex.value == -1) {
                audio.value = new Audio(path);
                audio.value.play();
                playState.value = true;
                playIndex.value = index;
                return;
            }
            audio.value.pause();
            playState.value = false;
            playIndex.value = index;
        }
        audio.value = new Audio(path);
        audio.value.play();
        playState.value = true;
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

// 拿到数据库的音乐列表
const songList = ref([]);
onMounted(() => {
    getSongList().then((res) => {
        songList.value = res.data;
        // console.log(res);
    });
    if (typeof route.params.musicName != 'undefined') {
        musicName.value = route.params.musicName;
    }
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
            style="font-family: ;">
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
                :key="index">
                <div class=" w-[560px]">{{ item.musicName }}</div>
                <div class=" w-[280px]">{{ item.singerName_album }}</div>
                <div class=" w-[160px] flex flex-row justify-end items-center">
                    <span class="relative top-[3px] invisible group-hover:visible mr-[20px] flex gap-x-[5px]">
                        <template v-if="(playState == true) && playIndex == index">
                            <span @click="playMusic(item.url, index, 'stop')" class="stop">
                                <el-icon><i-ep-VideoPause /></el-icon>
                            </span>
                        </template>
                        <template v-else>
                            <span @click="playMusic(item.url, index, 'play')">
                                <el-icon>
                                    <i-ep-VideoPlay />
                                </el-icon>
                            </span>
                        </template>

                        <span>
                            <el-icon>
                                <i-ep-Download />
                            </el-icon>
                        </span>
                        <span>
                            <el-icon>
                                <i-ep-Share />
                            </el-icon>
                        </span>
                        <span @click="goToMusicHome(item.musicName, item.timeLength, item.singerName_album)">
                            <el-icon>
                                <i-ep-Comment />
                            </el-icon>
                        </span>
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

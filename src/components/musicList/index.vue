<script setup>
import {onMounted, ref, computed, onUnmounted} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {getSongList, getVipInfo} from '/src/api/api.js';
import {ElMessage, ElNotification} from 'element-plus';
import $ from 'jquery';
import {randInt} from "three/src/math/MathUtils.js";

const router = useRouter();
const route = useRoute();
const isVip = ref(false)

// 音乐播放状态管理
let playState = ref(false);
let playIndex = ref(-1);

// 音乐对象
let audio = ref(null);

// 音乐控件
/**
 * Audio Dom:播放音乐的dom
 * @type {HTMLAudioElement}
 */
let audioTag = null
/**
 * 歌曲进度条背景
 * @type {null|Element}
 */
let progressBar = null
/**
 * 歌曲进度条
 * @type {null|Element}
 */
let progressBarFill = null

/**
 * 歌曲播放进度
 * @type {number}
 */
let duration = 0


/**
 * 创建音乐对象
 * @constructor
 * @param {string} path - audio src
 * @param {number} index - 列表位置
 * @return isVoid  - 为空
 */
function newMusic(path, index) {
    let url = "http://localhost:8080/music/" + path;
    $(audioTag).attr('src', url)
    audioTag.play()

    playState.value = true;
    playIndex.value = index;

    $(audioTag).on('ended', () => {
        console.log('音频播放结束');
        playState.value = false;
    })
}

/**
 * 列表按钮点击播放
 * @param path - audio url
 * @param index - item在列表的位置
 * @param state - 暂停|播放
 * @return isVoid
 */
function playMusic(path, index, state) {
    if (state === 'stop') {
        audioTag.pause();
        playState.value = false;
    } else {
        if (index !== playIndex.value) {
            if (playIndex.value === -1) {
                newMusic(path, index);
            }

            playState.value = false;
            playIndex.value = index;
        }
        newMusic(path, index);
    }
}


/**
 * 搜索框歌曲名
 * @type {Ref<UnwrapRef<string>>}
 */
let musicName = ref('');

/**
 * 网页上显示的表格数据
 * @type {ComputedRef<Array<{ name: string, price_now: number, price_origin: number }>>}
 */
let displayTable = computed(() => {
    if (musicName.value === '') {
        return songList.value;
    } else {
        return songList.value.filter(function (item, index) {
            if (item.musicName.includes(musicName.value)) {
                return item;
            }
        });
    }
})

/**
 * 跳转到音乐详情页面
 * @param name{string}
 * @param time{string}
 * @param singer{string}
 */
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
    }
}

/**
 * 歌曲列表
 * @type {Ref<UnwrapRef<Array<{ name: string, price_now: number, price_origin: number }>>>}
 */
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

onMounted(function () {
    $(document).ready(function () {
        audioTag = $('#audioPlayer')[0];
        // console.log(audioTag,$(audioTag))
        progressBar = $('#progressBar');
        progressBarFill = $(progressBar).find('.progress-bar-fill');

        duration = 0;

        // 进度条初始状态
        $(progressBarFill).width(0)

        // 音频加载完成时获取音频时长
        $(audioTag).on('loadedmetadata', function () {
            duration = audioTag.duration;
        });

        // 更新进度条位置
        $(audioTag).on('timeupdate', function () {
            let progress = (audioTag.currentTime / duration);
            $(progressBarFill).width(173 * progress)
        });

        // 播放完,进度条设置为0
        $(audioTag).on('ended', function () {
            $(progressBarFill).width(0)
        });

        // 点击进度条跳转到相应位置
        progressBar.on('click', function (event) {
            let progressWidth = progressBar.width();
            let clickX = event.offsetX;
            let seekTime = (clickX / progressWidth) * duration;
            audioTag.currentTime = seekTime;
        });

        // 播放按钮点击事件
        $('#playBtn').on('click', function () {
            audioTag.play();
            playState.value = true;
        });

        // 暂停按钮点击事件
        $('#pauseBtn').on('click', function () {
            audioTag.pause();
            playState.value = false;
        });

        // 停止按钮点击事件
        $('#stopBtn').on('click', function () {
            audioTag.pause();
            audio.currentTime = 0;
        });

        // 随机播放
        $('#randomBtn').on('click', function () {
            let num = randInt(0, songList.value.length - 1)
            let url = "http://localhost:8080/music/" + songList.value[num].url;
            $(audioTag).attr('src', url)
            audioTag.play()
            playState.value = true
            playIndex.value = num

        })
        // 下一首
        $('#nextBtn').on('click', function () {
            if (playIndex.value === -1) {
                playIndex.value = 0;
            }
            let num = (playIndex.value + 1) % songList.value.length;
            let url = "http://localhost:8080/music/" + songList.value[num].url;
            $(audioTag).attr('src', url)
            audioTag.play()
            playState.value = true
            playIndex.value = num

        })
        $('#prevBtn').on('click', function () {
            if (playIndex.value <= 0) {
                playIndex.value = songList.value.length;
            }
            let num = (playIndex.value - 1) % songList.value.length;
            let url = "http://localhost:8080/music/" + songList.value[num].url;
            $(audioTag).attr('src', url)
            audioTag.play()
            playState.value = true
            playIndex.value = num
        })
    });

})
onUnmounted(() => {
    if (playState.value) {
        audioTag.pause();
    }
})
</script>
<template>
    <div>
        <div class="container flex flex-col items-center w-full font-sans relative">
            <!-- 搜索框 -->
            <div class="bg-[white]  w-[1050px]   mt-[40px] rounded-[20px] p-2 flex flex-row  items-center"
                 style="font-family:inherit;">
                <el-icon>
                    <i-ep-Search/>
                </el-icon>
                <el-input placeholder="歌曲名" class="input-with-select" :clearable="true" v-model="musicName"
                          input-style="font-family:PingFang SC;color:">
                </el-input>
            </div>
            <!-- 音乐部分 -->
            <div class="mt-[20px]  bg-[#ecfeff]" ref="musicList" id="tou">
                <!-- 歌曲头部 -->
                <div class="flex flex-row bg-[#a5f3fc] px-[25px] py-[10px]">
                    <div class=" w-[560px]">歌曲名</div>
                    <div class=" w-[280px]">专辑/歌手</div>
                    <div class=" w-[160px] flex flex-row justify-end">
                        时长
                    </div>
                </div>
                <div class=" h-[540px] overflow-auto relative">
                    <div class="flex flex-row px-[25px] py-[10px] group  ease-linear duration-[800ms]" v-for="(item, index) of displayTable"
                         :key="index"
                         :class="{ 'playing': (playState === true) && playIndex === index}" :id="'music'+index">
                        <div class=" w-[560px]">{{ item.musicName }}</div>
                        <div class=" w-[280px]">{{ item.singerName_album }}</div>
                        <div class=" w-[160px] flex flex-row justify-end items-center">
                    <span class="relative top-[3px] invisible group-hover:visible mr-[20px] flex gap-x-[5px]">
                        <template v-if="(playState === true) && playIndex === index">
                            <el-tooltip class="box-item" effect="dark" content="暂停播放" placement="top-start">
                                <span @click="playMusic(item.url, index, 'stop')" class="stop">
                                    <el-icon><i-ep-VideoPause/></el-icon>
                                </span>
                            </el-tooltip>
                        </template>
                        <template v-else>
                            <el-tooltip class="box-item" effect="dark" content="开始播放" placement="top-start">
                                <span @click="playMusic(item.url, index, 'play')">
                                    <el-icon>
                                        <i-ep-VideoPlay/>
                                    </el-icon>
                                </span>
                            </el-tooltip>
                        </template>
                        <el-tooltip class="box-item" effect="dark" content="下载单曲" placement="top-start">
                            <span @click="downloadMusic(item.url, index)">
                                <el-icon>
                                    <i-ep-Download/>
                                </el-icon>
                                <a v-bind:href="'http://localhost:8080/music/' + item.url" download class="hidden"
                                   v-bind:id="index">下载文件</a>
                            </span>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="收藏单曲" placement="top-start">
                            <span>
                                <el-icon>
                                    <i-ep-Star/>
                                </el-icon>
                            </span>
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="评论单曲" placement="top-start">
                            <span @click="goToMusicHome(item.musicName, item.timeLength, item.singerName_album)">
                                <el-icon>
                                    <i-ep-Comment/>
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
        </div>
        <div class="bg-amber-200 absolute w-[200px] h-[60px] left-0 top-[400px] rounded-r-full py-[10px]">
            <audio id="audioPlayer" src="http://localhost:8080/music/1.mp3" class="hidden"></audio>
            <div class="progress pl-[7px] pr-[20px]">
                <div id="progressBar" class="progress-bar rounded-full">
                    <div class="progress-bar-fill rounded-full"></div>
                </div>
            </div>
            <div class="controls  flex flex-row justify-between pl-[7px] pr-[20px]">
                <button id="prevBtn" class="btn btn-primary"><i class="fas fa-step-backward"></i></button>
                <button id="randomBtn" class="btn btn-primary"><i class="fas fa-random"></i></button>
                <button id="playBtn" class="btn btn-primary"><i class="fas fa-play"></i></button>
                <button id="pauseBtn" class="btn btn-primary"><i class="fas fa-pause"></i></button>
                <button id="nextBtn" class="btn btn-primary"><i class="fas fa-step-forward"></i></button>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.el-icon) {
    color: #64748b !important;
}

.stop > :deep(.el-icon) {
    //color: red !important;
}

:deep(.el-input__wrapper) {
    box-shadow: none !important;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    @apply bg-[#a5f3fc];
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background: #60a5fa;
}

::-webkit-scrollbar-thumb:window-inactive {
    @apply bg-cyan-700;
}

.progress-bar {
    cursor: pointer;
    height: 10px;
    background-color: #ccc;
}

.progress-bar-fill {
    height: 100%;
    background-color: #007bff;
}

@keyframes colorAnimation {
    0% {
        background: linear-gradient(50deg, #e66465, #9198e5);
    }
    15% {
        background: linear-gradient(75deg, #e66465, #9198e5);
    }
    25% {
        background: linear-gradient(90deg, #e66465, #9198e5);
    }
    40% {
        background: linear-gradient(105deg, #e66465, #9198e5);
    }
    50% {
        background: linear-gradient(120deg, #e66465, #9198e5);
    }
    60% {
        background: linear-gradient(138deg, #e66465, #9198e5);
    }
    75% {
        background: linear-gradient(150deg, #e66465, #9198e5);
    }
    90% {
        background: linear-gradient(167deg, #e66465, #9198e5);
    }
    100% {
        background: linear-gradient(180deg, #e66465, #9198e5);
    }
}

.playing {
    @apply drop-shadow-lg;
    @apply rounded-xl;
    animation-name: colorAnimation;
    animation-duration: 4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    transition: all 4s linear;
}


#tou {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    min-height: 10px;
    background-color: #e493d0;
    background-image: radial-gradient(closest-side, rgba(235, 105, 78, 1), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
    background-size: 130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
    background-position: -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
    background-repeat: no-repeat;
    animation: 10s movement linear infinite;
}

#tou::after {
    content: '';
    display: block;
    position: fixed;
    //width: 100%;
    //height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}


@keyframes movement {
    0%, 100% {
        background-size: 130vmax 130vmax,
        80vmax 80vmax,
        90vmax 90vmax,
        110vmax 110vmax,
        90vmax 90vmax;
        background-position: -80vmax -80vmax,
        60vmax -30vmax,
        10vmax 10vmax,
        -30vmax -10vmax,
        50vmax 50vmax;
    }
    25% {
        background-size: 100vmax 100vmax,
        90vmax 90vmax,
        100vmax 100vmax,
        90vmax 90vmax,
        60vmax 60vmax;
        background-position: -60vmax -90vmax,
        50vmax -40vmax,
        0vmax -20vmax,
        -40vmax -20vmax,
        40vmax 60vmax;
    }
    50% {
        background-size: 80vmax 80vmax,
        110vmax 110vmax,
        80vmax 80vmax,
        60vmax 60vmax,
        80vmax 80vmax;
        background-position: -50vmax -70vmax,
        40vmax -30vmax,
        10vmax 0vmax,
        20vmax 10vmax,
        30vmax 70vmax;
    }
    75% {
        background-size: 90vmax 90vmax,
        90vmax 90vmax,
        100vmax 100vmax,
        90vmax 90vmax,
        70vmax 70vmax;
        background-position: -50vmax -40vmax,
        50vmax -30vmax,
        20vmax 0vmax,
        -10vmax 10vmax,
        40vmax 60vmax;
    }
}
</style>

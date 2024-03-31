<script setup>
import {ref, onMounted, defineComponent} from 'vue';
import {modifyMusic} from '@/api/api.js'
import {musicDiago} from "@/pinia/store.js";
import $ from 'jquery'

let modifyMusicName = ref("");
let modifyAlbumName = ref("");
let modifyLength = ref("");

function openCall() {
    modifyMusicName.value = localStorage.getItem('modifyMusicName')
    modifyAlbumName.value = localStorage.getItem('modifyAlbumName')
    modifyLength.value = localStorage.getItem('modifyLength')
}


let dis = musicDiago()

// 提交专辑信息
function submitForm() {
    if (modifyAlbumName.value.trim() === '' || modifyMusicName.value.trim() === '' || modifyLength.value.trim() === '') {
        ElMessage({
            message: '请完善歌曲信息!',
            type: 'waring',
        })
        return;
    }
    modifyMusic({
        oldName: localStorage.getItem('modifyMusicName'),
        newName: modifyMusicName.value,
        singer: modifyAlbumName.value,
        time: modifyLength.value,
    }).then(res => {
        ElMessage({
            message: '歌曲修改成功!',
            type: 'success',
        })
        // window.location.reload();
    }).catch(err => {
        console.error('歌曲修改失败' + err)
        ElMessage({
            message: '服务器错误,歌曲信息修改失败,请稍后再试~',
            type: 'error',
        })
    })
    dis.close();
}
</script>
<template>
    <div>
        <el-dialog v-model="dis.dis" :show-close="false" @open="openCall">
            <!-- 右边 -->
            <div class="col-span-1 p-[20px] box-border flex flex-col  bg-[#a5f3fc]">
                <div class="w-full text-center mb-[60px]">
                    <span class="text-[20px] ">专辑单曲修改</span>
                </div>
                <div class="justify-center flex flex-col">
                    <div class="flex items-center">
                        <div class="w-[100px] whitespace-nowrap">
                            歌曲名
                        </div>
                        <el-input v-model="modifyMusicName" placeholder="歌曲名"/>
                    </div>
                    <div class="flex items-center mt-[20px]">
                        <div class="w-[100px] whitespace-nowrap">歌手/专辑名</div>
                        <el-input v-model="modifyAlbumName" placeholder="歌曲名"/>
                    </div>
                    <div class="flex items-center mt-[20px]">
                        <div class="w-[100px] whitespace-nowrap"> 时长</div>
                        <el-input v-model="modifyLength" placeholder="如3:42"/>
                    </div>
                </div>
                <div class=" flex flex-col items-center justify-center box-border  h-full mt-[30px]">
                    <div class="inline-block rounded-2xl bg-slate-300 px-[100px] py-[5px] hover:bg-blue-300"
                         @click="submitForm">
                        完成
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped></style>

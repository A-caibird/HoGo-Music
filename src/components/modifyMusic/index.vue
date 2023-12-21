<script setup>
import { ref } from 'vue';
import { modifyMusic } from '/src/api/api.js'
let modifyMusicName = ref(localStorage.getItem('modifyMusicName'));
let modifyAlbumName = ref(localStorage.getItem('modifyAlbumName'));
let modifyLength = ref(localStorage.getItem('modifyLength'));
// 提交专辑信息
function submitForm() {
    if (modifyAlbumName.value.trim() == '' || modifyMusicName.value.trim() == '' || modifyLength.value.trim() == '') {
        alert('请完善歌曲信息!')
        return;
    }
    modifyMusic({
        musicOriginName: localStorage.getItem('modifyMusicName'),
        musicNewName: modifyMusicName.value,
        newSingerName_album: modifyAlbumName.value,
        newTimeLength: modifyLength.value,
    }).then(res => {
        alert('歌曲修改成功')
        console.log(res);
    }).catch(err => {
        console.error('歌曲修改失败' + err);
    })
}
</script>
<template>
    <div class="flex flex-col items-center ">
        <div class="grid grid-cols-[400px_800px] h-[500px] bg-[#a5f3fc] mt-[20px]">
            <!-- 左边 -->
            <div class="col-span-1  p-[20px]">
                <div class="w-full h-full">
                    <img class="w-full h-full" src="/album.jpg" />
                </div>
            </div>
            <!-- 右边 -->
            <div class="col-span-1 p-[20px] box-border h-full flex flex-col">
                <div class="w-full text-center mb-[60px]">
                    <span class="text-[20px] ">专辑单曲修改</span>
                </div>
                <div class="justify-center flex flex-col">
                    <div class="flex items-center">
                        <div class="w-[100px] whitespace-nowrap">
                            歌曲名</div>
                        <el-input v-model="modifyMusicName" placeholder="歌曲名" />
                    </div>
                    <div class="flex items-center mt-[20px]">
                        <div class="w-[100px] whitespace-nowrap">歌手/专辑名</div>
                        <el-input v-model="modifyAlbumName" placeholder="歌曲名" />
                    </div>
                    <div class="flex items-center mt-[20px]">
                        <div class="w-[100px] whitespace-nowrap"> 时长</div>
                        <el-input v-model="modifyLength" placeholder="如3:42" />
                    </div>
                </div>
                <div class=" flex flex-col items-center justify-center box-border  h-full">
                    <div class="inline-block rounded-2xl bg-slate-300 px-[100px] py-[5px] hover:bg-blue-300"
                        @click="submitForm">
                        完成
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

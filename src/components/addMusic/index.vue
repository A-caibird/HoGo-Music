<script setup>
import { ref } from 'vue';
import { uploadMusicFile } from '/src/api/api.js'
let modifyMusicName = ref('');
let modifyAlbumName = ref('');
let modifyLength = ref('');
let musicFileName = ref('请点击左侧按钮选择音频文件');
let fileInput = ref(null);  // 文件选择,根据 HTML 规范，默认情况下，<input type="file"> 标签允许选择一个文件。这是因为 type="file" 的输入字段被设计为单个文件选择器。
let fileForm = ref(null);  // 文件表单
// 点击选择文件
function handleSelectFile() {
    fileInput.value.click();
}

// 显示选择的文件列表
function getFile() {
    musicFileName.value = fileInput.value.files[0].name
}
// 提交专辑信息
function submitForm() {
    // 上传mp3文件
    const formData = new FormData();
    formData.append('mp3', fileInput.value.files[0]);
    uploadMusicFile(formData).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    })
}
</script>
<template>
    <div class="flex flex-col items-center ">
        <div class="grid grid-cols-[400px_800px] h-[500px] bg-[#a5f3fc]">
            <!-- 左边 -->
            <div class="col-span-1  p-[20px]">
                <div class="w-full h-full">
                    <img class="w-full h-full" src="/album.png" />
                </div>
            </div>
            <!-- 右边 -->
            <div class="col-span-1 p-[20px] box-border h-full flex flex-col">
                <div class="w-full text-center mb-[60px]">
                    <span>歌曲添加</span>
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
                    <div class="mt-[20px]">
                        <span @click="handleSelectFile" class="inline-block w-[90px]">
                            音频文件
                        </span>
                        <input ref="fileInput" type="file" accept=".mp3" name="mp3" class="hidden" @change="getFile" />
                        <span class="" :class="{ 'text-[red]': musicFileName == '请点击左侧按钮选择音频文件' }">{{ musicFileName
                        }}</span>
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

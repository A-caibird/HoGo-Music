<script setup>
import { ref } from 'vue';
import { uploadMusicFile, addMusic } from '/src/api/api.js'
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
    if (fileInput.value.files.length == 0) {
        alert('请选择音乐文件!');
        return;
    }
    if (modifyAlbumName.value.trim() == '' || modifyMusicName.value.trim() == '' || modifyLength.value.trim() == '') {
        alert('请完善歌曲信息!')
        return;
    }

    // 使用了立即执行函数（IIFE）的形式
    (async () => {
        try {
            const formData = new FormData();
            formData.append('mp3', fileInput.value.files[0]);
            const res = await uploadMusicFile(formData);   // 上传mp3文件
            // 拿到歌曲名称,指定路径
            const url = `${res.data}`;
            console.log(url)
            addMusic({
                musicName: modifyMusicName.value,
                singerName_album: modifyAlbumName.value,
                timeLength: modifyLength.value,
                url
            }).then(res => {
                alert('歌曲添加成功')
                console.log(res);
            }).catch(err => {
                console.error('歌曲添加失败' + err);
            })
        }
        catch (err) {
            console.error(err);
        }
    })();
}

// 等待请求完成以后才处理
</script>
<template>
    <div class="flex flex-col items-center ">
        <div class="grid grid-cols-[400px_800px] h-[600px] bg-[#FCBCB8] mt-[40px]">
            <!-- 左边 -->
            <div class="col-span-1  p-[20px]">
                <div class="w-full h-full">
                    <img class="w-full h-full" src="/album.jpg" />

                </div>
            </div>
            <!-- 右边 -->
            <div class="col-span-1 p-[20px] box-border h-full flex flex-col">
                <div class="w-full text-center mb-[60px]">
                    <span class="text-[20px] ">新增专辑单曲</span>
                </div>
                <div class="justify-center flex flex-col">
                    <div class="flex items-center">
                        <div class="w-[100px] whitespace-nowrap text-[#D5554C]">
                            歌曲名</div>
                        <el-input v-model="modifyMusicName" placeholder="歌曲名" />
                    </div>
                    <div class="flex items-center mt-[20px]">
                        <div class="w-[100px] whitespace-nowrap text-[#D5554C]">歌手/专辑名</div>
                        <el-input v-model="modifyAlbumName" placeholder="歌曲名" />
                    </div>
                    <div class="flex items-center mt-[20px]">
                        <div class="w-[100px] whitespace-nowrap text-[#D5554C]"> 时长</div>
                        <el-input v-model="modifyLength" placeholder="如3:42" />
                    </div>
                    <div class="mt-[20px]">
                        <span @click="handleSelectFile" class="inline-block w-[90px] text-[#D5554C]">
                            音频文件
                        </span>
                        <input ref="fileInput" type="file" accept=".mp3" name="mp3" class="hidden" @change="getFile" />
                        <span class="font-serif text-[12px]" :class="{ 'text-[#ef4444]': musicFileName == '请点击左侧按钮选择音频文件' }">{{ musicFileName
                        }}</span>
                    </div>
                </div>
                <div class=" flex flex-col items-center justify-center box-border  h-full">
                    <div class="inline-block rounded-2xl bg-slate-300 px-[100px] py-[5px] hover:bg-blue-300 text-red-400"
                        @click="submitForm">
                        完成
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>

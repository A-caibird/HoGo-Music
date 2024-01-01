<script setup>
import {ref, onMounted} from 'vue'
import $ from 'jquery'
import {getVipInfo} from "@/api/api.js";


// 设置全局的请求配置
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});

const isVip = ref(false)

const form = ref({
    name: '',
    email: '',
    password: ''
})

let username = localStorage.getItem('name')

const avatar = ref('/avatar/default.jpg')

onMounted(function () {
    getVipInfo({
        username
    }).then(res => {
        isVip.value = res.data.vipStatus;
    }).catch(e => {
        console.error(e)
        console.log("获取vip状态错误")
    })
    $.ajax({
        url: 'http://localhost:8080/getAvatarUrl',
        type: 'GET',
        data: {
            name: username // Replace 'John' with the actual name you want to query
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            avatar.value = "http://localhost:8080/avatar/" + response
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            // Handle the error here
        }
    });
})


onMounted(function () {
    // 更换头像的css样式改变
    $(function () {
            let btn = $('.image-box').find('span')
            btn.css('display', 'none')
            $('.image-box')
                .hover(function () {
                    btn.css('display', 'inline-block')
                }, function () {
                    btn.css('display', 'none')
                })
        }
    )

    // 上传头像文件图片
    $(function () {
        let btn = $('.image-box').find('span').get(0);
        $(btn).on('click', function () {
            let inputFile = $('<input type="file">').get(0);
            $(inputFile).on('change', function (e) {
                let file = e.target.files[0];
                const formData = new FormData();
                formData.append('avatar', file)
                formData.append('name', localStorage.getItem('name'));


                // 发起POST请求
                $.ajax({
                    url: 'http://localhost:8080/uploadAvatar',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        // 请求成功的处理逻辑
                        console.log('上传成功', response);
                        avatar.value = response
                    },
                    error: function (xhr, status, error) {
                        // 请求失败的处理逻辑
                        console.log('上传失败', error);
                    }
                });

                // for (let i = 0; i < files.length; i++) {
                //     console.log(files[i].name);
                // }
            })
            $(inputFile).trigger('click');
        })
    })
})
</script>
<template>
    <div class="container flex justify-center  pt-[40px] box-border font-sans">
        <div class="grid grid-cols-[240px_auto] w-[800px] h-[670px] border-2 border-[rgba(0,169,255,0.1)]">
            <div class="left bg-[rgba(0,169,255,0.1)] col-span-1  box-border flex flex-col items-center pt-[40px]">
                <div class="image-box overlay">
                    <img :src="avatar" class="w-full h-full rounded-full backdrop-blur-xl" alt="失效"/>
                    <span
                        class="btn absolute  bg-amber-50 left-1/2 top-1/2 translate-x-[-50%] -translate-y-[50%] rounded-full z-10 p-[10px] text-nowrap "
                        @click="">修改头像</span>
                </div>
                <div class="name mt-[10px]">{{ username }}</div>
                <div class="mt-[30px]">
                    <div class=" text-[12px]/[12px] whitespace-nowrap mt-[8px] text-[#000000]">HoGO ID:5085285fd22</div>
                    <p class="bg-[linear-gradient(to_top_left,_#f0d08d,_#ffe5b4)] rounded-[14px] py-[5px] px-[25px] text-[#6B4726] text-[12px]/[12px] mt-[12px]"
                       :class="{ 'hidden': !isVip }">
                        尊贵的豪华VIP
                    </p>
                </div>
            </div>
            <div class="right bg-inherit col-span-1 p-[40px] flex flex-col gap-y-[30px] ">
                <div class="w-full transition ease-linear duration-700 flex flex-row gap-x-100px">
                    <span class="text-amber-50 w-[60px] mr-[100px]">
                        用户名:
                    </span>
                    <span>
                        <input v-model="form.name"
                               class="w-[200px] bg-inherit rounded-full border-2 border-white outline-0 text-amber-200"/>
                    </span>
                </div>
                <div class="w-full transition ease-linear duration-700 flex flex-row gap-x-100px">
                    <div class="text-amber-50 w-[60px] mr-[100px]">
                        Email:
                    </div>
                    <div>
                        <input v-model="form.email"
                               class="w-[200px] bg-inherit rounded-full border-2 border-white outline-0 text-amber-200"/>
                    </div>
                </div>
                <div class="w-full transition ease-linear duration-700 flex flex-row gap-x-100px">
                    <div class="text-amber-50 w-[60px] mr-[100px]">
                        密码:
                    </div>
                    <div>
                        <input v-model="form.password"
                               class="w-[200px] bg-inherit rounded-full border-2 border-white outline-0 text-amber-200"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.overlay {
    width: 160px;
    height: 160px;
    background-color: gray;
    @apply rounded-full;
    @apply relative;
}

.overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @apply rounded-full;
    background-color: rgba(255, 255, 255, 0.3);

    opacity: 0;
    z-index: 1;

    transition: opacity 0.3s ease;
}

.overlay:hover::before {
    opacity: 1;
}
</style>

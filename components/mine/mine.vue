<script setup>
import {ref, onMounted} from 'vue'
import $ from 'jquery'
import {getVipInfo} from "/api/api.js";
import {ElMessage, ElMessageBox} from 'element-plus'
import {Fetch} from "root/api/fetch.js";

// 设置全局的请求配置
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});

const isVip = ref(false)

const dialogVisible = ref(false)

const vertifycode = ref('')

let username = localStorage.getItem('name')


const avatar = ref('/avatar/default.jpg')

const info = ref({
    name: '',
    email: '',
    password: ''
})

const form = ref({
    name: '',
    email: '',
    password: ''
})


function submitInfo() {
    $.ajax({
        url: 'http://localhost:8080/upgradeUserInfo',
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + vertifycode.value
        },
        data: JSON.stringify({
            oldName: info.value.name,
            username: form.value.name,
            passoword: form.value.password,
            email: form.value.email
        }),
        processData: false,
        contentType: "application/json",
        success: function (response) {
            console.log('Response: ', response);
            dialogVisible.value = false
            ElMessage({
                type: 'success',
                message: `修改账户信息成功!`,
            })

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            dialogVisible.value = false
            if (xhr.status === 403)
                ElMessage({
                    type: 'error',
                    message: `验证码错误.修改账户信息失败!`,
                })
            else if (xhr.status === 500) {
                ElMessage({
                    type: 'error',
                    message: `服务器内错误.修改账户信息失败,请稍后再试!`,
                })
            }
        }
    });
}

onMounted(function () {

    // 初始用户vip信息
    const params = new URLSearchParams();
    params.append('username', 'root');
    Fetch('/getVipInfo'+'?'+params.toString() , {
        method: 'GET',
        header: {
        },
    }).then(async res => {
        console.log(await res.json())
        isVip.value = (await res.json()).vipStatus;
    }).catch(error => {
        console.error(error)
    });

    // 页面加载,获取用户头像
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

    // 页面加载, 获取用户信息

    $.ajax({
        url: 'http://localhost:8080/getUserInfo',
        type: 'GET',
        data: {
            'name': username
        },
        xhrFields: {
            withCredentials: true
        },
        success: function (response, xhr, status) {
            console.log('Response: ', response);
            console.log(status)
            console.log(xhr)
            info.value.name = response[0].name
            info.value.password = response[0].password
            info.value.email = response[0].email
            form.value = info.value
            console.log(form.value)
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
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

    // 提交信息
    $("#submitbtn").on('click', function () {
        if (form.value.password === info.value.password) {
            let res = alert("新密码与旧密码相同是否修改?")
            if (res === false) return;
        }
        ElMessageBox.alert('敏感操作,需要向注册邮箱获取验证码验证身份!', '系统提醒', {
            confirmButtonText: 'OK',
            callback: (action) => {
                if (action === "cancel") {
                    ElMessage({
                        type: 'info',
                        message: `修改账户信息操作已取消`,
                    })
                } else {
                    dialogVisible.value = true;
                    ElMessage({
                        type: 'info',
                        message: `请稍等一会,验证码发送成功将会提示~`,
                    })
                    $.ajax({
                        url: 'http://localhost:8080/authmail',
                        type: 'POST',
                        data: {
                            username: info.value.name,
                            email: info.value.email
                        },
                        processData: true,  //将参数作为查询参数,添加到url上去
                        contentType: "application/x-www-form-urlencoded",
                        success: function (response) {
                            // 请求成功的处理逻辑
                            console.log('上传成功', response);
                            ElMessage({
                                type: 'success',
                                message: `验证码已经发送,请查看邮件!`,
                            })
                        },
                        error: function (xhr, status, error) {
                            // 请求失败的处理逻辑
                            ElMessage({
                                type: 'warn',
                                message: `服务器错误,请稍后再试!`,
                            })
                            console.log('', error);
                        }
                    });
                }
            },
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
            <div class="right bg-inherit col-span-1 p-[40px] flex flex-col gap-y-[30px] relative w-full justify-around">
                <div class="w-full transition ease-linear duration-700 flex flex-row gap-x-100px">
                    <span class="text-amber-50 w-[60px] mr-[100px]">
                        用户名:
                    </span>
                    <span>
                        <input v-model="form.name"
                               class="w-[300px] bg-inherit rounded-full border-2 border-white outline-0 text-blue-100 text-center"/>
                    </span>
                </div>
                <div class="w-full transition ease-linear duration-700 flex flex-row gap-x-100px">
                    <div class="text-amber-50 w-[60px] mr-[100px]">
                        Email:
                    </div>
                    <div>
                        <input v-model="form.email"
                               class="w-[300px] bg-inherit rounded-full border-2 border-white outline-0 text-blue-100 text-center"/>
                    </div>
                </div>
                <div class="w-full transition ease-linear duration-700 flex flex-row gap-x-100px">s
                    <div class="text-amber-50 w-[60px] mr-[100px]">
                        密码:
                    </div>
                    <div>
                        <input v-model="form.password"
                               class="w-[300px] bg-inherit rounded-full border-2 border-white outline-0 text-blue-100 text-center"/>
                    </div>
                </div>

                <div class="flex w-full justify-center mt-[70px] " id="submitbtn">
                    <span class="bg-cyan-600 p-2 w-[180px] rounded-full text-center">提交信息</span>
                </div>
                <el-dialog v-model="dialogVisible" title="Tips" width="30%" :close-on-click-modal="true">
                    <div class="flex flex-col justify-center">
                        <div>
                            请查看邮件,输入验证码!
                        </div>
                        <div>
                            <el-input v-model="vertifycode"></el-input>
                        </div>
                        <div class="flex justify-center ">
                            <span class="px-2 w-[80px] rounded-full bg-cyan-600 text-center mt-[20px]" @click="submitInfo">
                                确认
                            </span>
                        </div>
                    </div>
                </el-dialog>
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

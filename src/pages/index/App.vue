<script setup>
import {onMounted, ref, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {SignOut} from '@/api/api.js';
import modifyCombo from '/src/components/modifyCombo/index.vue'
import {drawerStatus, vipInfo} from '@/pinia/store.js'
import {ElMessage, ElNotification} from 'element-plus'

const router = useRouter()
const route = useRoute()

const drawer = drawerStatus()

// 导航栏
const defalutActiveIndex = ref('1');
let currentIndex = ref('1');

function handleSelect(index) {
    currentIndex.value = index;
    if (index === '1') {
        router.push({path: '/'})
    } else if (index === '3-1') {
        router.push({path: '/mine'})
    } else if (index === '3-3') {
        SignOut(
            {name: localStorage.getItem('name')})
            .then(res => {
                localStorage.clear()
                location.href = '../login/index.html'
            })
            .catch(e => {
                console.log(e)
            })
    } else if (index === '2-4') {
        router.push({path: '/userMange'})
    } else if (index === '7') {
        router.push({path: '/aboutUs'})
    } else if (index === '2-2') {
        router.push({path: '/musicMange'})
    } else if (index === '2-1') {
        router.push({path: '/addMusic'})
    } else if (index === '3-2') {
        router.push({path: '/vip'})
    } else if (index === '2-5') {
        drawer.open()
    }
}

// 获取存储的用户信息
let displayUserMange = ref(false)
onMounted(() => {
    let name = localStorage.getItem('name')
    displayUserMange = computed(() => {
        return name === 'root';
    })

    // websockt连接
    // 1.套餐价格修改
    const vipinfo = vipInfo()
    const ComboSocket = new WebSocket("ws://localhost:8080/websocket/comboInfo");
    ComboSocket.onmessage = function (data) {
        let temp = JSON.parse(data.data)
        console.log(temp)

        // 全局更改vipinfo的信息
        vipinfo.$patch((state) => {
                state.vipinfo = temp.list
            }
        )

        if (temp.type && name !== 'root') {
            ElNotification({
                title: '系统消息',
                message: "VIP套餐价格已经更新,去看看叭😀~",
                position: 'top-left',
            })
        }
    };
    ComboSocket.onclose = function () {
        console.log('Disconnected from WebSocket server --logout');
    };

    // 2.下线通知
    const LogoutSocket = new WebSocket("ws://localhost:8080/websocket/logout");
    LogoutSocket.onmessage = function (data) {
        console.log("账户下线通告")
        ElMessage.error("在线状态已经过期,即将跳转到登录页面,请重新登录!")

        localStorage.clear()
        setTimeout(() => {
            window.location.href = '../login/index.html'
        }, 2000)

    };
    LogoutSocket.onclose = function () {
        console.log('Disconnected from WebSocket server');
    };
})
</script>
<template>
    <div class="container absolute inset-0 Background overflow-y-auto font-sans">
        <div class="nav sticky inset-0 z-10" ref="realNav">
            <el-menu :default-active="defalutActiveIndex" class="el-menu-demo flex justify-around" mode="horizontal"
                     background-color="#020617" text-color="#ffffff" active-text-color="#67e8f9" @select="handleSelect"
                     :unique-opened="true" menu-trigger="hover">
                <el-menu-item index="1">发现音乐</el-menu-item>
                <el-sub-menu index="2">
                    <template #title>工作区</template>
                    <el-menu-item index="2-1">专辑发布</el-menu-item>
                    <el-menu-item index="2-2">专辑管理</el-menu-item>
                    <el-menu-item index="2-3">版权交易</el-menu-item>
                    <template v-if="displayUserMange">
                        <el-menu-item index="2-4">用户管理</el-menu-item>
                        <el-menu-item index='2-5'>套餐设置</el-menu-item>
                    </template>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <i-ep-User/>
                        </el-icon>
                        用户中心
                    </template>
                    <el-menu-item index="3-1">账号管理</el-menu-item>
                    <el-menu-item index="3-2">VIP购买</el-menu-item>
                    <el-menu-item index="3-3">安全退出</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="5">
                    <el-icon color="red">
                        <i-ep-Download/>
                    </el-icon>
                    客户端下载
                </el-menu-item>
                <el-menu-item index="6">
                    <el-icon>
                        <i-ep-QuestionFilled/>
                    </el-icon>
                    帮助中心
                </el-menu-item>
                <el-menu-item index="7">
                    <el-icon>
                        <i-ep-ElementPlus/>
                    </el-icon>
                    关于我们
                </el-menu-item>
            </el-menu>
        </div>
        <router-view></router-view>
        <modify-combo v-if="drawer.status"></modify-combo>
    </div>
</template>
<style scoped>
:deep(.el-icon) {
    color: red !important;
}
</style>

import axios from 'axios';

const API_URL = 'http://localhost:8080';
axios.defaults.withCredentials = true;
// 创建 axios 实例
const instance = axios.create({
    baseURL: API_URL
});

// 定义接口函数
export function commentSong(name) {
    return instance.post('/commentSong', name);
}

export function getSongComment(name) {
    return instance.get('/getSongComment', name);
}

export function uploadMusicFile(formData) {
    return instance.post('/uploadMusicFile', formData);
}

export function addMusic(params) {
    return instance.post('/addMusic', params);
}

export function modifyMusic(params) {
    return instance.post('/modifyMusic', params);
}

export function payVip(params) {
    return instance.post('/pay', params)
    // 支付接口
}

export function shopVip(params) {
    return instance.post('/payVip', params)
    // 支付vip费用
}

export function getVipInfo(params) {
    // 获取vip状态
    // axios
    return instance.get('/getVipInfo', { params })
}

export function topIn(params) {
    return instance.post('/topIn', params)
}

export function getComboList() {
    return instance.get('/getComboInfo')
}

export function upgradeCombo(params) {
    return instance.post('/upgradeCombo', params)
}

export function SignOut(param) {
    return instance.post("/signout", param)
}
import axios from 'axios';

const API_URL = 'http://localhost:8080';

// 创建 axios 实例
const instance = axios.create({
    baseURL: API_URL
});

// 定义接口函数
export function LogIn(userData) {
    return instance.post('/LogIn', userData);
};
    
export function SignUp(userData) {
    return axios.post('/SignUp', userData);
};

export function userList() {
    return instance.get('/userList');
}

export function deleteUser(name) {
    return instance.post('/deleteUser', name);
}

export function deactiveUser(name) {
    return instance.post('/stopUser', name);
}

export function getSongList() {
    return instance.get('/getSongList');
}

export function commentSong(name) {
    return instance.post('/commentSong', name);
}

export function getSongComment(name) {
    return instance.get('/getSongComment', name);
}
export function deleteMusic(name) {
    return instance.post('/deleteMusic', name);
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

export function payVip(params){
    return instance.post('/pay',params)
    // 支付接口
}

export function shopVip(params){
    return instance.post('/payVip',params)
    // 支付vip费用
}

export function getVipStatus(params) {
    // 获取vip状态
    // axios
    return instance.get('/getVipStatus', {params})
}

export function topIn(params){
    return instance.post('/topIn',params)
}
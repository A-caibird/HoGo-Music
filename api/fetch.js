const server_url = 'http://localhost:8080'
export function Fetch(url, options={}){
    const {
        method = 'GET',
        mode = 'cors',
        credentials = 'include',
        cache = 'default', // 缓存模式，默认为 'default'
        redirect = 'follow', // 重定向模式，默认为 'follow'
        referrer = 'client', // 引用模式，默认为 'client'
        headers = {
            'Content-Type': 'application/json',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15'
        },
        body = null
    } = options
    return fetch(server_url+url,options)
}
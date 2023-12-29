// 为了尽量的让浏览器识别一下我这边尽我所能的写了es5
// 存储端口
var portList = []
// 存下来wsUrl用来重新连接使用
var websocketUrl = null
// ws实例
var websocket = null
// 当前错误次数
var webSocketError = 0
// 重连最大次数
var webSocketErrorMax = 6
// 我这边长连接保持使用的是计时器没有使用延时器 主要原因是后端不想跟我通心跳。。。。
var timeout = null
// 计时器发送时间
var delay = 30000
// 连接端  每次创建也就是new SharedWorker 都会调用onconnect
onconnect = function (e) {
    var port = e.ports[0]
    // 存储端口
    portList.push(port)
    // 监听port推送
    port.addEventListener('message', function (e) {
        // 取数据
        var data = e.data || {}
        console.log(data, portList, portList.indexOf(port))
        switch (data) {
            case 'open':
                // 创建websocket
                initSocket(self.name)
                break
            case 'portClose':
                // 关闭当前端口（new SharedWorker 会默认开启端口）
                if (portList.indexOf(port) > -1) {
                    portList.splice(portList.indexOf(port), 1)
                }
                break
            case 'WsClose':
                // 关闭websocket
                websocket.send('close')
                websocketClose()
                websocket = null
                break
            case 'close':
                // 关闭SharedWorker 通过self调用 SharedWorkerGlobalScope 的实例
                self.close()
                break
            default:
                break
        }
        // 设置不抛出状态值
        if (['open', 'portClose', 'WsClose', 'close'].indexOf(data) === -1) {
            // 循环端口触发通讯
            for (var i = 0; i < portList.length; i++) {
                var eElement = portList[i]
                eElement.postMessage(e.data)
            }
        }
    })
    port.start()
}
// websocket创建
var initSocket = function (url) {
    if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket
    }
    if (websocket === null) {
        websocket = new WebSocket(url) // WebSocket服务端地址
        websocketUrl = url
    }
    websocket.onopen = function(event) {
        for (var i = 0; i < portList.length; i++) {
            var eElement = portList[i]
            eElement.postMessage(event.data)
        }
        webSocketError = 0
        heartCheck()
    }
    websocket.onmessage = function(event) {
        for (var i = 0; i < portList.length; i++) {
            var eElement = portList[i]
            eElement.postMessage(event.data)
        }
        // item!=port&&item.postMessage(workerResult);  /**不发给自己 */
    }
    websocket.onclose = function() {
        if (webSocketError < webSocketErrorMax) {
            setTimeout(function() {
                initSocket(websocketUrl)
            }, 5000)
        } else {
            console.warn('已达到最大重连次数')
        }
    }
    websocket.onerror = function() {
        webSocketError++
    }
}
// 心跳
function heartCheck() {
    timeout = setInterval(function() {
        websocket.send('1')
    }, delay)
}
// websocket关闭
function websocketClose() {
    websocket.send('close')
    webSocketError = 33
    clearInterval(timeout)
    websocket.close()
}

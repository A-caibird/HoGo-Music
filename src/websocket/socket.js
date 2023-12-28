// 广播vip套餐信息
export const ComboSocket = new WebSocket("ws://localhost:8080/websocket/comboInfo");

// 安全退出,重定向
export const logoutSocket = new WebSocket("ws://localhost:8080/websocket/logout")
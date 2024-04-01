import { app, BrowserWindow } from 'electron'
import {join} from "path";
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
    })
    // 主要改了这里
    // mainWindow.loadFile(path.join(__dirname, "./index.html"));
    // 使用 loadURL 加载 http://localhost:3004 ，也就是我们刚才创建的 Vue 项目地址
    // 3004 改为你 Vue 项目的端口号
    mainWindow.loadURL("http://localhost:5173").then(r => console.log(r));
}

app.whenReady().then(() => {
    createWindow()
})

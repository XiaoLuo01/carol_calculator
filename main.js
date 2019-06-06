/**
 * electron 的入口文件
 */

 // 开启一个应用, 需要引入 app
const {app, BrowserWindow} = require('electron')
var path = require('path')

// 当我们启动 main.js 文件的时候, 会自动的触发 app 的 ready 事件
app.on('ready', function () {
    // 在这个事件中, 一般进行当前应用的窗口的创建
    myCreatWindow()
})

// 通过一个函数来创建应用程序的窗口
function myCreatWindow() {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 320,
        height: 519,
        title: 'Carol_Calculator'
    })

    // 设置窗口中所加载的页面的内容
    win.loadURL(path.join(__dirname, 'views/index.html'))

    // 打开调试工具
    // win.webContents.openDevTools()

    // 添加事件 - 当窗口关闭的时候触发
    win.on('close', function (event) {
        // 讲 win 重置为 null
        win = null
        // 应用程序退出
        app.quit()
    })

    // 当窗口加载完毕之后, 准备显示的时候触发
    win.on('ready-to-show', function () {
        win.show()
        // 将当前窗口激活
        win.focus()
    })

    // 引入菜单模块
    require('./mainProcess/menu')
}
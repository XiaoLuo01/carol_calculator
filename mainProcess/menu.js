/**
 * 菜单项
 */

const { Menu, BrowserWindow, dialog} = require('electron')
var path = require('path')

// 构建具体的菜单项
let template = [
    // 单个菜单项
    {
        label: 'Carol_计算器',
        submenu: [
            {
                label: '关于',
                click: function () {
                    c_aboutWindow()
                }
            },
            {
                label: '退出',
                click: function (item, win, event) {
                    // 询问用户是否真的需要退出
                    dialog.showMessageBox({
                        // 设置当前消息框的类型
                        type: 'info',
                        title: 'Carol 提示',
                        message: '请问是否真的需要退出?',
                        buttons: ['确定', '取消']
                    }, (index) => {
                        if (index == 0) {
                            win.destroy()
                        }
                    })
                }
            }
        ]
    },
    {
        label: '选项',
        submenu: [
            {
                label: '颜色',
                accelerator: (function () {
                    // 根据系统类型判断
                    if (process.platform == 'darwin') {
                        return 'command + shift + c'
                    } else {
                        return 'control + shift + c'
                    }
                })(),
                click: function () {
                    c_setColor()
                }
            },
            {
                label: '字体增大',
                accelerator: 'F11',
                click: function (item, win, event) {
                    // 主进程向渲染进行发消息, menu.js 是主进程
                    win.webContents.send('c_add')
                }
            },
            {
                label: '字体减小',
                accelerator: 'F12',
                click: function (item, win, event) {
                    win.webContents.send('c_sub')
                }
            },
            {
                label: '默认字体',
                accelerator: 'F10',
                click: function (item, win, event) {
                    win.webContents.send('c_default')
                }
            }
        ]
    }
]

// 为应用程序构建菜单项
let menu = Menu.buildFromTemplate(template)

// 将构建好的菜单项添加到应用程序
Menu.setApplicationMenu(menu)

// 展示关于页面
function c_aboutWindow() {
    let win = new BrowserWindow({
        width: 300,
        height: 250,
        title: '关于Carol计算器'
    })
    //  加载 about 静态页面
    win.loadURL(path.join(__dirname, '../views/about.html'))
    // 设置当前窗体不显示菜单项
    win.setMenu(null)
}

// 展示选择颜色页面
function c_setColor() {
    let win = new BrowserWindow({
        width: 250,
        height: 100,
        title: '选择颜色',
        webPreferences: {
            nodeIntegration: true
        }
    })
    //  加载 color 静态页面
    win.loadURL(path.join(__dirname, '../views/color.html'))
    // 设置当前窗体不显示菜单项
    win.setMenu(null)
}  
const { Tray, Menu, dialog} = require('electron')
var path = require('path')

// 使用函数封装创建系统托盘图标
function creatTray(win) {
    // 创建系统托盘图标对象
    let tray = new Tray(path.join(__dirname, '../images/icon.ico'))

    // 设置鼠标指针在托盘图标上悬停显示的文本
    tray.setToolTip('Carol_Calculator')

    // 为系统托盘图标添加事件
    tray.on('click', () => {
        // 实现窗口的显示和隐藏
        if (win.isVisible()) {
            win.hide()
            win.setSkipTaskbar(true)
        } else {
            win.show()
            win.setSkipTaskbar(false)
        }
    })

    // 创建系统托盘的上下文菜单
    const menu = Menu.buildFromTemplate([
        {
            label: '退出',
            click: () => {
                dialog.showMessageBox({
                    // 设置当前消息框的类型
                    type: 'info',
                    title: 'Carol 提示',
                    message: '请问是否真的需要退出?',
                    buttons: ['确定', '取消']
                }, (index) => {
                    if (index == 0) {
                        // 销毁图标
                        tray.destroy()
                        // 销毁窗体
                        win.destroy()
                    }
                })
            }
        }
    ])

    // 设置这个图标的内容
    tray.setContextMenu(menu)
}

// 暴露成员
module.exports = creatTray
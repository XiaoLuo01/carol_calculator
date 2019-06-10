// 引入 ipcRenderer
const ipcRenderer = require('electron').ipcRenderer

// 获取展示结果的文本框
var resultText = document.querySelector('.result-text')
// 加载用户编好设置
resultText.style.color = localStorage.getItem('sysFontColor')
resultText.style.fontSize = localStorage.getItem('sysFontSize') + 'px'

// 设置颜色: 监听从主进程发送过来的消息
ipcRenderer.on('c_setColortoRender', (event, color) => {
    // 设置文本框的颜色样式
    resultText.style.color = color
    // 实现颜色的本地存储
    localStorage.setItem('sysFontColor', color)
})

// 增大字体
ipcRenderer.on('c_add', (event, color) => {
    // 获取原始文本的字体大小
    var fontsize = window.getComputedStyle(resultText, null).fontSize
    // 修改字体大小
    var newFontsize = fontsize.replace('px', '') - 0 + 3
    if (newFontsize >= 80) {
        return
    }
    // 重置字体大小
    resultText.style.fontSize = newFontsize + 'px'
    // 实现字体大小的本地存储
    localStorage.setItem('sysFontSize', newFontsize)
})

// 减小字体
ipcRenderer.on('c_sub', (event, color) => {
    // 获取原始文本的字体大小
    var fontsize = window.getComputedStyle(resultText, null).fontSize
    // 修改字体大小
    var newFontsize = fontsize.replace('px', '') - 0 - 3
    if (newFontsize <= 24) {
        return
    }
    // 重置字体大小
    resultText.style.fontSize = newFontsize + 'px'
    // 实现字体大小的本地存储
    localStorage.setItem('sysFontSize', newFontsize)
})

// 默认字体大小
ipcRenderer.on('c_default', (event, color) => {
    resultText.style.fontSize = '50px'
    localStorage.setItem('sysFontSize', 50)
})
// 引入 ipcRenderer
const ipcRenderer = require('electron').ipcRenderer

// 获取展示结果的文本框
var resultText = document.querySelector('.result-text')
// 加载用户编好设置
resultText.style.color = localStorage.getItem('sysFontColor')

// 设置颜色: 监听从主进程发送过来的消息
ipcRenderer.on('c_setColortoRender', (event, color) => {
    // 设置文本框的颜色样式
    resultText.style.color = color
    // 实现颜色的本地存储
    localStorage.setItem('sysFontColor', color)
})
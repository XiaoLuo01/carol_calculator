// 引入 ipcRenderer
const ipcRenderer = require('electron').ipcRenderer
var math = require('mathjs')

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

// 实现计算功能
let result = ''
let main = {
    // 添加标记, 标记用户是否点击了 = 号
    isEqual: false,
    // 标记用户是否按下运算符
    isOpt: false,
    // 实现数字的输入
    clickNum(num) {
        // 判断用户是否刚刚点击了 =
        if (this.isEqual && !this.isOpt) {
            result = ''
            resultText.innerHTML = '0'
            this.isEqual = false
        }
        // 判断用户是否重复输入了点
        let isPiont = num === '.'
        if (result.indexOf('.') !== -1 && isPiont) {
            return
        }
        // 将用户的输入依次拼接到 result 中
        result = result.toString()
        result += num
        // 将 result 值复制给文本框
        resultText.innerHTML = result
    },
    // 重置用户的输入
    reset() {
        resultText.innerHTML = '0'
        result = ''
    },
    // 每次点击删除最后一个
    delete() {
        result = result.substring(0, result.length -1)
        resultText.innerHTML = result.length === 0 ? '0' : result
    },
    // 实现计算功能
    clickopt(opt) {
        switch (opt) {
            case '+/-':
                result = math.eval(result + "*-1")
                resultText.innerHTML = result
                break;
            case '%':
                result = math.format(math.eval(result + "/100"), 4)
                resultText.innerHTML = result
                break;
            default:
                result = result + opt
                resultText.innerHTML = result
                break;
        }
        this.isOpt = true
    },
    // 实现最终的计算功能
    calc() {
        result = math.eval(result).toString()
        resultText.innerHTML = result
        this.isEqual = true
        this.isOpt = false
    }
}

// // 单机右键弹出右键菜单(上下文菜单)
// document.oncontextmenu = () => {
//     // 渲染进程向主进程发送消息
//     ipcRenderer.send('c_showContextMenu')
// }
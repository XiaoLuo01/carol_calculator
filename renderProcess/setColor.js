// 引入 ipcRenderer
const ipcRenderer = require('electron').ipcRenderer

// 获取所有颜色的 span 
var spans = document.getElementById('box').querySelectorAll('span')
console.log(spans)
// 为所有颜色块绑定事件
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
        let color = this.dataset['color']
        // 实现渲染进程向主进程发送数据
        console.log(color)
        ipcRenderer.send('c_setColor', color)
    }
}
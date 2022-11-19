# Jcanvas
一款简易图形渲染库

## ✨ 特点

- 💎**TS**： 应用 typescript 进行 type check
- 🚀 **基于原生纯渲染库** 
- ⚙️**使用多图层操作**：搭配缓存机制和特制 Jcanvas 图层，减少不必要渲染，提升渲染性能和效率

## 📦 使用

```
$ git clone https://github.com/Jesslynwong/Jcanvas.git

# npm 
$ npm install
$ npm run serve

cd Jcanvas
mkdir <DEMO> // 文件在里面写即可，目前demo能跑来看看 
```

```
// 引用Jcanvas方法
import {Jcanvas, Brush, Rectangle, Move} from '../jcanvas/ index'
// 引用Jcanvas图层
import {Canvas} from '../CanvasLayer/Canvas'
// 引入Jcanvas缓存
import {CanvasCache} from '../CanvasCache/CanvasCache'

//设置样式
const rect_style = {
    draw_color :'rgba(39, 245, 78, 0.3)',
    draw_width : 10
}
const clusterCanvasDom = document.getElementById('cluster_canvas') as HTMLCanvasElement | null
const activeCanvasDom = document.getElementById('active_canvas') as HTMLCanvasElement | null
// 设置图层，集成图层和活跃图层
const canvasCache = new CanvasCache(clusterCanvas, activeCanvas)
// 引入绘制形状
const rect = new Rectangle(activeCanvas, rect_style, canvasCache)
// 当前功能加入jcanvas中
jcanvas.add(rect)  
```

目前基本功能实现，欢迎pr


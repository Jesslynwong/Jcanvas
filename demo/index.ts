import './index.css'
import {Jcanvas} from '../jcanvas/ index'
const style = {
    draw_color :'black',
    draw_width : 20

}

const canvas = document.getElementById('main_canvas') as HTMLCanvasElement | null
const brushBtn = document.getElementById('brush') as HTMLButtonElement
const lineBtn = document.getElementById('line') as HTMLButtonElement

brushBtn.onclick = function() {
    // 单例模式
    const brush = new Jcanvas.Brush(canvas, style)
    const instance = new Jcanvas.Canvas(brush) as any
    instance.special.registryEvents()
}
// TODO 消除事件
lineBtn.onclick = function() {
    
}
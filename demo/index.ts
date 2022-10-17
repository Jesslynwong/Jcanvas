import './index.css'
import {Jcanvas, Brush, Rectangle} from '../jcanvas/ index'
import Line from '../jcanvas/shape/Line'
const style = {
    draw_color :'black',
    draw_width : 10

}

const canvas = document.getElementById('main_canvas') as HTMLCanvasElement | null
const brushBtn = document.getElementById('brush') as HTMLButtonElement
const rectBtn = document.getElementById('rect') as HTMLButtonElement

const jcanvas = new Jcanvas()

brushBtn.onclick = function() {
    const brush = new Brush(canvas, style)
    jcanvas.add(brush)
}
rectBtn.onclick = function() {
    const rect = new Rectangle(canvas, style)
    jcanvas.add(rect)
}
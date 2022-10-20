import './index.css'
import {Jcanvas, Brush, Rectangle} from '../jcanvas/ index'
import {Canvas} from '../CanvasLayer/Canvas'
import {CanvasCache} from '../CanvasCache/CanvasCache'

import img from '../asset/bg_image.jpeg'
const brush_style = {
    draw_color :'rgba(244, 255, 3, 0.1)',
    draw_width : 20
}
const rect_style = {
    draw_color :'rgba(39, 245, 78, 0.3)',
    draw_width : 10
}

// image_canvas 
const image_canvas = document.getElementById('image_canvas') as HTMLCanvasElement | null
const bgCtx = image_canvas.getContext('2d') 
let bgImage = new Image() 
bgImage.src = img
bgImage.onload = () => {
    drawBackgroundImage()
}

function drawBackgroundImage() {    
    bgCtx.drawImage(bgImage, 0,0,1200, 850)
}

// cluster_canvas

const clusterCanvasDom = document.getElementById('cluster_canvas') as HTMLCanvasElement | null
const clusterCanvas = new Canvas(clusterCanvasDom, 'source-over')
const canvasCache = new CanvasCache(clusterCanvas)
// active_canvas 

const activeCanvasDom = document.getElementById('active_canvas') as HTMLCanvasElement | null
const activeCanvas = new Canvas(activeCanvasDom,'xor')

const brushBtn = document.getElementById('brush') as HTMLButtonElement
const rectBtn = document.getElementById('rect') as HTMLButtonElement

const jcanvas = new Jcanvas()

brushBtn.onclick = function() {
    const brush = new Brush(activeCanvas, brush_style, canvasCache)
    jcanvas.add(brush)    
}
rectBtn.onclick = function() {
    const rect = new Rectangle(activeCanvas, rect_style, canvasCache)
    jcanvas.add(rect)
}
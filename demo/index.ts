/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2022-10-11 15:27:16
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2022-10-22 18:00:47
 * @FilePath: /Jcanvas/demo/index.ts
 * @Description: Jcanvas 使用
 */
import './index.css'
import {Jcanvas, Brush, Rectangle, Move} from '../jcanvas/ index'
import {Canvas} from '../CanvasLayer/Canvas'
import {CanvasCache} from '../CanvasCache/CanvasCache'
import canvasConfig from '../CanvasLayer/canvasConfig'
import img from '../asset/bg_image.jpeg'

const brush_style = {
    draw_color :'rgba(244, 255, 3, 0.1)',
    draw_width : 20
}
const rect_style = {
    draw_color :'rgba(39, 245, 78, 0.3)',
    draw_width : 10
}

const image_canvas = document.getElementById('image_canvas') as HTMLCanvasElement | null
const clusterCanvasDom = document.getElementById('cluster_canvas') as HTMLCanvasElement | null
const activeCanvasDom = document.getElementById('active_canvas') as HTMLCanvasElement | null
const brushBtn = document.getElementById('brush') as HTMLButtonElement | null
const rectBtn = document.getElementById('rect') as HTMLButtonElement | null
const choiceBtn = document.getElementById('choice') as HTMLButtonElement | null

const clusterCanvas = new Canvas(clusterCanvasDom, 'source-over')
const activeCanvas = new Canvas(activeCanvasDom,'xor')

const canvasCache = new CanvasCache(clusterCanvas, activeCanvas)

// image_canvas 
const bgCtx = image_canvas.getContext('2d') 
let bgImage = new Image() 
bgImage.src = img
bgImage.onload = () => {
    drawBackgroundImage()
}
function drawBackgroundImage() {    
    bgCtx.drawImage(bgImage, 0,0,canvasConfig.width, canvasConfig.height)
}

// Jcanvas 使用
const jcanvas = new Jcanvas()

brushBtn.onclick = function() {
    const brush = new Brush(activeCanvas, brush_style, canvasCache)
    jcanvas.add(brush)    
}
rectBtn.onclick = function() {
    const rect = new Rectangle(activeCanvas, rect_style, canvasCache)
    jcanvas.add(rect)
}

choiceBtn.onclick = function() {
    const choice = new Move(activeCanvas, canvasCache)
    jcanvas.add(choice)
}
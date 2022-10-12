import './index.css'

const canvas = document.getElementById('main_canvas') as HTMLCanvasElement | null
let context = canvas.getContext('2d')

// 配置
let is_drawing = false
let draw_color = 'black'
let draw_width = 20

// 事件
canvas.addEventListener('mousedown', start, false)
canvas.addEventListener('mousemove', draw, false)
canvas.addEventListener('mouseup', stop, false)


// 方法
function start(e:any):void {
    is_drawing = true
    context.beginPath()    
    context.strokeStyle = draw_color
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = draw_width
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
}

function draw(e:any):void {
    if (!is_drawing) return
    
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    
    context.stroke()
    
}

function stop(e:any):void {
    if (is_drawing) {
        is_drawing = false
    }
}
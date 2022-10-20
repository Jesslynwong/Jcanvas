import {JcanvasType}  from '../interface'
import Shape from './Shape'
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'
export default class Line extends Shape{
    is_drawing: boolean = false
    context: CanvasRenderingContext2D
    canvas:HTMLCanvasElement
    style: JcanvasType
    
    constructor( canvas:Canvas, style:JcanvasType ) {
        super()
        this.canvas = canvas.canvas
        this.context = canvas.context     
        this.style = style        
    }

    start = (e:any ) => {
        this.is_drawing = true
        if (!this.is_drawing) return 
        this.context.beginPath()    
        this.context.strokeStyle = this.style.draw_color
        this.context.lineCap = 'round'
        this.context.lineJoin = 'round'
        this.context.lineWidth = this.style.draw_width
        this.context.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
    }

    draw = (e:any) => {    
        if (this.is_drawing) {
            this.context.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
            this.context.stroke()
        }     
        
    }
    stop = (e:any, cache:CanvasCache) => {
        if (this.is_drawing) {
            this.is_drawing = false
            const brush = this.context.getImageData(0,0,1200,850)
            cache.addShape(brush)            
            this.context.clearRect(0,0,1200,850)
        }
    }

}
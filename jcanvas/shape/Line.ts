import {JcanvasType}  from '../interface'
import Shape from './Shape'
export default class Line extends Shape{
    is_drawing: boolean = false
    context: CanvasRenderingContext2D
    canvas:HTMLCanvasElement
    style: JcanvasType
    
    constructor( canvas:HTMLCanvasElement, style:JcanvasType ) {
        super()
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')        
        this.style = style        
    }

    start(e:any ) {
        this.is_drawing = true
        if (!this.is_drawing) return 
        this.context.beginPath()    
        this.context.strokeStyle = this.style.draw_color
        this.context.lineCap = 'round'
        this.context.lineJoin = 'round'
        this.context.lineWidth = this.style.draw_width
        this.context.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
    }

    draw(e:any) {    
        if (this.is_drawing) {
            this.context.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
            this.context.stroke()
        }     
        
    }
    stop(e:any) {
        if (this.is_drawing) {
            this.is_drawing = false
        }
    }

}
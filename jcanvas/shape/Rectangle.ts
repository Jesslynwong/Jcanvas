import Shape from "./Shape";
import {JcanvasType, Coordinate, Size} from '../interface'

export class Rectangle extends Shape{
    canvas:HTMLCanvasElement
    context: CanvasRenderingContext2D
    style: JcanvasType
    rectBegin:Coordinate
    preRectParams: Size = {width:0, height:0}
    is_drawing:boolean =  false
    
    
    
    constructor( canvas:HTMLCanvasElement, style:JcanvasType ) {
        super()
        this.canvas = canvas
        this.style = style 
        this.context = canvas.getContext('2d')       
        this.context.lineWidth = this.style.draw_width
    }

    registryEvents(){        
        this.canvas.addEventListener('mousedown', this.start)
        this.canvas.addEventListener('mousemove', this.draw)
        this.canvas.addEventListener('mouseup', this.stop)
    }

    destroyEvents() {                
        this.canvas.removeEventListener('mousedown', this.start)
        this.canvas.removeEventListener('mousemove', this.draw)
        this.canvas.removeEventListener('mouseup', this.stop)
    }

    start = (e) => {
        this.is_drawing = true
        this.rectBegin =  {
            x:e.clientX - this.canvas.offsetLeft,
            y:e.clientY - this.canvas.offsetTop
        }

    }

    draw = (e) => {
        if (this.is_drawing) {
            const width:number = e.clientX - this.canvas.offsetLeft - this.rectBegin.x
            const height:number = e.clientY - this.canvas.offsetTop - this.rectBegin.y
            this.context.beginPath()            
            // 消除线宽的影响,直接0，0即可
            this.context.clearRect(this.rectBegin.x-this.style.draw_width, this.rectBegin.y-this.style.draw_width, this.preRectParams.width + this.style.draw_width*2  , this.preRectParams.height+this.style.draw_width*2 )            
            this.context.strokeRect(this.rectBegin.x,this.rectBegin.y,width,height);            
            this.preRectParams = {
                width,
                height
            }
        }
    }

    stop = () => {
        if (this.is_drawing) {
            this.is_drawing = false
            this.preRectParams = {
                width: 0,
                height:0
            }
        }
    }

}
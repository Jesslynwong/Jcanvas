import Shape from "./Shape";
import {JcanvasType, Coordinate, Size} from '../interface'
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'

export class Rectangle extends Shape{
    canvas:HTMLCanvasElement
    context: CanvasRenderingContext2D
    style: JcanvasType
    rectBegin:Coordinate
    is_drawing:boolean =  false
    cache: CanvasCache
    
    constructor( canvas:Canvas, style:JcanvasType, cache: CanvasCache ) {
        super()
        this.canvas = canvas.canvas
        this.style = style 
        this.context = canvas.context    
        // this.context.lineWidth = this.style.draw_width
        this.context.fillStyle = this.style.draw_color
        this.cache = cache
    }

    transferImage = (e:any) => {
        this.stop(this.cache)
    }
    
    registryEvents(){        
        this.canvas.addEventListener('mousedown', this.start)
        this.canvas.addEventListener('mousemove', this.draw)
        this.canvas.addEventListener('mouseup', this.transferImage)
    }

    destroyEvents() {                
        this.canvas.removeEventListener('mousedown', this.start)
        this.canvas.removeEventListener('mousemove', this.draw)
        this.canvas.removeEventListener('mouseup', this.transferImage)
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
            // this.context.clearRect(this.rectBegin.x-this.style.draw_width, this.rectBegin.y-this.style.draw_width, this.preRectParams.width + this.style.draw_width*2  , this.preRectParams.height+this.style.draw_width*2 )            
            this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
            this.context.fillRect(this.rectBegin.x,this.rectBegin.y,width,height);           
        }
    }
    
    stop = (cache:CanvasCache) => { 
        if (this.is_drawing === true) {
            this.is_drawing = false
            const rectangle = this.context.getImageData(0,0,1200,850)
            cache.addShape(rectangle)
            this.context.clearRect(0,0,1200,850)
        }       
        
    }
}
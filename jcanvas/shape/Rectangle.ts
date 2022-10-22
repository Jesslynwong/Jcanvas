import Shape from "./Shape";
import {JcanvasType, Coordinate, Size} from '../interface'
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'

export class Rectangle extends Shape{
    canvasDom:HTMLCanvasElement
    context: CanvasRenderingContext2D
    style: JcanvasType
    cache: CanvasCache
    rectBegin:Coordinate
    is_drawing:boolean =  false
    canvas: Canvas
    
    constructor( canvas:Canvas, style:JcanvasType, cache: CanvasCache ) {
        super()
        this.canvas = canvas
        this.canvasDom = canvas.canvas
        this.style = style 
        this.context = canvas.context    
        this.context.fillStyle = this.style.draw_color
        this.cache = cache
    }

    transferImage = (e:any) => {
        this.stop(this.cache)
    }
    
    registryEvents(){        
        this.canvasDom.addEventListener('mousedown', this.start)
        this.canvasDom.addEventListener('mousemove', this.draw)
        this.canvasDom.addEventListener('mouseup', this.transferImage)
    }

    destroyEvents() {                
        this.canvasDom.removeEventListener('mousedown', this.start)
        this.canvasDom.removeEventListener('mousemove', this.draw)
        this.canvasDom.removeEventListener('mouseup', this.transferImage)
    }

    start = (e) => {
        this.is_drawing = true
        const currentCoordinate = this.canvas.hitCurrentCoordinate(e)
        this.rectBegin =  {
            x:currentCoordinate.x,
            y:currentCoordinate.y
        }
    }

    draw = (e) => {
        if (this.is_drawing) {
            const currentCoordinate = this.canvas.hitCurrentCoordinate(e)
            const width:number = currentCoordinate.x - this.rectBegin.x
            const height:number = currentCoordinate.y - this.rectBegin.y
            this.context.beginPath()                      
            this.canvas.clearCanvas()
            this.context.fillRect(this.rectBegin.x,this.rectBegin.y,width,height);           
        }
    }
    
    stop = (cache:CanvasCache) => { 
        if (this.is_drawing === true) {
            this.is_drawing = false
            const rectangle = this.canvas.getImageData()
            cache.addShape(rectangle)
            this.canvas.clearCanvas()
        }       
        
    }
}
import {JcanvasType}  from '../interface'
import Shape from './Shape'
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'
import {Coordinate} from '../interface'
export default class Line extends Shape{
    is_drawing: boolean = false
    context: CanvasRenderingContext2D
    canvas:Canvas
    style: JcanvasType
    
    constructor( canvas:Canvas, style:JcanvasType ) {
        super()
        this.canvas = canvas
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
        const currentCooridination = this.canvas.hitCurrentCoordinate(e)
        this.context.moveTo(currentCooridination.x, currentCooridination.y)
    }

    draw = (e:any) => {    
        if (this.is_drawing) {
            const currentCooridination:Coordinate  = this.canvas.hitCurrentCoordinate(e)
            this.context.lineTo(currentCooridination.x,currentCooridination.y)
            this.context.stroke()
        }     
    }
    stop = (e:any, cache:CanvasCache) => {
        if (this.is_drawing) {
            this.is_drawing = false
            const brush = this.canvas.getImageData()
            cache.addShape(brush)            
            this.canvas.clearCanvas()
        }
    }
}
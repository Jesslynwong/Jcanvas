import {JcanvasType} from '../interface'
import  Line  from './Line'
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'
export class Brush extends Line{
    canvasDom:HTMLCanvasElement
    context: CanvasRenderingContext2D
    style: JcanvasType
    cache: CanvasCache
    
    constructor( canvas:Canvas, style:JcanvasType, cache: CanvasCache ) {
        super(canvas, style)
        this.canvasDom = canvas.canvas
        this.style = style        
        this.cache = cache
    }

    transferImage = (e:any) => {
        this.stop(e, this.cache)        
    }

    registryEvents(){        
        this.canvas.canvas.addEventListener('mousedown', this.start)
        this.canvasDom.addEventListener('mousemove', this.draw)
        this.canvasDom.addEventListener('mouseup', this.transferImage)
    }

    destroyEvents() {                
        this.canvasDom.removeEventListener('mousedown', this.start)
        this.canvasDom.removeEventListener('mousemove', this.draw)
        this.canvasDom.removeEventListener('mouseup', this.transferImage)
    }
}

import {JcanvasType} from '../interface'
import  Line  from './Line'
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'
export class Brush extends Line{
    canvas:HTMLCanvasElement
    context: CanvasRenderingContext2D
    style: JcanvasType
    cache: CanvasCache
    
    constructor( canvas:Canvas, style:JcanvasType, cache: CanvasCache ) {
        super(canvas, style)
        this.canvas = canvas.canvas
        this.context = canvas.context
        this.style = style        
        this.cache = cache
    }

    transferImage = (e:any) => {
        this.stop(e, this.cache)        
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
}

// import {eventDispatcher} from '../event/emitter'
import {Canvas} from '../CanvasLayer/Canvas'

export class CanvasCache {
    shapeList:ImageData[] // for cluster canvas
    canvas: Canvas

    constructor(canvas: Canvas) {
        this.shapeList = []
        this.canvas = canvas
    }

    addShape = (shape:ImageData) => {
        this.shapeList.push(shape)
        this.canvas.compositeShape(shape)
    }
}
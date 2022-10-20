// import {eventDispatcher} from '../event/emitter'
import {Canvas} from '../CanvasLayer/Canvas'
import {Coordinate} from '../jcanvas/interface'
export class CanvasCache {
    shapeList:ImageData[] // for cluster canvas
    clusterCanvas: Canvas
    activeCanvas: Canvas

    constructor(clusterCanvas: Canvas, activeCanvas: Canvas) {
        this.shapeList = []
        this.clusterCanvas = clusterCanvas
        this.activeCanvas = activeCanvas
    }

    addShape = (shape:ImageData) => {
        this.shapeList.push(shape)
        this.clusterCanvas.compositeShape(shape,0,0)
    }

    deleteShape = (shape:ImageData) => {
        const shapeIndex = this.shapeList.indexOf(shape)
        this.shapeList.splice(shapeIndex,1)
        this.clusterCanvas.compositeShapeList(this.shapeList) // cluster重新遍历渲染
        
    }

    // 找到是否有色块，色块是哪个
    searchSelectedShape = (coordinate: Coordinate) => {
        const selectedShapeList: ImageData[] = this.shapeList.map((shape) => {
            if (shape.data[2] !== 0){
                return shape
            } 
        },[])

        return selectedShapeList
    }
    
}
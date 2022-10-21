// import {eventDispatcher} from '../event/emitter'
import {Canvas} from '../CanvasLayer/Canvas'
import {Coordinate} from '../jcanvas/interface'
import calculateImageDataPixel from '../lib/calculateImageDataPixel'
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
        console.log(this.shapeList);
        
        this.clusterCanvas.compositeShape(shape,0,0)
    }

    deleteShape = (shape:ImageData) => {
        const shapeIndex = this.shapeList.indexOf(shape)
        this.shapeList.splice(shapeIndex,1)
        this.clusterCanvas.clearCanvas()
        this.clusterCanvas.compositeShapeList(this.shapeList) // cluster重新遍历渲染
        
    }

    // 找到是否有色块，色块是哪个
    searchSelectedShape = (coordinate: Coordinate) => {
        const selectedShapeList: ImageData[] = []
        for (let i=0; i < this.shapeList.length; i++){
            const pixelIndexInImageData:number[] = calculateImageDataPixel(this.shapeList[i], coordinate.x, coordinate.y) 
            const alpfaIndex:number = pixelIndexInImageData[3]
            if (this.shapeList[i].data[alpfaIndex] !== 0){
                selectedShapeList.push(this.shapeList[i])
            } 
        }        
        return selectedShapeList
    }
}
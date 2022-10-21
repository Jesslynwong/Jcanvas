import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'
import {Coordinate} from '../interface'
 export class Move {
    shouldMove: boolean = false
    canvas: Canvas
    canvasCache: CanvasCache
    selectedImageData:ImageData
    selectedShapeCooridinate: Coordinate
    isMove:boolean
    
    constructor(canvas:Canvas, canvasCache: CanvasCache ) {
        this.canvas = canvas // active
        this.canvasCache = canvasCache 
        this.isMove = false
    }

    registryEvents(){
         // 移动拖拽 active
        this.canvas.canvas.addEventListener('mousedown', this.handleSelectedShape)
        this.canvas.canvas.addEventListener('mousemove', this.handleMoveShape) // draw2active
        this.canvas.canvas.addEventListener('mouseup', this.handleMoveupShape) // compositeshape2cluster
    }

    destroyEvents(){
        this.canvas.canvas.removeEventListener('mousedown', this.handleSelectedShape)
        this.canvas.canvas.removeEventListener('mousemove', this.handleMoveShape)
        this.canvas.canvas.removeEventListener('mouseup', this.handleMoveupShape)
    }

    // 选中图形，并把图形move到active， 删除cluster
    // 设置开关is_drawing
    handleSelectedShape = (e) => {
        this.selectedShapeCooridinate = this.canvas.hitCurrentCoordinate(e)        
        const selectedShapeList:ImageData[] = this.canvasCache.searchSelectedShape(this.selectedShapeCooridinate)
        
        if (selectedShapeList.length !== 0) {
            this.isMove = true
            this.selectedImageData = selectedShapeList[selectedShapeList.length - 1]
            this.canvasCache.deleteShape(this.selectedImageData) // 删除cluster
            this.canvas.compositeShape(this.selectedImageData,0,0) // 渲染active            
        }
    }

    handleMoveShape = (e) => {
        if (this.isMove === false) return
        this.canvas.clearCanvas()
        const dx =  e.clientX - this.canvas.canvas.offsetTop - this.selectedShapeCooridinate.x
        const dy = e.clientY - this.canvas.canvas.offsetLeft - this.selectedShapeCooridinate.y        
        this.canvas.compositeShape(this.selectedImageData,dx,dy) // 没有通过active cache
    }

    handleMoveupShape = (e) => {
        if (this.isMove === false) return
        this.isMove = false
        const currentImageData:ImageData = this.canvas.getCurrentImageData()
        this.canvasCache.addShape(currentImageData)
    }
}
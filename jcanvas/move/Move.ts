/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2022-10-20 20:20:53
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2022-10-22 17:47:50
 * @FilePath: /Jcanvas/jcanvas/move/move.ts
 * @Description: 移动canvas元素
 */
import {Canvas} from '../../CanvasLayer/Canvas'
import {CanvasCache} from '../../CanvasCache/CanvasCache'
import {Coordinate} from '../interface'
 export class Move {
    shouldMove: boolean = false
    canvas: Canvas
    canvasDom:HTMLCanvasElement
    canvasCache: CanvasCache
    selectedImageData:ImageData
    selectedShapeCooridinate: Coordinate
    isMove:boolean
    
    constructor(canvas:Canvas, canvasCache: CanvasCache ) {
        this.canvas = canvas // active
        this.canvasDom = canvas.canvas
        this.canvasCache = canvasCache 
        this.isMove = false
    }

    registryEvents(){
        this.canvasDom.addEventListener('mousedown', this.handleSelectedShape)
        this.canvasDom.addEventListener('mousemove', this.handleMoveShape) // draw2active
        this.canvasDom.addEventListener('mouseup', this.handleMoveupShape) // compositeshape2cluster
    }

    destroyEvents(){
        this.canvasDom.removeEventListener('mousedown', this.handleSelectedShape)
        this.canvasDom.removeEventListener('mousemove', this.handleMoveShape)
        this.canvasDom.removeEventListener('mouseup', this.handleMoveupShape)
    }

    /**
     * @description: 把在cluster canvas中点击对应的元素删除，移动到active canvas
     * @param {*} e
     * @return {*}
     */    
    handleSelectedShape = (e) => {
        this.selectedShapeCooridinate = this.canvas.hitCurrentCoordinate(e)        
        const selectedShapeList:ImageData[] = this.canvasCache.searchSelectedShape(this.selectedShapeCooridinate)
        
        if (selectedShapeList.length !== 0) {
            this.isMove = true
            this.selectedImageData = selectedShapeList[selectedShapeList.length - 1]
            this.canvasCache.deleteShape(this.selectedImageData) 
            this.canvas.compositeShape(this.selectedImageData,0,0)            
        }
    }

    /**
     * @description: 在active canvas上移动，移动前清除该canvas，在active层进行合成
     * @param {*} e
     * @return {*}
     */    
    handleMoveShape = (e) => {
        if (this.isMove === false) return
        
        this.canvas.clearCanvas()
        const currentCoordinate = this.canvas.hitCurrentCoordinate(e)
        const dx =  currentCoordinate.x - this.selectedShapeCooridinate.x
        const dy = currentCoordinate.y - this.selectedShapeCooridinate.y                
        this.canvas.compositeShape(this.selectedImageData,dx,dy) 
    }

    /**
     * @description: 把移动元素放到canvas cache里面，通过canvas cache合成
     * @param {*} e
     * @return {*}
     */    
    handleMoveupShape = (e) => {
        if (this.isMove === false) return
        this.isMove = false
        const currentImageData:ImageData = this.canvas.getCurrentImageData()
        this.canvasCache.addShape(currentImageData)
    }
}
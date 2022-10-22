/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2022-10-19 16:16:16
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2022-10-22 17:52:50
 * @FilePath: /Jcanvas/CanvasCache/CanvasCache.ts
 * @Description: 缓存canvas上的元素
 */

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

    /**
     * @description: 把元素保存到shapeList中，在cluster canvas合成
     * @param {ImageData} shape
     * @return {*}
     */    
    addShape = (shape:ImageData) => {
        this.shapeList.push(shape)        
        this.clusterCanvas.compositeShape(shape,0,0)
    }

    /**
     * @description: 删除shapeList对应元素，遍历shapeList在cluster canvas合成
     * @param {ImageData} shape
     * @return {*}
     */    
    deleteShape = (shape:ImageData) => {
        const shapeIndex = this.shapeList.indexOf(shape)
        this.shapeList.splice(shapeIndex,1)
        this.clusterCanvas.clearCanvas()
        this.clusterCanvas.compositeShapeList(this.shapeList)
        
    }

    // 找到是否有色块，色块是哪个
    /**
     * @description: 查到canvas对应imageData中对应像素，找出该像素上的元素
     * @param {Coordinate} coordinate
     * @return {*}
     */    
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
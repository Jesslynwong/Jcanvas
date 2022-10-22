/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2022-10-19 15:19:55
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2022-10-22 17:56:35
 * @FilePath: /Jcanvas/CanvasLayer/Canvas.ts
 * @Description: canvas图层
 */
import {Coordinate}  from '../jcanvas/interface'
import canvasConfig from './canvasConfig'
export class Canvas {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    currentHitCoordinate: Coordinate

    constructor(canvas: HTMLCanvasElement, compositeType: GlobalCompositeOperation) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.context.globalCompositeOperation = compositeType
    }

    /**
     * @description: 通过创造offscreen canvas在cluster canvas合成元素
     * @param {ImageData} shape
     * @param {number} dx
     * @param {number} dy
     * @return {*}
     */    
    compositeShape(shape:ImageData, dx:number,dy:number) {    
        const dom = document.createElement('canvas')
        dom.width = canvasConfig.width
        dom.height = canvasConfig.height
        const domContext:CanvasRenderingContext2D = dom.getContext('2d')
        domContext.putImageData(shape,0,0)
        this.context.drawImage(dom,dx,dy,canvasConfig.width,canvasConfig.height)
        dom.remove()
    }


    compositeShapeList(shapeList: ImageData[]) {
        for(let i=0; i < shapeList.length; i++) {
            this.compositeShape(shapeList[i],0,0)
        }
    }

    /**
     * @description: 当前点击元素坐标 
     * @param {*} e
     * @return {*}
     */    
    hitCurrentCoordinate = (e) => {     
        return this.currentHitCoordinate = {
            x: e.clientX - this.canvas.offsetLeft,
            y: e.clientY - this.canvas.offsetTop
        }
    }

    clearCanvas(){
        this.context.clearRect(0,0,canvasConfig.width,canvasConfig.height)
    }

    getCurrentImageData(){
        return this.context.getImageData(0,0,canvasConfig.width,canvasConfig.height)
    }

    getImageData() {
        return this.context.getImageData(0,0,canvasConfig.width,canvasConfig.height)
    }

    
}
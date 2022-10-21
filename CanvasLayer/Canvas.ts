import {Coordinate}  from '../jcanvas/interface'
export class Canvas {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    currentHitCoordinate: Coordinate

    constructor(canvas: HTMLCanvasElement, compositeType: GlobalCompositeOperation) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.context.globalCompositeOperation = compositeType
    }

    // 合成2cluster
    compositeShape(shape:ImageData, dx:number,dy:number) {    
        const dom = document.createElement('canvas')
        dom.width = 1200
        dom.height = 850
        const domContext:CanvasRenderingContext2D = dom.getContext('2d')
        domContext.putImageData(shape,0,0)
        this.context.drawImage(dom,dx,dy,1200,850)
        dom.remove()
    }


    compositeShapeList(shapeList: ImageData[]) {
        for(let i=0; i < shapeList.length; i++) {
            this.compositeShape(shapeList[i],0,0)
        }
    }

    hitCurrentCoordinate = (e) => {     
        return this.currentHitCoordinate = {
            x: e.clientX - this.canvas.offsetLeft,
            y: e.clientY - this.canvas.offsetTop
        }
    }

    // TODO 替换
    clearCanvas(){
        this.context.clearRect(0,0,1200,850)
    }

    getCurrentImageData(){
        return this.context.getImageData(0,0,1200,850)
    }

    translateShape(x:number, y:number) {
        this.context.translate(x,y)
    }
}
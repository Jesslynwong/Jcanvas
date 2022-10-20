export class Canvas {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, compositeType: GlobalCompositeOperation) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.context.globalCompositeOperation = compositeType
    }

    compositeShape(shape:ImageData) {
        const dom = document.createElement('canvas')
        dom.width = 1200
        dom.height = 850
        const domContext:CanvasRenderingContext2D = dom.getContext('2d')
        domContext.putImageData(shape,0,0)
        this.context.drawImage(dom,0,0,1200,850)
        dom.remove()
    }
}
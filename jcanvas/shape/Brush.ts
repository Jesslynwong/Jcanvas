// switch不同的形状对应不同的方法 
import {JcanvasType} from '../interface'
import  Line  from './Line'

export class Brush extends Line{
    canvas:HTMLCanvasElement
    style: JcanvasType
    
    constructor( canvas:HTMLCanvasElement, style:JcanvasType ) {
        super(canvas, style)
        this.canvas = canvas
        this.style = style        
    }

    registryEvents(){        
        //单独掉方法，this指向window, 用了实例化方法当作 event handler,bind了之后出现多个不同
        this.canvas.addEventListener('mousedown', this.start)
        this.canvas.addEventListener('mousemove', this.draw)
        this.canvas.addEventListener('mouseup', this.stop)
    }

    destroyEvents() {                
        this.canvas.removeEventListener('mousedown', this.start)
        this.canvas.removeEventListener('mousemove', this.draw)
        this.canvas.removeEventListener('mouseup', this.stop)
    }

    // handleEvent = (name) => (event) => {
    //        this.allShapes.forEach((shape) => {
    //          // 获取当前事件的所有监听者
    //          const listerns = shape.listenerMap.get(name)
    //          if ( listerns ) {
    //            listerns.forEach((listener) => listener(event))
    //          }
    //        })
    //      }
    // }
     
    
}
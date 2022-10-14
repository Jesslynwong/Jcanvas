import {JcanvasType} from './interface'
import Brush from './Brush'

export  function Jcanvas():void {}
declare global {  //设置全局属性
    interface Window {  //window对象属性
         //加入对象
        Jcanvas: any;
    }
}
// 区别当前方法
export class Canvas {
    special: object

    constructor(special:object) {
        this.special = special
    }
} 

// 挂载方法
Jcanvas.Brush = Brush
Jcanvas.Canvas = Canvas

window.Jcanvas = Jcanvas



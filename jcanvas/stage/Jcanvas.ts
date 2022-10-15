
export class Jcanvas {
    allShapes: object[]
   

    constructor() {
        this.allShapes = []
    }

    // 查看allshape上一个里面是什么，是的话直接把上一个splice掉，清除事件
    add(shape: any){
        if (this.allShapes.length !== 0) {
            const prevShape:any = this.allShapes.pop()
            prevShape.destroyEvents()
        } 
        this.allShapes.push(shape)
        console.log(shape);
        console.log(this.allShapes);
        shape.registryEvents()
    }
} 

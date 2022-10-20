export default class Shape {
    listenerMap: Map<string, any> 

    contructor() {
        this.listenerMap = new Map()
    }

    on(eventName:string, fn:(args: any) => void) {
        if (this.listenerMap.has(eventName)) {
            this.listenerMap.get(eventName).push(fn)
        } else {
            this.listenerMap.set(eventName, [fn])
        }
    }

}
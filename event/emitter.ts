
class EventDispatcher {
    listenMap: Map<string, any>

    constructor() {
        this.listenMap = new Map()
    }
    // TODO fn类型
    on(eventName:string, fn:(args:any) => void) {
        if (this.listenMap.has(eventName)) {
            this.listenMap.get(eventName).push(fn)
        } else{
            this.listenMap.set(eventName, [fn])
        }
    }

    emit(eventName:string) {
        const eventList = this.listenMap.get(eventName)
        eventList.map((fn) => {
            fn()
        })
    }
}

export const eventDispatcher = new EventDispatcher()


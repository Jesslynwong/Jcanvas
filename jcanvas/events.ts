import { EventEmitter } from 'events';

// 发布订阅模式
const event = new EventEmitter();

// 事件
export const globalEvent = {
    onMouseDown: function(fn: any) {
        event.on('mouseDown', fn)
    },
    onMouseMove: function(fn:any) {
        event.on('mouseMove', fn)
    },
    onMouseUp: function(fn:any) {
        event.on('mouseUp', fn)
    },

    offMouseDown: function(fn: any) {
        event.off('mouseDown', fn)
    },
    offMouseMove: function(fn:any) {
        event.off('mouseMove', fn)
    },
    offMouseUp: function(fn:any) {
        event.off('mouseUp', fn)
    }

}
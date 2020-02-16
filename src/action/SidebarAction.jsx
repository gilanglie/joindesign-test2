import {INIT_CANVAS, INIT_TEXT} from './type';
export const initCanvas = (data) => {
    return {
        type: INIT_CANVAS,
        payload: data
    }
}
export const initText = (data) => {
    return {
        type: INIT_TEXT,
        payload: data
    }
}
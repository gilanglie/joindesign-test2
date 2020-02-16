import {INIT_CANVAS, INIT_TEXT} from '../action/type';
const initialState = {
    canvasData : {},
    textData : {}
}
export default (state = initialState, action) => {
    switch(action.type){
        case INIT_CANVAS:
            return {
                ...state,
                canvasData: action.payload,
            }
        case INIT_TEXT:
            return {
                ...state,
                textData: action.payload,
            }
        default:
            return state
    }
}
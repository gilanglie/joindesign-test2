import {combineReducers} from 'redux'
import mainReducer from './mainReducer';
const rootReducer = combineReducers({
    data : mainReducer
})

export default rootReducer

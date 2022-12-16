import { userReducer } from './users/userReducer'
import {songsReducer} from './generic/reducer'
import {combineReducers} from 'redux'
export default combineReducers({
    user: userReducer,
    songs: songsReducer
})
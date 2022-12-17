import { FETCH_SONGS_SUCCESS, FETCH_SONGS_FALIURE, FETCH_SONGS} from "./actionType"

const initialState = {
}
export const songsReducer = (state=(initialState), action)=>{
    switch(action.type){
        case FETCH_SONGS_SUCCESS: console.log(action.payload);
                                return {
               ...state, ...action.payload
            }
        case FETCH_SONGS_FALIURE: return {
            ...state, error:action.payload
        }
        default: return state;
    }
}
import { FETCH_SONGS_SUCCESS, FETCH_SONGS_FALIURE, FETCH_SONGS} from "./actionType"

const initialState = {
    loading: false,
    songs:[],
    error:''
}
export const playlistReducer = (state=(initialState), action)=>{
    switch(action.type){
        case FETCH_SONGS_SUCCESS:
                                return {
               ...state, usersongss:action.payload
            }
        case FETCH_SONGS_FALIURE: return {
            ...state, error:action.payload
        }
        default: return state;
    }
}
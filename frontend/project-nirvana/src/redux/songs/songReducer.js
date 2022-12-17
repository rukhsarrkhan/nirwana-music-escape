import { FETCH_SONG_TO_PLAY_SUCCESS, FETCH_SONG_TO_PLAY_FALIURE, FETCH_SONG_TO_PLAY} from "./songActionTypes"

const initialState = {
}
export const playerReducer = (state=(initialState), action)=>{
    switch(action.type){
        case FETCH_SONG_TO_PLAY_SUCCESS: console.log(action.payload);
                                return {
               ...state, playerSong:action.payload
            }
        case FETCH_SONG_TO_PLAY_FALIURE: return {
            ...state, error:action.payload
        }
        default: return state;
    }
}
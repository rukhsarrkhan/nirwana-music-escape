import { FETCH_PLAYLIST_SUCCESS, FETCH_PLAYLIST_FALIURE, FETCH_PLAYLIST} from "./PlaylistActionTypes"

const initialState = {
    loading: false,
    playlists:[],
    error:''
}
export const playlistReducer = (state=(initialState), action)=>{
    switch(action.type){

        case FETCH_PLAYLIST_SUCCESS: console.log(action.payload);
                                return {
               ...state, playlists:action.payload
            }
        case FETCH_PLAYLIST_FALIURE: return {
            ...state, error:action.payload
        }
        default: return state;
    }
}
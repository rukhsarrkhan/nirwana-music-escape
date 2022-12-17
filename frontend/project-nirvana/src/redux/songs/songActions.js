import axios from 'axios'
import { FETCH_SONG_TO_PLAY_SUCCESS, FETCH_SONG_TO_PLAY_FALIURE, FETCH_SONG_TO_PLAY} from "./songActionTypes"
export const fetchSongToPlay=()=>{
    return{
        type: FETCH_SONG_TO_PLAY
    }
}
export const fetchSongToPlaySuccess=(songs)=>{
    return{
        type: FETCH_SONG_TO_PLAY_SUCCESS,
        payload: songs
    }
}

export const fetchSongToPlayFaliure=(error)=>{
    return { type: FETCH_SONG_TO_PLAY_FALIURE,
        payload: error
}}

export const fetchSongToPlayAPICall=(_id)=>{
    return async (dispatch)=>{
        dispatch(fetchSongToPlay())
        try {
            let resp = await axios.get('http://localhost:3000/songs/'+_id)
            dispatch(fetchSongToPlaySuccess(resp.data))
        } catch (error) {
            console.log(error)
        }
    }
}
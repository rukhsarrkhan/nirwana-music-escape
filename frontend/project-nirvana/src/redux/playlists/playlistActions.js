import axios from 'axios'
import { FETCH_PLAYLIST_SUCCESS, FETCH_PLAYLIST_FALIURE, FETCH_PLAYLIST} from "./actionType"
export const fetchPlaylists=()=>{
    return{
        type: FETCH_PLAYLIST
    }
}
export const fetchPlaylistsSuccess=(songs)=>{
    return{
        type: FETCH_PLAYLIST_SUCCESS,
        payload: songs
    }
}

export const fetchPlaylistsFaliure=(error)=>{
    return { type: FETCH_PLAYLIST_FALIURE,
        payload: error
}}

export const fetchPlaylistsAPICall=()=>{
    return async (dispatch)=>{
        dispatch(fetchPlaylists())
        try {
          //  let resp = await axios.get('https://jsonplaceholder.typicode.com/songs')
            dispatch(fetchPlaylistsSuccess("resp.data"))
        } catch (error) {
            console.log(error)
        }
    }
}
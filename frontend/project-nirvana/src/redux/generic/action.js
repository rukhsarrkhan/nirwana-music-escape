import axios from 'axios';
import { FETCH_SONGS_SUCCESS, FETCH_SONGS_FALIURE, FETCH_SONGS } from "./actionType";
export const fetchSongs = () => {
    return {
        type: FETCH_SONGS
    };
};
export const fetchSongsSuccess = (songs) => {
    return {
        type: FETCH_SONGS_SUCCESS,
        payload: songs
    };
};

export const fetchSongsFaliure = (error) => {
    return {
        type: FETCH_SONGS_FALIURE,
        payload: error
    };
};

export const fetchSongsAPICall = () => {
    return async (dispatch) => {
        dispatch(fetchSongs());
        try {
            let resp = await axios.get('http://localhost:3000/songs?sort_by=genre');
            dispatch(fetchSongsSuccess(resp.data));
        } catch (error) {
            console.log(error);
        }
    };
};
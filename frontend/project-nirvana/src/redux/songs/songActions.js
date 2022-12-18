import axios from 'axios';
import { FETCH_SONG_TO_PLAY_SUCCESS, FETCH_SONG_TO_PLAY_FALIURE, FETCH_SONG_TO_PLAY, UPLOAD_SONG, UPLOAD_SONG_FAILURE, UPLOAD_SONG_SUCCESS } from "./songActionTypes";

export const fetchSongToPlay = () => {
    return {
        type: FETCH_SONG_TO_PLAY
    };
};

export const fetchSongToPlaySuccess = (songs) => {
    return {
        type: FETCH_SONG_TO_PLAY_SUCCESS,
        payload: songs
    };
};

export const fetchSongToPlayFaliure = (error) => {
    return {
        type: FETCH_SONG_TO_PLAY_FALIURE,
        payload: error
    };
};

export const uploadSong = () => {
    return {
        type: UPLOAD_SONG
    };
};

export const uploadSongSuccess = (song) => {
    return {
        type: UPLOAD_SONG_SUCCESS,
        payload: song
    };
};

export const uploadSongFailure = (error) => {
    return {
        type: UPLOAD_SONG_FAILURE,
        payload: error
    };
};


export const fetchSongToPlayAPICall = (_id) => {
    return async (dispatch) => {
        dispatch(fetchSongToPlay());
        try {
            let resp = await axios.get('http://localhost:3000/songs/' + _id);
            dispatch(fetchSongToPlaySuccess(resp.data));
        } catch (error) {
            console.log(error);
        }
    };
};


export const uploadAPISongCall = (obj) => {
    return async (dispatch) => {
        dispatch(uploadSong());
        try {
            let resp = await axios.post('http://localhost:3000/songs', obj);
            dispatch(uploadSongSuccess(resp.data));
        } catch (error) {
            dispatch(uploadSongFailure(error));

        }
    };
};
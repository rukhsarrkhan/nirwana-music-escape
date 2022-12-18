import { FETCH_SONG_TO_PLAY_SUCCESS, FETCH_SONG_TO_PLAY_FALIURE, FETCH_SONG_TO_PLAY, UPLOAD_SONG, UPLOAD_SONG_FAILURE, UPLOAD_SONG_SUCCESS } from "./songActionTypes";

const initialState = {
    playerSong: [],
    songUploadData: {},
    songUploadError: '',
    status: ''
};
export const playerReducer = (state = (initialState), action) => {
    switch (action.type) {
        case FETCH_SONG_TO_PLAY_SUCCESS: console.log(action.payload);
            return {
                ...state, playerSong: action.payload
            };
        case FETCH_SONG_TO_PLAY_FALIURE: return {
            ...state, error: action.payload
        };
        case UPLOAD_SONG: return {
            ...state,
        };
        case UPLOAD_SONG_SUCCESS: return {
            ...state, songUploadData: action.payload, songUploadError: "", status: "OK"
        };
        case UPLOAD_SONG_FAILURE: return {
            ...state, songUploadError: action.payload.response.data
        };
        default: return state;
    }
};
import { FETCH_SONGS_SUCCESS, FETCH_SONGS_FALIURE, FETCH_SONGS } from "./actionType";

const initialState = {
};
export const songsReducer = (state = (initialState), action) => {
    switch (action.type) {
        case FETCH_SONGS_SUCCESS:
            return {
                ...state, ...action.payload
            };
        case FETCH_SONGS_FALIURE: return {
            ...state, error: action.payload.response.data
        };
        default: return state;
    }
};
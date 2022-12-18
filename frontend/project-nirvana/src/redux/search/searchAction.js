import { SEARCH_SUCCESS, SEARCH_FALIURE, SEARCH } from "./searchActionType";

export const search = () => {
    return {
        type: SEARCH
    };
};

export const searchSuccess = (songs) => {
    return {
        type: SEARCH_SUCCESS,
        payload: songs
    };
};

export const searchFaliure = (error) => {
    return {
        type: SEARCH_FALIURE,
        payload: error
    };
};

export const makeSearch = (_id) => {
    return async (dispatch) => {
        dispatch(search());
        try {
            dispatch(searchSuccess(_id));
        } catch (error) {
            console.log(error);
        }
    };
};
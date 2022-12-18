import { USER_LOGIN_SUCCESS, USER_LOGIN_FALIURE, USER_LOGOUT, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FALIURE } from "./userActionTypes";

const initialState = {
    userLoggedIn: false,
    loading: false,
    data: {},
    error: '',
    status: ''
};
export const userReducer = (state = (initialState), action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state, userLoggedIn: true, data: action.payload, error: "", status: "OK"
            };
        case USER_LOGIN_FALIURE: return {
            ...state, userLoggedIn: false, error: action.payload.response.data
        };
        case USER_LOGOUT: return {
            ...initialState
        };
        case USER_REGISTER_SUCCESS:
            return {
                ...state, data: action.payload, error: "", status: "OK"
            };
        case USER_REGISTER_FALIURE: return {
            ...state, error: action.payload.response.data
        };
        default: return state;
    }
};
import axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FALIURE, USER_LOGIN, USER_REGISTER_SUCCESS, USER_REGISTER, USER_REGISTER_FALIURE, USER_LOGOUT } from "./userActionTypes";

export const userLogin = () => {
    return {
        type: USER_LOGIN
    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    };
};

export const userLoginSuccess = (user) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: user
    };
};

export const userLoginFailure = (error) => {
    return {
        type: USER_LOGIN_FALIURE,
        payload: error
    };
};

export const userRegister = () => {
    return {
        type: USER_REGISTER
    };
};

export const userRegisterSuccess = (user) => {
    return {
        type: USER_REGISTER_SUCCESS,
        payload: user
    };
};

export const userRegisterFaliure = error => {
    return {
        type: USER_REGISTER_FALIURE,
        payload: error
    };
};

export const userRegistrationAPICall = (obj) => {
    return async (dispatch) => {
        dispatch(userRegister());
        try {
            let resp = await axios.post('http://localhost:3000/register', obj);
            dispatch(userRegisterSuccess(resp.data));
            localStorage.setItem("authToken", resp.data.token);
        } catch (error) {
            dispatch(userRegisterFaliure(error));
        }
    };
};

export const loginUserAPICall = (obj) => {
    return async (dispatch) => {
        dispatch(userLogin());
        try {
            let resp = await axios.post('http://localhost:3000/login', obj);
            dispatch(userLoginSuccess(resp.data));
        } catch (error) {
            dispatch(userLoginFailure(error));

        }
    };
};

export const logoutCall = (obj) => {
    return async (dispatch) => {
        dispatch(userLogout());
        localStorage.removeItem("authToken");
    };
};


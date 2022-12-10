import { USER_LOGIN_SUCCESS, USER_LOGIN_FALIURE, USER_LOGOUT, USER_REGISTER, USER_REGISTER_SUCCESS, USER_REGISTER_FALIURE } from "./userActionTypes"

const initialState = {
    loading: false,
    users:[],
    user:{},
    error:'',
    userName:'',
    password:'',
    firstName:''
}
export const userReducer = (state=(initialState), action)=>{
    switch(action.type){
        case USER_LOGIN_SUCCESS: console.log(action.payload);
                                return {
               ...state, users:action.payload
            }
        case USER_LOGIN_FALIURE: return {
            ...state, userLoggedIn: false, error:action.payload
        }
        case USER_LOGOUT: return {
            ...initialState
        }
        case USER_REGISTER_SUCCESS: console.log(action.payload);
        return {
        ...state, user:action.payload
        }
        case USER_REGISTER_FALIURE: return {
        ...state, userLoggedIn: false, error:action.payload
        }
        default: return state;
    }
}
import axios from 'axios'
import { USER_LOGIN_SUCCESS, USER_LOGIN_FALIURE, USER_LOGIN, USER_REGISTER_SUCCESS, USER_REGISTER, USER_REGISTER_FALIURE } from "./userActionTypes"
export const userLogin=()=>{
    return{
        type: USER_LOGIN
    }
}
export const userLoginSuccess=(user)=>{
    return{
        type: USER_LOGIN_SUCCESS,
        payload: user
    }
}

export const userLoginFaliure=(error)=>{
    return { type: USER_LOGIN_FALIURE,
        payload: error
}}
export const userRegister = ()=>{
    return {
        type: USER_REGISTER
    }
}
export const userRegisterSuccess=(user)=>{
    return{
        type: USER_REGISTER_SUCCESS,
        payload: user
    }
}
export const userRegisterFaliure= error =>{
    return {
        type: USER_REGISTER_FALIURE,
        payload: error
    }
}
export const userRegistrationAPICall =(obj)=>{
    return async (dispatch)=>{
        dispatch(userRegister())
        try { 
            console.log()
            let resp = await axios.post('http://localhost:3000/register', obj)
            console.log(resp)
            dispatch(userRegisterSuccess(resp.data))
            localStorage.setItem("authToken",resp.data.token)
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchUsers=()=>{
    return async (dispatch)=>{
        dispatch(userLogin())
        try {
            let resp = await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch(userLoginSuccess(resp.data))
        } catch (error) {
            console.log(error)
        }
    }
}
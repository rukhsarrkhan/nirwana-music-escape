import { SEARCH_SUCCESS, SEARCH_FALIURE, SEARCH} from "./searchActionType"

const initialState = {
    searchData:""
}
export const  searchReducer = (state=(initialState), action)=>{
    switch(action.type){
        case SEARCH_SUCCESS:
                                return {
               ...state, searchData: action.payload
            }
        case SEARCH_FALIURE: return {
            ...state, error:action.payload
        }
        default: return state;
    }
}
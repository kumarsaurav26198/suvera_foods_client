import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
};


export const loginReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.LOGIN_REQUEST:
            // console.warn("LOGIN_REQUEST Reducers", ActionTypes.LOGIN_REQUEST);
            // console.log("LOGIN_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.LOGIN_REQUEST_SUCCESS:
            // console.warn("LOGIN_REQUEST_SUCCESS Reducers", ActionTypes.LOGIN_REQUEST_SUCCESS);
            // console.warn("LOGIN_REQUEST_SUCCESS Reducers action===>", action.currentUser);
            return {
                ...state,
                data:action.loginRes,
                loading: false,
            };
        case ActionTypes.LOGIN_REQUEST_FAILURE:
            // console.warn("LOGIN_REQUEST_FAILURE Reducers", ActionTypes.LOGIN_REQUEST_FAILURE);
            // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
   
        case ActionTypes.LOG_OUT_REQUEST:
            console.warn("LOG_OUT_REQUEST Reducers", ActionTypes.LOG_OUT_REQUEST);
            // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action);
            return {
                ...state,
                data:null,
                loading: false,
                // error: action.payload,
            };
        default:
            return state;
    }
};
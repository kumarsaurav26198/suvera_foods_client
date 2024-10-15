import { ActionTypes } from "../Constants/ActionTypes";
const initialState = {
    data: [],
    loading: false,
    error: null,
};
export const verifyReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.VERIFY_REQUEST:
            // console.warn("VERIFY_REQUEST Reducers", ActionTypes.VERIFY_REQUEST);
            // console.log("VERIFY_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.VERIFY_REQUEST_SUCCESS:
            // console.warn("VERIFY_REQUEST_SUCCESS Reducers", ActionTypes.VERIFY_REQUEST_SUCCESS);
            // console.warn("VERIFY_REQUEST_SUCCESS Reducers action===>", action);
            return {
                ...state,
                data:action?.verifyRes,
                loading: false,
            };
        case ActionTypes.VERIFY_REQUEST_FAILURE:
            // console.warn("VERIFY_REQUEST_FAILURE Reducers", ActionTypes.VERIFY_REQUEST_FAILURE);
            // console.log("VERIFY_REQUEST_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
            case ActionTypes.RESTART_LOGIN_REQUEST:
                // console.warn("RESTART_LOGIN_REQUEST Reducers", ActionTypes.RESTART_LOGIN_REQUEST);
                // console.log("RESTART_LOGIN_REQUEST Reducers action===>");
                return {
                    ...state,
                    loading: false,
                    error: null,
                };
        case ActionTypes.LOG_OUT_REQUEST:
            console.warn("LOG_OUT_REQUEST Reducers", ActionTypes.LOG_OUT_REQUEST);
            // console.log("VERIFY_REQUEST_FAILURE Reducers action===>", action);
            return {
                ...state,
                data:[],
                loading: false,
                // error: action.payload,
            };
        default:
            return state;
    }
};
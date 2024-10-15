
import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
    address: [],
    addressloading: false,
    addresserror: null,
};


export const userLocationReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.CHECK_LOCATION_REQUEST:
            // console.warn("CHECK_LOCATION_REQUEST Reducers", ActionTypes.CHECK_LOCATION_REQUEST);
            // console.log("CHECK_LOCATION_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.CHECK_LOCATION_SUCCESS:
            // console.warn("CHECK_LOCATION_SUCCESS Reducers", ActionTypes.CHECK_LOCATION_SUCCESS);
            // console.warn("CHECK_LOCATION_SUCCESS Reducers action===>", action);
            return {
                ...state,
                data:action.loginRes,
                loading: false,
            };
        case ActionTypes.CHECK_LOCATION_FAILURE:
            // console.warn("CHECK_LOCATION_FAILURE Reducers", ActionTypes.CHECK_LOCATION_FAILURE);
            // console.log("CHECK_LOCATION_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
            case ActionTypes.GET_LOCATION_REQUEST:
                // console.warn("GET_LOCATION_REQUEST Reducers", ActionTypes.CHECK_LOCATION_REQUEST);
                // console.log("GET_LOCATION_REQUEST Reducers action===>", action.payload);
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
                case ActionTypes.GET_LOCATION_REQUEST:
                    // console.warn("GET_LOCATION_REQUEST Reducers", ActionTypes.FETCH_USERPROFILE_REQUEST);
                    // console.log("GET_LOCATION_REQUEST Reducers action===>", action.payload);
                    return {
                        ...state,
                        addressloading: true,
                        addresserror: null,
                    };
                case ActionTypes.GET_LOCATION_SUCCESS:
                    // console.warn("GET_LOCATION_SUCCESS Reducers", ActionTypes.FETCH_USERPROFILE_SUCCESS);
                    // console.warn("GET_LOCATION_SUCCESS Reducers action===>", JSON.stringify(action?.responseData?.data,null,2));
                    return {
                        ...state,
                        address:action?.responseData?.data,
                        addressloading: false,
                    };
                case ActionTypes.GET_LOCATION_FAILURE:
                    // console.warn("GET_LOCATION_FAILURE Reducers", ActionTypes.FETCH_USERPROFILE_FAILURE);
                    // console.log("GET_LOCATION_FAILURE Reducers action===>", action.error);
                    return {
                        ...state,
                        addressloading: false,
                        addresserror: action.error,
                    };
                    case ActionTypes.LOG_OUT_REQUEST:
                        console.warn("LOG_OUT_REQUEST  reacmove addressReducers", ActionTypes.LOG_OUT_REQUEST);
                        // console.log("LOGIN_REQUEST_FAILURE Reducers action===>", action);
                        return {
                            ...state,
                            data:[],
                            loading: false,
                            error: null,
                            address: [],
                            addressloading: false,
                            addresserror: null,
                        };
        default:
            return state;
    }
};
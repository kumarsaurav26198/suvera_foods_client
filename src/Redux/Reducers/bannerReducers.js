import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
export const bannnerReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_BANNER_REQUEST:
            // console.warn("FETCH_BANNER_REQUEST Reducers", ActionTypes.FETCH_BANNER_REQUEST);
            // console.log("FETCH_BANNER_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_BANNER_SUCCESS:
            // console.warn("FETCH_BANNER_SUCCESS Reducers", ActionTypes.FETCH_BANNER_SUCCESS);
            // console.log("FETCH_BANNER_SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action?.responseData,
                loading: false,
            };
        case ActionTypes.FETCH_BANNER_FAILURE:
            // console.warn("FETCH_BANNER_FAILURE Reducers", ActionTypes.FETCH_BANNER_FAILURE);
            // console.log("FETCH_BANNER_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action?.error,
            };
        default:
            return state;
    }
};
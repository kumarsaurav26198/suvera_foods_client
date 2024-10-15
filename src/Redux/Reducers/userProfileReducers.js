
import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
};


export const userProfileReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_USERPROFILE_REQUEST:
            // console.warn("FETCH_USERPROFILE_REQUEST Reducers", ActionTypes.FETCH_USERPROFILE_REQUEST);
            // console.log("FETCH_USERPROFILE_REQUEST Reducers action===>", action.payload);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_USERPROFILE_SUCCESS:
            // console.warn("FETCH_USERPROFILE_SUCCESS Reducers", ActionTypes.FETCH_USERPROFILE_SUCCESS);
            // console.warn("FETCH_USERPROFILE_SUCCESS Reducers action===>", action?.responseData);
            return {
                ...state,
                data:action?.responseData,
                loading: false,
            };
        case ActionTypes.FETCH_USERPROFILE_FAILURE:
            // console.warn("FETCH_USERPROFILE_FAILURE Reducers", ActionTypes.FETCH_USERPROFILE_FAILURE);
            // console.log("FETCH_USERPROFILE_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
      
        default:
            return state;
    }
};
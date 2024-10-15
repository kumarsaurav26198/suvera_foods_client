import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  

export const categoriesReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_CATEGORIES_REQUEST:
            // console.warn("FETCH_CATEGORIES_REQUEST Reducers", ActionTypes.FETCH_CATEGORIES_REQUEST);
            // console.log("FETCH_CATEGORIES_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_CATEGORIES_SUCCESS:
            // console.warn("FETCH_CATEGORIES_SUCCESS Reducers", ActionTypes.FETCH_CATEGORIES_SUCCESS);
            // console.log("FETCH_CATEGORIES_SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action?.responseData,
                loading: false,
            };
        case ActionTypes.FETCH_CATEGORIES_FAILURE:
            // console.warn("FETCH_CATEGORIES_FAILURE Reducers", ActionTypes.FETCH_CATEGORIES_FAILURE);
            console.log("FETCH_CATEGORIES_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action?.error,
            };
        default:
            return state;
    }
};
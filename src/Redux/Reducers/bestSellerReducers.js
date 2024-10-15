import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  

export const bestSellerReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.FETCH_BESTSELLER_REQUEST:
            // console.warn("FETCH_BESTSELLER_REQUEST Reducers", ActionTypes.FETCH_BESTSELLER_REQUEST);
            // console.log("FETCH_BESTSELLER_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FETCH_BESTSELLER_SUCCESS:
            // console.warn("FETCH_BESTSELLER_SUCCESS Reducers", ActionTypes.FETCH_BESTSELLER_SUCCESS);
            // console.log("FETCH_BESTSELLER_SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action?.responseData,
                loading: false,
            };
        case ActionTypes.FETCH_BESTSELLER_FAILURE:
            // console.warn("FETCH_BESTSELLER_FAILURE Reducers", ActionTypes.FETCH_BESTSELLER_FAILURE);
            // console.log("FETCH_BESTSELLER_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action?.error,
            };
        default:
            return state;
    }
};
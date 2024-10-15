
import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const productByIDReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.PRODUCT_BYID__REQUEST:
            // console.warn("PRODUCT_BYID__REQUEST Reducers", ActionTypes.PRODUCT_BYID__REQUEST);
            // console.log("PRODUCT_BYID__REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.PRODUCT_BYID__SUCCESS:
            // console.warn("PRODUCT_BYID__SUCCESS Reducers", ActionTypes.PRODUCT_BYID__SUCCESS);
            // console.log("PRODUCT_BYID__SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action.responseData,
                loading: false,
            };
        case ActionTypes.PRODUCT_BYID__FAILURE:
            // console.warn("PRODUCT_BYID__FAILURE Reducers", ActionTypes.PRODUCT_BYID__FAILURE);
            // console.log("PRODUCT_BYID__FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
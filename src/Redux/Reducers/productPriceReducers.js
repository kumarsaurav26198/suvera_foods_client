import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const productPriceReducers = (state = initialState, action) => {
    switch (action.type)
    {
        case ActionTypes.PRODUCT_PRICE_REQUEST:
            // console.warn("PRODUCT_PRICE_REQUEST Reducers", ActionTypes.PRODUCT_PRICE_REQUEST);
            // console.log("PRODUCT_PRICE_REQUEST Reducers action===>", action);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.PRODUCT_PRICE_SUCCESS:
            // console.warn("PRODUCT_PRICE_SUCCESS Reducers", ActionTypes.PRODUCT_PRICE_SUCCESS);
            // console.log("PRODUCT_PRICE_SUCCESS Reducers action===>", action.responseData);
            return {
                ...state,
                data: action?.responseData,
                loading: false,
            };
        case ActionTypes.PRODUCT_PRICE_FAILURE:
            // console.warn("PRODUCT_PRICE_FAILURE Reducers", ActionTypes.PRODUCT_PRICE_FAILURE);
            // console.log("PRODUCT_PRICE_FAILURE Reducers action===>", action.error);
            return {
                ...state,
                loading: false,
                error: action?.error,
            };
        default:
            return state;
    }
};
import { ActionTypes } from "../Constants/ActionTypes";

const initialState = {
  data: [], 
  applyingdata: null, // Initially null or an empty object, can't reference action here
  loading: false,
  applyLoading: false,
  error: null,
  applyError: null,
};

export const couponReducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COUPON_REQUEST:
      // console.warn("FETCH_COUPON_REQUEST Reducers", ActionTypes.FETCH_COUPON_REQUEST);
      // console.log("FETCH_COUPON_REQUEST Reducers action===>", action);
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionTypes.FETCH_COUPON_SUCCESS:
      // console.warn("FETCH_COUPON_SUCCESS Reducers", ActionTypes.FETCH_COUPON_SUCCESS);
      // console.log("FETCH_COUPON_SUCCESS Reducers action===>", action.responseData);
      return {
        ...state,
        data: action?.responseData, // Access responseData from action
        loading: false,
      };

    case ActionTypes.FETCH_COUPON_FAILURE:
      // console.warn("FETCH_COUPON_FAILURE Reducers", ActionTypes.FETCH_COUPON_FAILURE);
      // console.log("FETCH_COUPON_FAILURE Reducers action===>", action.error);
      return {
        ...state,
        loading: false,
        error: action?.error, // Correctly handle the error
      };

    case ActionTypes.APPLY_COUPON_REQUEST:
      // console.warn("APPLY_COUPON_REQUEST Reducers", ActionTypes.APPLY_COUPON_REQUEST);
      // console.log("APPLY_COUPON_REQUEST Reducers action===>", action);
      return {
        ...state,
        applyLoading: true,
        applyError: null,
      };

    case ActionTypes.APPLY_COUPON_SUCCESS:
      // console.warn("APPLY_COUPON_SUCCESS Reducers", ActionTypes.APPLY_COUPON_SUCCESS);
      // console.log("APPLY_COUPON_SUCCESS Reducers action===>", action?.responseData);
      return {
        ...state,
        applyingdata: action?.responseData, // Set the applying coupon data from the action payload
        applyLoading: false,
        applyError: null,
      };

    case ActionTypes.APPLY_COUPON_FAILURE:
      // console.warn("APPLY_COUPON_FAILURE Reducers", ActionTypes.APPLY_COUPON_FAILURE);
      // console.log("APPLY_COUPON_FAILURE Reducers action===>", action.payload);
      return {
        ...state,
        applyLoading: false,
        applyError: action?.error, // Properly handle the error (use action.error)
      };

    default:
      return state;
  }
};

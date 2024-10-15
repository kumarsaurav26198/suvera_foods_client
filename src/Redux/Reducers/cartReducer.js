import { ActionTypes } from '../Constants/ActionTypes';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case ActionTypes.FETCH_CART_REQUEST:
      // console.warn("FETCH_CART_REQUEST Reducers", ActionTypes.FETCH_CART_REQUEST);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.FETCH_CART_SUCCESS:
      // console.warn("FETCH_CART_SUCCESS Reducers",  action?.responseData?.cart?.paymentMethod);

      return {
        ...state,
        loading: false,
        cartItems: action?.responseData,
      };
    case ActionTypes.FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };

    // Handle add to cart actions
    case ActionTypes.ADD_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.ADD_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.ADD_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };

    // Handle remove from cart actions
    case ActionTypes.REMOVE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.REMOVE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.REMOVE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    case ActionTypes.UPDATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.UPDATE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    case ActionTypes.LOG_OUT_REQUEST:
      console.log("LOG_OUT_REQUEST remove cart")
      return {
        ...state,
        cartItems:null,
        loading: false,
        // error: action.payload,
    };

    default:
      return state;
  }
};

export default cartReducer;

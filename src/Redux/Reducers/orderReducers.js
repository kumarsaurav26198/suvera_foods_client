import { ActionTypes } from '../Constants/ActionTypes';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const orderReducers = (state = initialState, action) => {
  switch (action.type)
  {
    case ActionTypes.FETCH_ORDER_REQUEST:
      console.warn("FETCH_ORDER_REQUEST Reducers", ActionTypes.FETCH_ORDER_REQUEST);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.responseData,
      };
    case ActionTypes.FETCH_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    default:
      return state;
  }
};

export default orderReducers;

import {ActionTypes} from '../Constants/ActionTypes';

export const addToCart = payload => ({
  type: ActionTypes.ADD_CART_REQUEST,
  payload,
});
export const removeFromCart = payload => ({
  type: ActionTypes.REMOVE_CART_REQUEST,
  payload,
});
export const fetchCart = payload => ({
  type: ActionTypes.FETCH_CART_REQUEST,
  payload,
});
export const fetchCoupon =() => ({
  type: ActionTypes.FETCH_COUPON_REQUEST,
});
export const applyCouponRequest = (payload) => ({
  type: ActionTypes.APPLY_COUPON_REQUEST,
  payload
});
export const upadteCartQuantity = payload => ({
  type: ActionTypes.UPDATE_CART_REQUEST,
  payload,
});

export const fetchOrder = payload => ({
  type: ActionTypes.FETCH_ORDER_REQUEST,
  payload,
});
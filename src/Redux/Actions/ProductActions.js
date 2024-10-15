import {ActionTypes} from '../Constants/ActionTypes';

export const ProductsWithPricing = payload => ({
  type: ActionTypes.PRODUCT_PRICE_REQUEST,
  payload,
});

export const ProductByID = payload => ({
  type: ActionTypes.PRODUCT_BYID__REQUEST,
  payload,
});


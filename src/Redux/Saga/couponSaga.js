// 

import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';

import { ActionTypes } from '../Constants/ActionTypes';

function* fetchCouponApiCalls() {
  try
  {
    const url = baseURL + apiUri.common.allCoupons;
    // console.log("allCoupons url",url)
    const response = yield call(axios.get, url);
    const responseData = response?.data;
    yield put({ type: ActionTypes.FETCH_COUPON_SUCCESS, responseData });
  } catch (error)
  {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      // Strip out non-serializable parts like headers and request
      response: error?.response ? {
        status: error.response.status,
        data: error.response.data,
        // Remove non-serializable parts
        config: {
          method: error.response.config?.method,
          url: error.response.config?.url,
        },
      } : null,
    };

    
    yield put({ type: ActionTypes.FETCH_COUPON_FAILURE, error:errorPayload });
  }
}
function* applyCouponApiCalls(action) {
  const { authToken, couponId } = action?.payload; // Extract authToken and couponId from action
  const url = `${baseURL}${apiUri.common.applyCoupon}`; // API endpoint URL
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`, 
  };
  const data = {
    couponId,
  };

  // Debugging logs (optional)
  // console.log("applyCoupon URL:", url);
  // console.log("headers:", headers);
  // console.log("data:", data);

  try {
    // Make POST request to apply the coupon
    const response = yield call(axios.post, url, data, { headers });
    const responseData = response?.data;

    // Log and dispatch success action with response data
    console.log('applyCoupon responseData:',);
    yield put({ type: ActionTypes.APPLY_COUPON_SUCCESS, responseData });
    const payload = {
      authToken:authToken
    }
    yield put({type: ActionTypes.FETCH_CART_REQUEST,payload: {authToken}});
  } catch (error) {
    // Handle errors and log the issue
    console.error('Error applying coupon:', error?.response?.status, error?.response?.data);

    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      response: error?.response ? {
        status: error.response.status,
        data: error.response.data,
        config: {
          method: error.response.config?.method,
          url: error.response.config?.url,
        },
      } : null,
    };

    // Dispatch failure action with error payload
    yield put({ type: ActionTypes.APPLY_COUPON_FAILURE, error: errorPayload });
  }
}
function* couponSaga() {
  yield takeEvery(ActionTypes.FETCH_COUPON_REQUEST, fetchCouponApiCalls);
  yield takeEvery(ActionTypes.APPLY_COUPON_REQUEST, applyCouponApiCalls);
}
export default couponSaga;
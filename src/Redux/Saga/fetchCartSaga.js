import {takeEvery, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {apiUri, baseURL} from '../../services/apiEndPoints.js';
import {ActionTypes} from '../Constants/ActionTypes';

function* fetchCartApi(action) {
  const {authToken,refresh} = action?.payload;
  const URL = `${baseURL}${apiUri.cart.getUserCart}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
    "x-requests-app":true,
    "x-refresh-token":refresh
  };
  console.log(" fetchCartApi url=========>>>>>", URL);
  // console.log("headers=========>>>>>", headers);
  try {
    const response = yield axios.get(URL, {headers});
    const responseData = response?.data;
    // console.log(" fetchCartApi responseData ",JSON.stringify(responseData,null,2))
    yield put({type: ActionTypes.FETCH_CART_SUCCESS, responseData});
  } catch (error) {
    const errorPayload = {
      message:
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      // Strip out non-serializable parts like headers and request
      response: error?.response
        ? {
            status: error.response.status,
            data: error.response.data,
            // Remove non-serializable parts
            config: {
              method: error.response.config?.method,
              url: error.response.config?.url,
            },
          }
        : null,
    };
    // console.log(" fetchCartApi error ",JSON.stringify(errorPayload,null,2))

    yield put({
      type: ActionTypes.FETCH_CART_FAILURE,
      error: errorPayload,
    });
  }
}
function* handleAddToCart(action) {
  const {authToken, product, quantity,refresh} = action?.payload;
  const URL = `${baseURL}${apiUri.cart.addCart}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
    "x-requests-app":true,
    "x-refresh-token":refresh
  };
  const data = {
    product: product,
    quantity: quantity,
  };
  console.log("handleAddToCart url=========>>>>>", URL);
  console.log("headers=========>>>>>", JSON.stringify(headers,null,2));
  console.log("data=========>>>>>", data);
  try {
    const response = yield call(axios.post, URL, data, {headers});
    const responseData = response?.data;
    console.log('responseData', responseData);
    yield put({type: ActionTypes.FETCH_CART_REQUEST, payload: {authToken}});
    // yield put({type: ActionTypes.ADD_CART_SUCCESS});
  } catch (error) {
    console.error(
      'Error handleAddToCart cart:',
      error.response?.status,
      error.response?.data,
    );
    yield put({type: ActionTypes.ADD_CART_FAILURE, error});
  }
}

function* handleRemoveCart(action) {
  const {authToken, product} = action?.payload;

  const URL = `${baseURL}${apiUri.cart.remove}${product}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  // console.log("headers =======>",headers)

  // console.log(" handleRemoveCart url=========>>>>>", URL);
  try {
    const response = yield call(axios.delete, URL, {headers});
    const responseData = response?.data;
    // yield put({type: ActionTypes.UPDATE_CART_SUCCESS});
    yield put({type: ActionTypes.FETCH_CART_REQUEST, payload: {authToken}});
  } catch (error) {
    const errorPayload = {
      message:
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      // Strip out non-serializable parts like headers and request
      response: error?.response
        ? {
            status: error.response.status,
            data: error.response.data,
            // Remove non-serializable parts
            config: {
              method: error.response.config?.method,
              url: error.response.config?.url,
            },
          }
        : null,
    };
    yield put({type: ActionTypes.REMOVE_CART_FAILURE, error: errorPayload});
  }
}

function* handleupadteCart(action) {
  const {authToken, product, quantity} = action?.payload;

  const URL = `${baseURL}${apiUri.cart.upadte}${product}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  // console.log("headers =======>",headers)
  const data = {
    quantity: quantity,
  };
  console.log(' handleupadteCart url=========>>>>>', URL);
  // console.log(" handleupadteCart data=========>>>>>", data);

  try {
    const response = yield call(axios.put, URL, data, {headers});
    const responseData = response?.data;
    // console.log("responseData", responseData);
    const payload = {
      authToken: authToken,
    };
    // console.log('authTokenauthTokenauthToken===>>', payload);

    // yield put({type: ActionTypes.UPDATE_CART_SUCCESS});
    yield put({type: ActionTypes.FETCH_CART_REQUEST, payload: {authToken}});
  } catch (error) {
    console.error(
      'Error fetching cart:',
      error.response?.status,
      error.response?.data,
    );
    yield put({type: ActionTypes.UPDATE_CART_FAILURE, error});
  }
}

function* fetchCartSaga() {
  yield takeEvery(ActionTypes.FETCH_CART_REQUEST, fetchCartApi);
  yield takeEvery(ActionTypes.ADD_CART_REQUEST, handleAddToCart);
  yield takeEvery(ActionTypes.REMOVE_CART_REQUEST, handleRemoveCart);
  yield takeEvery(ActionTypes.UPDATE_CART_REQUEST, handleupadteCart);
}
export default fetchCartSaga;

import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes.js';

function* userLocationApiCall(action) {
  const { location } = action?.payload;
  try {
    const data = { location }; 
    const URL = `${baseURL}${apiUri.common?.checkLocation}`;
    
    console.log('Request URL:', URL);
    // console.log('Request Data:', data);

    const response = yield axios.post(URL, data);
    const loginRes = response?.data;
    yield put({ type: ActionTypes.CHECK_LOCATION_SUCCESS, loginRes });
  } catch (error) {
    console.error('userLocationSaga Request Failed:', error);
    console.error(
      'userLocationSaga Request Failed======>:',
      error.response?.status,
      error.response?.data,
    );
    // Extracting a serializable error message or status code
    const errorMessage = error.response?.data?.message || 'Unknown error occurred';
    yield put({ type: ActionTypes.CHECK_LOCATION_FAILURE, error: errorMessage });
  }
}

function* getUserLocationApiCalss(action) {
  const {authToken} = action?.payload;
  const URL = `${baseURL}${apiUri.common.getAddtress}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  // console.log(" getAddtress url=========>>>>>", URL);
  // console.log("headers=========>>>>>", headers);
  try {
    const response = yield axios.get(URL, {headers});
    const responseData = {
      data: response?.data?.addresses,
      // status: response?.status,
      // statusText: response?.statusText,
      config: {
        method: response?.config?.method,
        url: response?.config?.url,
      }, 
    };

    yield put({ type: ActionTypes.GET_LOCATION_SUCCESS, responseData });

  } catch (error) {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      // Strip out non-serializable parts like headers and request
      response: error?.response ? {
        status: error.response.status,
        data: error.response.data,
        // Remove non-serializable parts
        // config: {
        //   method: error.response.config?.method,
        //   url: error.response.config?.url,
        // },
      } : null,
    };
    yield put({
      type: ActionTypes.FETCH_CART_FAILURE,
      error:errorPayload
    });
  }
}

function* userLocationSaga() {
  // yield takeEvery(ActionTypes.CHECK_LOCATION_REQUEST, userLocationApiCall);
  yield takeEvery(ActionTypes.GET_LOCATION_REQUEST, getUserLocationApiCalss);
}

export default userLocationSaga;

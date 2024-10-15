import {takeEvery, put, call} from 'redux-saga/effects';
import axios from 'axios';
import {apiUri, baseURL} from '../../services/apiEndPoints.js';
import {ActionTypes} from '../Constants/ActionTypes.js';

function* userProfileApiCalls(action) {
  const {authToken} = action?.payload;
  const URL = `${baseURL}${apiUri.auth.getUserDetails}`;
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  // console.log(" userProfileApiCalls url=========>>>>>", URL);
  // console.log("headers=========>>>>>", headers);
  try {
    const response = yield axios.get(URL, {headers});
    const responseData = response?.data;
    yield put({type: ActionTypes.FETCH_USERPROFILE_SUCCESS, responseData});
  } catch (error) {
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
    // Dispatch failure action with a serializable error message
    yield put({
      type: ActionTypes.FETCH_USERPROFILE_FAILURE,
      error: errorPayload
    });
  }
}


function* userProfileSaga() {
  yield takeEvery(ActionTypes.FETCH_CART_REQUEST, userProfileApiCalls);
}
export default userProfileSaga;

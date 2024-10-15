import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes';

function* fetchcategories() {
  try {
    const url = baseURL + apiUri.common.getallcategories;
    // console.log("fetchcategories url",url)
    const response = yield call(axios.get, url);
    const responseData = response?.data;
    
    // Dispatch success action with the response data
    yield put({ type: ActionTypes.FETCH_CATEGORIES_SUCCESS, responseData });
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

    // Dispatch failure action with the sanitized error payload
    yield put({ type: ActionTypes.FETCH_CATEGORIES_FAILURE, error: errorPayload });
  }
}

function* categoriesSaga() {
  yield takeEvery(ActionTypes.FETCH_CATEGORIES_REQUEST, fetchcategories);
}

export default categoriesSaga;

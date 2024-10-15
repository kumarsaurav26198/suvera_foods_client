import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes.js';

function* loginUserApiCall(action) {
  const { phoneNumber } = action?.payload;
  console.log("loginUserApiCallloginUserApiCall")
  try {
    const data = { phoneNumber }; 
    const URL = `${baseURL}${apiUri.auth.login}`;
    
    console.log('Request URL:', URL);
    console.log('Request Data:', data);
    // x-requests-app:true
// const header:{}
    const response = yield axios.post(URL, data);
    const loginRes = response?.status;
    yield put({ type: ActionTypes.RESTART_LOGIN_REQUEST });
    yield put({ type: ActionTypes.LOGIN_REQUEST_SUCCESS, loginRes });
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

    yield put({ type: ActionTypes.LOGIN_REQUEST_FAILURE, error:errorPayload });
  }
}

function* loginSaga() {
  yield takeEvery(ActionTypes.LOGIN_REQUEST, loginUserApiCall);
}

export default loginSaga;

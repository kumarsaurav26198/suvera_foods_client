import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes.js';

function* registerApiCall(action) {
  const { name, password, phoneNumber } = action.payload;
  try {
    const data = { name, password, phoneNumber };
    const URL = `${baseURL}${apiUri.auth.register}`;
    console.log('registerApiCall Request URL:', URL);
    console.log('registerApiCall Request Data:', data);

    // Axios POST call to the API
    const response = yield call(axios.post, URL, data); 
    const verifyRes = response?.data;

    console.log('registerApiCall response:', verifyRes);
    yield put({ type: ActionTypes.REGISTER_USER_SUCCESS, payload: verifyRes  });


    // if (verifyRes?.authToken) {
    //   // Dispatch success actions if authToken is received
    //   yield put({ type: ActionTypes.VERIFY_REQUEST_SUCCESS, payload: verifyRes });
    // } else {
    //   // If no authToken but success response, still handle it
    //   yield put({ type: ActionTypes.REGISTER_USER_SUCCESS, payload: verifyRes });
    // }

  } catch (error) {
    // Extract relevant error information to ensure it's serializable
    const serializedError = {
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


    
    // Dispatch the serialized error
    yield put({ type: ActionTypes.REGISTER_USER_FAILURE, error: serializedError });
  }
}

function* registerSaga() {
  yield takeEvery(ActionTypes.REGISTER_USER_REQUEST, registerApiCall);
}

export default registerSaga;

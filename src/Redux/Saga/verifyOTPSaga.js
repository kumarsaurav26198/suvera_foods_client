import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints';
import { ActionTypes } from '../Constants/ActionTypes';
import { navigate, reset } from '../../services/navigationService';

function* VerifyWithOtpApiCall(action) {
  const { phoneNumber, otp } = action.payload;

  try {
    const data = { phoneNumber, otp };
    const headers = {
      "x-requests-app":true,
    };
    const URL = `${baseURL}${apiUri.auth.verifyotp}`;
    console.log('Request URL:', URL);
    console.log('Request headers:', headers);

    // Using call to yield axios request
    const response = yield call(axios.post, URL, data,{headers});
    const verifyRes = response.data;

    // Dispatch success action first
    yield put({ type: ActionTypes.VERIFY_REQUEST_SUCCESS, verifyRes });

    navigate("Home");

  } catch (error) {
    // Format the error payload
    const errorPayload = {
      message: error.response?.data?.message || error.message || 'Something went wrong!',
      status: error.response?.status || null,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        config: {
          method: error.response.config?.method,
          url: error.response.config?.url,
        },
      } : null,
    };

    console.log("errorPayload===>", JSON.stringify(errorPayload, null, 2));

    // Dispatch failure action
    yield put({ type: ActionTypes.VERIFY_REQUEST_FAILURE, error: errorPayload });

    navigate("Home");
  }
}

function* verifyOTPSaga() {
  yield takeEvery(ActionTypes.VERIFY_REQUEST, VerifyWithOtpApiCall);
}

export default verifyOTPSaga;

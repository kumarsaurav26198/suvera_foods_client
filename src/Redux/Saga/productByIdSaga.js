import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes.js';

function* fetchProductByIDApicall(action) {
  const { token, productId } = action.payload;
  try {
    const url = `${baseURL + apiUri.product.procuctById}${productId}`;
    const headers = {
      // 'Authorization': `Bearer ${token}`,
      'x-city-id': '66883209127f2c4e8a136ef1'
    };

    const response = yield call(axios.get, url, { headers });
    const responseData = response?.data;
    // console.log("responseDataresponseData======>>",responseData)
    
    yield put({ type: ActionTypes.PRODUCT_BYID__SUCCESS, responseData });
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
    yield put({ type: ActionTypes.PRODUCT_BYID__FAILURE, error:errorPayload });
  }
}

function* productByIdSaga() {
  yield takeEvery(ActionTypes.PRODUCT_BYID__REQUEST, fetchProductByIDApicall);
}

export default productByIdSaga;

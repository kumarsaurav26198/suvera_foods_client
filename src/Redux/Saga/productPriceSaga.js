import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes';

function* fetchProductWithPriceApicall(action) {
  const { token,categoryId } = action?.payload;
  try
  {
    const url = `${baseURL+apiUri.product.withcategoryId}${categoryId}`;
    // const headers = {
    //   'Authorization': `Bearer ${token}`,
    //   "x-city-id":"66883209127f2c4e8a136ef1"
    //  };
     console.log("urlurlurlurlurl======>>",url)
     const response = yield call(axios.get, url,);
    const responseData = response?.data;
    // console.log("responseDataresponseData======>>",responseData?.products)
    yield put({ type: ActionTypes.PRODUCT_PRICE_SUCCESS, responseData });
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

    yield put({ type: ActionTypes.PRODUCT_PRICE_FAILURE, error:errorPayload });
  }
}

function* productPriceSaga() {
  yield takeEvery(ActionTypes.PRODUCT_PRICE_REQUEST, fetchProductWithPriceApicall);
}
export default productPriceSaga;
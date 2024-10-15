import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { apiUri, baseURL } from '../../services/apiEndPoints.js';
import { ActionTypes } from '../Constants/ActionTypes';


function* fetchOrderApiCalls(action) {
    const { authToken } = action?.payload;
    const URL = `${ baseURL }${ apiUri.cart.getAllOrders }`;
    const headers = {
        Authorization: `Bearer ${ authToken }`,
        'Content-Type': 'application/json',
    };
    console.log(" fetchOrderApiCalls url=========>>>>>", URL);
    // console.log("headers=========>>>>>", headers);
    try
    {
        const response = yield axios.get(URL, { headers });
        const responseData = response?.data;
        yield put({ type: ActionTypes.FETCH_ORDER_SUCCESS, responseData });
    } catch (error)
    {
        const errorPayload = {
            message: error?.response?.data?.message || error.message || 'Something went wrong!',
            status: error?.response?.status || null,
            response: error?.response ? {
                status: error.response.status,
                data: error.response.data,
                config: {
                    method: error.response.config?.method,
                    url: error.response.config?.url,
                },
            } : null,
        };
        yield put({ type: ActionTypes.FETCH_ORDER_FAILURE,error: errorPayload});
    }
}

function* orderSaga() {
    yield takeEvery(ActionTypes.FETCH_ORDER_REQUEST, fetchOrderApiCalls);
}
export default orderSaga;
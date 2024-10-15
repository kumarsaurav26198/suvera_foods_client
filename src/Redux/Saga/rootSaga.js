import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import verifyOTPSaga from './verifyOTPSaga';
import registerSaga from './registerSaga';
import categoriesSaga from './categoriesSaga';
import socialMediaSaga from './socialMediaSaga';
import productPriceSaga from './productPriceSaga';
import fetchCartSaga from './fetchCartSaga';
import userLocationSaga from './userLocationSaga';
import bestSellerSaga from './bestSellerSaga';
import productByIdSaga from './productByIdSaga';
import couponSaga from './couponSaga';
import comboSaga from './comboSaga';
import bannerSaga from './bannerSaga';
import userProfileSaga from './userProfileSaga';
import orderSaga from './orderSaga';

function* rootSaga() {
    yield all([
        loginSaga(),
        verifyOTPSaga(),
        userProfileSaga(),
        registerSaga(),
        categoriesSaga(),
        socialMediaSaga(),
        productPriceSaga(),
        fetchCartSaga(),
        orderSaga(),
        userLocationSaga(),
        bestSellerSaga(),
        productByIdSaga(),
        couponSaga(),
        comboSaga(),
        bannerSaga()
    ]);
}

export default rootSaga;
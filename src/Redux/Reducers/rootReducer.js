import { combineReducers } from 'redux';
import { loginReducers } from './loginReducers';
import { verifyReducers } from './verifyReducers';
import { registerReducers } from './registerReducers';
import { socialMediaReducers } from './socialMediaReducers';
import { categoriesReducers } from './categoriesReducers';
import { productPriceReducers } from './productPriceReducers';
import cartReducer from './cartReducer';
import { userLocationReducers } from './userLocationReducers';
import { bestSellerReducers } from './bestSellerReducers';
import { productByIDReducers } from './productByIDReducers';
import { couponReducers } from './couponReducers';
import { comboReducers } from './comboReducers';
import { bannnerReducers } from './bannerReducers';
import { userProfileReducers } from './userProfileReducers';
import orderReducers from './orderReducers';

// import { notificationReducers } from './notificationReducres';
// import { getProfileReducres } from './getProfileReducres';
// import { updateProfileReducers } from './updateProfileReducers';
// import { updatePasswordReducers } from './updatePasswordReducers';
// import { getFollowerReducers } from './getFollowerReducers';
// import { getFollowingReducres } from './getFollowingReducres';
// import { searchProfileReducers } from './searchProfileReducers';
// import { userByIdReducers } from './userByIdReducers';
// import { forgetPasswordReducer } from './forgetPasswordReducer';
// import { followandunfollowReducers } from './followandunfollowReducers';


export default combineReducers({
    loginReducers: loginReducers,
    verifyReducers: verifyReducers,
    userProfileReducers:userProfileReducers,
    registerReducers: registerReducers,
    socialMediaReducers: socialMediaReducers,
    categoriesReducers: categoriesReducers,
    productPriceReducers: productPriceReducers,
    cartReducer:cartReducer,
    userLocationReducers:userLocationReducers,
    registerReducers:registerReducers,
    bestSellerReducers:bestSellerReducers,
    productByIDReducers:productByIDReducers,
    couponReducers:couponReducers,
    comboReducers:comboReducers,
    bannnerReducers:bannnerReducers,
    orderReducers:orderReducers


    // getProfileReducres:getProfileReducres,
    // notificationReducers:notificationReducers,
    // updateProfileReducers:updateProfileReducers,
    // updatePasswordReducers:updatePasswordReducers,
    // getFollowerReducers:getFollowerReducers,
    // getFollowingReducres:getFollowingReducres,
    // searchProfileReducers:searchProfileReducers,
    // userByIdReducers:userByIdReducers,
    // forgetPasswordReducer:forgetPasswordReducer,
    // followandunfollowReducers:followandunfollowReducers
});
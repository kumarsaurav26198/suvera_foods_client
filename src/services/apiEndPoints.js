// const baseURL = 'https://suvera-foods-be.onrender.com/';
// const baseURL = 'http://13.233.117.35/';
// const baseURL = 'http://15.207.86.89/';
// const baseURL = 'http://13.127.33.90/';
// const baseURL = 'http://13.127.226.155/';
const baseURL = 'https://2d9d-103-248-172-67.ngrok-free.app/';
const apiUri = {
  auth: {
    login: 'api/v1/auth/login-otp',
    verifyotp: 'api/v1/auth/verify-otp',
    register: 'api/v1/auth/signup',
    forgot: 'auth/forgot-password',
    sessioninfo: 'session_info',
    logout: 'auth/logout',
    getUserDetails:"api/v1/profile/user",
    update_user_details: 'api/v1/update_user_details',
    updatepassword: 'api/v1/auth/update-password',
  },
  common:{
    getAllbanner:"api/v1/common/get-banner",

    getallcategories:"api/v1/category/",
    getallSocial:"api/v1/common/get-social-media",
    checkLocation:"api/v1/address/check-location",
    getAddtress:"api/v1/address",
    bestSeller:"api/v1/best-seller",
    allCombo:"api/v1/combo",
    allCoupons:"api/v1/coupon",
    applyCoupon:"api/v1/cart/coupon",
  },
  product:{
    withcategoryId:"api/v1/product?categoryId=",
    procuctById:"api/v1/product/"
  },
  cart:{
    getUserCart:"api/v1/cart",
    remove:"api/v1/cart/",
    upadte:"api/v1/cart/",
    updatePaymentMode:"api/v1/cart/",
    applyCartAddress:"api/v1/cart/address",
    addCart:"api/v1/cart",
    getAllOrders:"api/v1/order",
    placingOrder:"api/v1/order/place-order",

  }
};

export { apiUri, baseURL };
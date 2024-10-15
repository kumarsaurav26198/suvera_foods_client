import { ActionTypes } from "../Constants/ActionTypes";

export const loginRequest = (payload) => ({
    type: ActionTypes.LOGIN_REQUEST,
    payload: payload
});

export const verifyReq = (payload) => ({
    type: ActionTypes.VERIFY_REQUEST,
    payload: payload
});

export const registerRequest = (payload) => ({
    type: ActionTypes.REGISTER_USER_REQUEST,
    payload,
});

export const checkSession=(payload)=>({
    type: ActionTypes.CHECK_SESSION,
    payload: payload
})
export const forgotpasswordAction=(email)=>({
    type: ActionTypes.FORGET_PASSWORD,
    email
})


export const logOut = () => ({
    type: ActionTypes.LOG_OUT_REQUEST,
});
export const fetchUserProfile = payload => ({
    type: ActionTypes.FETCH_USERPROFILE_REQUEST,
    payload,
  });

// export const registerRequest = (payload) => ({
//     type: ActionTypes.REGISTER_USER,
//     payload,
// });
// export const registerSuccess = (data) => ({
//     type: ActionTypes.REGISTER_USER_SUCCESS,
//     payload: data
// });
// export const registerFailure = (error) => ({
//     type: ActionTypes.REGISTER_USER_FAILURE,
//     payload: error
// });


// export const resetpasswordAction=(payload)=>({
//     type: ActionTypes.RESET_PASSWORD,
//     payload: payload
// })
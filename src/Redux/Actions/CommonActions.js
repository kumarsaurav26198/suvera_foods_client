import { ActionTypes } from "../Constants/ActionTypes";

export const fetchSocialMedia = () => ({
    type: ActionTypes.FETCH_SOCIAL_MEDIA_REQUEST,
});
export const fetchCategories = () => ({
    type: ActionTypes.FETCH_CATEGORIES_REQUEST,
});
export const fetchBestSeller = () => ({
    type: ActionTypes.FETCH_BESTSELLER_REQUEST,
});
export const fetchCombo = () => ({
    type: ActionTypes.FETCH_COMBO_REQUEST,
});
export const fetchAllbanner = () => ({
    type: ActionTypes.FETCH_BANNER_REQUEST,
});
export const CheckUserLocation = (payload) => ({
    type: ActionTypes.CHECK_LOCATION_REQUEST,
    payload:payload
});
export const getUserLocation = (payload) => ({
    type: ActionTypes.GET_LOCATION_REQUEST,
    payload:payload
});

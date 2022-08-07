import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    RESET_EDIT_STATUS,
    IMAGE_PROFILE_SUCCESS,
    IMAGE_PROFILE_FAIL,
    RESET_IMAGE_STATUS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
} from '../actions/types';

const initialState = {
    profile: {user_company:null, photo:null},
    profileStatus: false,
    imageStatus: false,
    users: null,
};

export default function Profile(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILE_SUCCESS:
            return{
                ...state,
                profile:payload
            }
        case GET_PROFILE_FAIL:
            return{
                ...state,
                profile:null
            }
        case EDIT_PROFILE_SUCCESS:
            return{
                ...state,
                profileStatus: true,
            }
        case EDIT_PROFILE_FAIL:
        case RESET_EDIT_STATUS:
            return{
                ...state,
                profileStatus: false,
            }
        case IMAGE_PROFILE_SUCCESS:
            return{
                ...state,
                imageStatus: true,
            }
        case IMAGE_PROFILE_FAIL:
        case RESET_IMAGE_STATUS:
            return{
                ...state,
                imageStatus: false,
            }
        case GET_USERS_SUCCESS:
            return{
                ...state,
                users:payload,
            }
        case GET_USERS_FAIL:
            return{
                ...state,
                users:null,
            }
        default:
            return state
    };
}
import {
    VIEW_UNITE_USER,
    GET_UNITE_SUCCESS,
    GET_UNITE_FAIL,
    LIST_UNITE_SUCCESS,
    LIST_UNITE_FAIL,
    UNITE_USER_SUCCESS,
    UNITE_USER_FAIL,
    RESET_UNITE_STATUS,
    DELETE_UNITE_SUCCESS,
    DELETE_UNITE_FAIL
} from '../actions/types';

const initialState = {
    show: false,
    list_users: [],
    UniteStatus: false,
    users_unite: []
};

export default function Unite(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_UNITE_USER:
            return{
                ...state,
                show:payload
            };
        case LIST_UNITE_SUCCESS:
            return {
                ...state,
                list_users: payload.res,
            };
        case GET_UNITE_SUCCESS:
            return {
                ...state,
                users_unite: payload.res,
            };
        case GET_UNITE_FAIL:
            return {
                ...state,
                users_unite: []
            };
        case UNITE_USER_SUCCESS:
        case DELETE_UNITE_SUCCESS:
            return {
                ...state,
                UniteStatus: true,
                list_users: []
            };
        case UNITE_USER_FAIL:
        case RESET_UNITE_STATUS:
        case DELETE_UNITE_FAIL:
        case LIST_UNITE_FAIL:
            return {
                ...state,
                UniteStatus: false,
                list_users: []
            };
        default:
            return state
    };
}
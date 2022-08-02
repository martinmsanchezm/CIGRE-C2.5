import {
    VIEW_NEW_PROJECT,
    NEW_PROJECTS_SUCCESS,
    NEW_PROJECTS_FAIL,
    RESET_PROJECT_STATUS,
    GET_PROJECTS,
    GET_PROJECTS_FAIL,
    VIEW_EDIT_PROJECT,
    EDIT_PROJECT,
    EDIT_PROJECTS_SUCCESS,
    EDIT_PROJECTS_FAIL,
    DELETE_PROJECTS_SUCCESS,
    DELETE_PROJECTS_FAIL,
    POST_PROJECT
} from '../actions/types';

const initialState = {
    show: false,
    newPrjStatus: false,
    editPrjStatus: false,
    list_projects: null,
    edit_project: {title:'', desc:'', category:null},
    edit_show: false,
    post_project: null,
};

export default function Projects(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_NEW_PROJECT:
            return {
                ...state,
                show: payload,
            };
        case VIEW_EDIT_PROJECT:
            return {
                ...state,
                edit_show: payload
            };
        case NEW_PROJECTS_SUCCESS:
            return {
                ...state,
                newPrjStatus: true
            }
        case EDIT_PROJECTS_SUCCESS:
        case DELETE_PROJECTS_SUCCESS:
            return {
                ...state,
                editPrjStatus: true
            }             
        case NEW_PROJECTS_FAIL:
        case RESET_PROJECT_STATUS:
        case EDIT_PROJECTS_FAIL:
        case DELETE_PROJECTS_FAIL:
            return {
                ...state,
                newPrjStatus: false,
                editPrjStatus: false,
            }
        case GET_PROJECTS:
            return {
                ...state,
                list_projects: payload.res,
            };
        case GET_PROJECTS_FAIL:
            return {
                ...state,
                list_projects: null,
            };
        case EDIT_PROJECT:
            return {
                ...state,
                edit_project: payload,
                edit_show: true,
            };
        case POST_PROJECT:
            localStorage.setItem("post_project", JSON.stringify(payload));
            return {
                ...state,
                post_project: payload,
            };
        default:
            return state
    };
}
import {
    VIEW_NEW_SECTION,
    ADD_SECTION_SUCCESS,
    ADD_SECTION_FAIL,
    RESET_SECTION_STATUS,
    GET_SECTIONS_SUCCESS,
    GET_SECTIONS_FAIL,
    EDIT_SECTION_SUCCESS,
    EDIT_SECTION_FAIL,
    EDIT_SECTION,
    VIEW_EDIT_SECTION,
    DELETE_SECTION_SUCCESS,
    DELETE_SECTION_FAIL
} from '../actions/types';

const initialState = {
    show: false,
    show_edit: false,
    addSectionStatus: false,
    editSectionStatus: false,
    list_sections: [],
    edit_section: null
};

export default function Section(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_NEW_SECTION:
            return {
                ...state,
                show: payload,
            };
        case ADD_SECTION_SUCCESS:
            return {
                ...state,
                addSectionStatus: true
            };
        case EDIT_SECTION_SUCCESS:
        case DELETE_SECTION_SUCCESS:
            return {
                ...state,
                editSectionStatus: true
            };
        case ADD_SECTION_FAIL:
        case RESET_SECTION_STATUS:
        case EDIT_SECTION_FAIL:
        case DELETE_SECTION_FAIL:
            return {
                ...state,
                addSectionStatus: false,
                editSectionStatus: false
            };
        case GET_SECTIONS_SUCCESS:
            return {
                ...state,
                list_sections: payload.res,
            };
        case GET_SECTIONS_FAIL:
            return {
                ...state,
                list_sections: []
            };
        case EDIT_SECTION:
            return {
                ...state,
                edit_section: payload,
            };
        case VIEW_EDIT_SECTION:
            return {
                ...state,
                show_edit: payload,
            };
        default:
            return state
    };
}
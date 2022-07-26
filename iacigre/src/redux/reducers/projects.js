import {
    VIEW_NEW_PROJECT,
} from '../actions/types';

const initialState = {
    show: false,
};

export default function Projects(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case VIEW_NEW_PROJECT:
            return {
                ...state,
                show: payload.show,
            };
        default:
            return state
    };
}
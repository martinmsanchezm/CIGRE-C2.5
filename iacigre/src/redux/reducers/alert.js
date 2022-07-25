import {
    SET_ALERT,
    REMOVE_ALERT,
} from '../actions/types';

const initialState = {
    show: false,
    msg: "",
    alertType: "",
};

export default function Alert(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            return {
                ...state,
                show: payload.show,
                msg: payload.msg,
                alertType: payload.alertType
            };
        case REMOVE_ALERT:
            return {
                ...state,
                show: false,
                msg: "",
                alertType: ""
            }
        default:
            return state
    };
}
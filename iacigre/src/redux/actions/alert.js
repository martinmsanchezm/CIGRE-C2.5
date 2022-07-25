import {
    SET_ALERT,
    REMOVE_ALERT,
} from './types';


export const setAlert = (show, msg, alertType, timeout = 3000) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { show, msg, alertType }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
}
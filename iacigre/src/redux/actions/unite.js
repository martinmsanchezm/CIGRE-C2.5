import {
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    VIEW_UNITE_USER,
    GET_UNITE_SUCCESS,
    GET_UNITE_FAIL,
    UNITE_USER_SUCCESS,
    UNITE_USER_FAIL,
    RESET_UNITE_STATUS,
    DELETE_UNITE_SUCCESS,
    DELETE_UNITE_FAIL,
    LIST_UNITE_SUCCESS,
    LIST_UNITE_FAIL
} from '../actions/types';
import { setAlert } from './alert';
import axios from 'axios'

export const Set_view_unite_user = (show) => dispatch => {
    dispatch({
        type: VIEW_UNITE_USER,
        payload: show
    });
}

export const get_users = (name, prj_id) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        name,
        prj_id
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/unite/get-users`, body, config);
        if (res.status === 200) {
            dispatch({
                type: LIST_UNITE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LIST_UNITE_FAIL
            });
            dispatch(setAlert(true,'Error al cargar los usuarios', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: LIST_UNITE_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const get_unite = (prj_id) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        prj_id,
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/unite/get-unite`, body, config);
        if (res.status === 200) {
            dispatch({
                type: GET_UNITE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_UNITE_FAIL
            });
            dispatch(setAlert(true,'Error al cargar los usuarios', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: GET_UNITE_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const delete_unite = (
    project_id,
    user_id
) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        project_id,
        user_id
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/unite/delete-user`, body, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_UNITE_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: DELETE_UNITE_FAIL
            });
            dispatch(setAlert(true,'Error eliminar el usuario', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: DELETE_UNITE_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const unite_user = (
    user_id, 
    name, 
    project_id
) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        user_id, 
        name, 
        project_id
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/unite/unite-user`, body, config);
        if (res.status === 200) {
            dispatch({
                type: UNITE_USER_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: UNITE_USER_FAIL
            });
            dispatch(setAlert(true,'Error al unir el usuario', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: UNITE_USER_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const reset_unite_status = () => dispatch => {
    dispatch({
        type: RESET_UNITE_STATUS,
        payload: false
    });
}


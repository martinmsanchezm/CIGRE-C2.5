import {
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    RESET_EDIT_STATUS,
    IMAGE_PROFILE_SUCCESS,
    IMAGE_PROFILE_FAIL,
    RESET_IMAGE_STATUS,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL
} from '../actions/types';
import FormData from 'form-data'
import { setAlert } from './alert';
import axios from 'axios'

export const get_profile = () => async dispatch => {

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
        
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user_profile/get-user-profile`, body, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: res.data.res
            });
        } else {
            dispatch({
                type: GET_PROFILE_FAIL
            });
            dispatch(setAlert(true,'Error al cargar los proyectos', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: GET_PROFILE_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const edit_profile = (
    first_name,
    last_name,
    user_company
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
        first_name,
        last_name,
        user_company,
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user_profile/edit-user-profile`, body, config);
        if (res.status === 200) {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'));
        } else {
            dispatch({
                type: EDIT_PROFILE_FAIL
            });
            dispatch(setAlert(true,'Error al editar el perfil', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: EDIT_PROFILE_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const send_image = (image) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    let data = new FormData();
    data.append('file', image, image.name);

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user_profile/edit-image-profile`, data, config);
        if (res.status === 200) {
            dispatch({
                type: IMAGE_PROFILE_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'));
        } else {
            dispatch({
                type: IMAGE_PROFILE_FAIL
            });
            dispatch(setAlert(true,'Error al cargar la imagen', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: IMAGE_PROFILE_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}


export const reset_edit_status = () => dispatch => {
    dispatch({
        type: RESET_EDIT_STATUS,
        payload: false
    });
}

export const reset_image_status = () => dispatch => {
    dispatch({
        type: RESET_IMAGE_STATUS,
        payload: false
    });
}


export const get_users = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    const body = JSON.stringify({
        
    });

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user_profile/get-users`, body, config);
        if (res.status === 200) {
            dispatch({  
                type: GET_USERS_SUCCESS,
                payload: res.data.res
            });
        } else {
            dispatch({
                type: GET_USERS_FAIL
            });
            dispatch(setAlert(true,'Error al cargar los proyectos', '#fcbfbf'));
        }
    } catch(err) {
        dispatch({
            type: GET_USERS_FAIL
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}
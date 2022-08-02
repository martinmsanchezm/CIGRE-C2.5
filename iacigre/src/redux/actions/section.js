import {
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    VIEW_NEW_SECTION,
    ADD_SECTION_SUCCESS,
    ADD_SECTION_FAIL,
    RESET_SECTION_STATUS,
    GET_SECTIONS_SUCCESS,
    GET_SECTIONS_FAIL,
    EDIT_SECTION_SUCCESS,
    EDIT_SECTION_FAIL,
    VIEW_EDIT_SECTION,
    EDIT_SECTION,
    DELETE_SECTION_SUCCESS,
    DELETE_SECTION_FAIL
} from './types';
import { setAlert } from './alert';
import axios from 'axios'

export const Set_view_new_section = (show) => dispatch => {
    dispatch({
        type: VIEW_NEW_SECTION,
        payload: show
    });
}

export const edit_section = (prj) => dispatch => {
    dispatch({
        type: EDIT_SECTION,
        payload: prj
    });
}

export const Set_view_edit_section = (show) => dispatch => {
    dispatch({
        type: VIEW_EDIT_SECTION,
        payload: show
    });
}

export const reset_section_status = () => dispatch => {
    dispatch({
        type: RESET_SECTION_STATUS,
        payload: false
    });
}


export const setAddSection = (image, post_prj_id,title_value,desc_value,code_value) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    let data = new FormData();
    if (image){
        data.append('file', image, image.name);
    }else{
        data.append('file', '');
    }
    data.append('post_prj_id', post_prj_id);
    data.append('title_value', title_value);
    data.append('desc_value', desc_value);
    data.append('code_value', code_value);


    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/section/add-section`, data, config);
        if (res.status === 200) {
            dispatch({
                type: ADD_SECTION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: ADD_SECTION_FAIL
            });
            dispatch(setAlert(true,'Error al cargar la nueva sección', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: ADD_SECTION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const setEditSection = (image, section_id,title_value,desc_value,code_value, delete_image) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    let data = new FormData();
    if (image){
        data.append('file', image, image.name);
    }else{
        data.append('file', '');
    }
    data.append('section_id', section_id);
    data.append('title_value', title_value);
    data.append('desc_value', desc_value);
    data.append('code_value', code_value);
    data.append('delete_image', delete_image);



    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/section/edit-section`, data, config);
        if (res.status === 200) {
            dispatch({
                type: EDIT_SECTION_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: EDIT_SECTION_FAIL
            });
            dispatch(setAlert(true,'Error al cargar la nueva sección', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: EDIT_SECTION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const get_sections = (project_id) => async dispatch => {

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
        project_id:project_id
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/section/get-sections`, body, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SECTIONS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SECTIONS_FAIL
            });
            dispatch(setAlert(true,'Error al cargar los proyectos', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: GET_SECTIONS_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const delete_edit_section = (
    id, 
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
        id,
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/section/delete-section`, body, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_SECTION_SUCCESS
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: DELETE_SECTION_FAIL
            });
            dispatch(setAlert(true,'Error al eliminar la sección', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: DELETE_SECTION_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}
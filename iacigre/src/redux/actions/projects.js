import {
    VIEW_NEW_PROJECT,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
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
} from './types';
import { setAlert } from './alert';
import axios from 'axios'

export const Set_view_new_project = (show) => dispatch => {
    dispatch({
        type: VIEW_NEW_PROJECT,
        payload: show
    });
}

export const Set_view_edit_project = (show) => dispatch => {
    dispatch({
        type: VIEW_EDIT_PROJECT,
        payload: show
    });
}

export const add_new_project = (
    title,
    desc,
    category, 
    photo,
    status
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
        title,
        desc,
        category, 
        photo,
        status,
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/projects/add-project`, body, config);
        if (res.status === 200) {
            dispatch({
                type: NEW_PROJECTS_SUCCESS
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: NEW_PROJECTS_FAIL
            });
            dispatch(setAlert(true,'Error al crear el proyecto', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: NEW_PROJECTS_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const add_edit_project = (
    id,
    title,
    desc,
    category, 
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
        title,
        desc,
        category, 
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/projects/edit-project`, body, config);
        if (res.status === 200) {
            dispatch({
                type: EDIT_PROJECTS_SUCCESS
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: EDIT_PROJECTS_FAIL
            });
            dispatch(setAlert(true,'Error al editar el proyecto', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: EDIT_PROJECTS_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const delete_edit_project = (
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
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/projects/delete-project`, body, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PROJECTS_SUCCESS
            });
            dispatch(setAlert(true,res.data.res,'#8bf282'))
        } else {
            dispatch({
                type: DELETE_PROJECTS_FAIL
            });
            dispatch(setAlert(true,'Error al editar el proyecto', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: DELETE_PROJECTS_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}

export const get_projects = (user) => async dispatch => {

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
        user:user
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/projects/get-projects`, body, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROJECTS_FAIL
            });
            dispatch(setAlert(true,'Error al cargar los proyectos', '#fcbfbf'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch(err) {
        dispatch({
            type: GET_PROJECTS_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch(setAlert(true,err.request.response, '#fcbfbf'));
    }
}


export const reset_project_status = () => dispatch => {
    dispatch({
        type: RESET_PROJECT_STATUS,
        payload: false
    });
}

export const edit_project = (prj) => dispatch => {
    dispatch({
        type: EDIT_PROJECT,
        payload: prj
    });
}

export const post_project = (prj) => dispatch => {
    dispatch({
        type: POST_PROJECT,
        payload: prj
    });
}
import { combineReducers } from 'redux';
import Alert from './alert';
import Auth from './auth';
import Projects from './projects';
export default combineReducers({
    Alert,
    Auth,
    Projects,
})
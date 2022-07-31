import { combineReducers } from 'redux';
import Alert from './alert';
import Auth from './auth';
import Projects from './projects';
import Profile from './profile';
export default combineReducers({
    Alert,
    Auth,
    Projects,
    Profile,
})
import { combineReducers } from 'redux';
import Alert from './alert';
import Auth from './auth';
import Projects from './projects';
import Profile from './profile';
import Section from './section';
import Unite from './unite';
export default combineReducers({
    Alert,
    Auth,
    Projects,
    Profile,
    Section,
    Unite,
})
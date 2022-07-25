import {Provider} from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error404 from './helpers/Error';
import Home from './containers/Home';
import About from './components/pages/About';
import Faq from './components/pages/Faq';
import Main from './containers/Main';

// Authentication
import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
function App() {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            {/* Error Display */}
            <Route path="*" element={<Error404/>}/>
            <Route exact path='/' element={<Main/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/faq' element={<Faq/>}/>

            {/* Authentication */} 
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
            <Route exact path='/reset_password' element={<ResetPassword/>}/>
            <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>


          </Routes>
      </Router>
    </Provider>
  );
}

export default App;

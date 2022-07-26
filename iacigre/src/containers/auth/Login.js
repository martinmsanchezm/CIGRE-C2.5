import PageMain from '../../hocs/PageMain'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { login, set_sign_state } from '../../redux/actions/auth'
import { Oval } from 'react-loader-spinner'
import { Navigate } from 'react-router'

const Login = ({
  login,
  loading,
  loginStatus,
  set_sign_state
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { 
    email,
    password,
  } = formData;

  const [loginSucess, setloginSucess] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    login(email, password);
    setloginSucess(true);
  }


  if (loginSucess && !loading && loginStatus){
    set_sign_state(false)
    return <Navigate to='/' />;
  }

  return(
    <PageMain>
            {/* <!-- Section: Design Block --> */}
      <form onSubmit={e=>onSubmit(e)}>
        <p>Iniciar Sesión</p>
          {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input 
                className="form-control" 
                name="email"
                value={email}
                onChange={e=>onChange(e)}
                type="email"
                required
              />
          <label className="form-label" htmlFor="form3Example3">Email address</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline">
          <input 
                className="form-control" 
                name="password"
                value={password}
                onChange={e=>onChange(e)}
                type="password"
                required
                />
          <label className="form-label" htmlFor="form3Example4">Password</label>                    
        </div>
        <p className="secondary m-1">
            <Link to="/reset_password" className='h6'>
            Forgot your password?
          </Link>
        </p>
        <div>
        {/* <!-- Submit button --> */}
        {loading?
          <button type="submit" className="btn btn-primary btn-block btn-lg m-0">
            <Oval
            color="#fff"
            width={20}
            height={20}
            />
          </button>
          :
          <button type="submit" className="btn btn-primary btn-block btn-lg mb-2">
            Login
          </button>                    
        }
        </div>
        <p className="secondary m-0">
          No tienes cuenta &nbsp;
          <Link to="/signup" className='text-decoration-none'>
            Registrate
          </Link>
        </p>
        <p className="secondary m-0">
          Ir a &nbsp;
          <Link to="/" className='text-decoration-none'>
            Main
          </Link>
        </p>
      </form>
  </PageMain>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  loginStatus: state.Auth.loginStatus
})

export default connect(mapStateToProps, {
  login, set_sign_state
}) (Login)
import PageMain from '../../hocs/PageMain'
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { signup, set_sign_state } from '../../redux/actions/auth'
import { setAlert } from '../../redux/actions/alert'
import { Navigate } from 'react-router'
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom'


const Signup = ({
  signup, 
  setAlert, 
  loading, 
  signupStatus, 
  set_sign_state
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  })

  const [accountCreated, setAccountCreated] = useState(false);

  const { 
    first_name,
    last_name,
    email,
    password,
    re_password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    if (password === re_password){
    signup(first_name, last_name, email, password, re_password);
    setAccountCreated(true);
    }else{
      setAlert(true,"Password do not Match", '#fcbfbf')
    }
  }

  if (accountCreated && !loading && signupStatus){
    set_sign_state(false);
    return <Navigate to='/' />;
  }
  
  return (
    <PageMain>
      {/* <!-- Section: Design Block --> */}
    <form onSubmit={e=>onSubmit(e)}>
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
        <div className="row">
            <div className="col-md-6 mb-4">
            <div className="form-outline">
                <input 
                    type="text" 
                    className="form-control" 
                    name="first_name"
                    value={first_name}
                    onChange={e=>onChange(e)}
                    required
                    />
                <label className="form-label" htmlFor="form3Example1">First name</label>
            </div>
            </div>
            <div className="col-md-6 mb-4">
            <div className="form-outline">
                <input 
                    className="form-control" 
                    name="last_name"
                    value={last_name}
                    onChange={e=>onChange(e)}
                    type="text"
                    required
                    />
                <label className="form-label" htmlFor="form3Example2">Last name</label>
            </div>
            </div>
        </div>

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
        <div className="form-outline mb-4">
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

        {/* <!-- Confirm Password input --> */}
        <div className="form-outline mb-4">
            <input 
                className="form-control" 
                name="re_password"
                value={re_password}
                onChange={e=>onChange(e)}
                type="password"
                required
                />
            <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
        </div>

        {/* <!-- Submit button --> */}
        <div>
        {loading?
            <button type="submit" className="btn btn-primary btn-block btn-lg">
                <Oval
                color="#fff"
                width={20}
                height={20}
                />
            </button>
            :
            <button 
                    type="submit" 
                    className="btn btn-primary btn-block btn-lg">
                    Register
            </button>
        }
        </div>
        <p className="secondary">
            <Link to="/login">
            Login
          </Link>
        </p>
        <p className="secondary mt-2">
          Ir a &nbsp;
          <Link to="/">
            Main
          </Link>
        </p>
        </form>
    </PageMain>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading,
  signupStatus: state.Auth.signupStatus
})

export default connect(mapStateToProps, {
  signup, setAlert, set_sign_state
}) (Signup)
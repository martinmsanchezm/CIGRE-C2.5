import PageMain from '../../hocs/PageMain'
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { reset_password } from '../../redux/actions/auth'
import { Oval } from 'react-loader-spinner'
import { Navigate } from 'react-router'
import { Link } from 'react-router-dom'

const  ResetPassword = ({
  loading,
  reset_password
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [formData, setFormData] = useState({
    email: '',
  })

  const { 
    email,
  } = formData;

  const [requestSent, setRequestSent] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  }

  if (requestSent && !loading)
        return <Navigate to='/login' />;

  return(
    <PageMain>
        <form onSubmit={e=>onSubmit(e)}>
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
        {/* <!-- Submit button --> */}
        </div>
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
            <button type="submit" className="btn btn-primary btn-block btn-lg">
            Send Email
            </button>                    
        }
        </div>
        <p className="secondary mt-2">
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
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  reset_password
}) (ResetPassword)
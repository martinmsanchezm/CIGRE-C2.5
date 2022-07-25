import PageMain from '../../hocs/PageMain'
import { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { reset_password_confirm } from '../../redux/actions/auth'
import { Oval } from 'react-loader-spinner'
import { Navigate, useParams } from 'react-router'

const  ResetPasswordConfirm = ({
  reset_password_confirm,
  loading
}) => {

  const params = useParams()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  })

  const { 
    new_password,
    re_new_password,
  } = formData;

  const [requestSent, setRequestSent] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    const uid = params.uid
    const token = params.token
    reset_password_confirm(uid, token, new_password, re_new_password)
    if (new_password === re_new_password)
      setRequestSent(true);
  }

  if (requestSent && !loading)
        return <Navigate to='/login' />;


  return(
    <PageMain>
        <form onSubmit={e=>onSubmit(e)}>
        {/* <!-- Password input --> */}
        <div className="form-outline mb-2">
            <input 
                className="form-control" 
                name="new_password"
                value={new_password}
                onChange={e=>onChange(e)}
                type="password"
                required
                />
            <label className="form-label" htmlFor="form3Example4">New Password</label>                    
        </div>
        {/* <!-- Repeat Password input --> */}
        <div className="form-outline mb-2">
            <input 
                className="form-control" 
                name="re_new_password"
                value={re_new_password}
                onChange={e=>onChange(e)}
                type="password"
                required
                />
            <label className="form-label" htmlFor="form3Example4">Repeat Password</label>                    
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
            Change Password
            </button>                    
        }
        </div>
        </form>
  </PageMain>
  )
}

const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  reset_password_confirm
}) (ResetPasswordConfirm)
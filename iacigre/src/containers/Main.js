import PageMain from '../hocs/PageMain'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, set_login_status } from '../redux/actions/auth';
import { check_authenticated, load_user, refresh } from '../redux/actions/auth';

const Main = ({
    isAuthenticated,
    user,
    login,
    load_user,
    check_authenticated,
    refresh,
    loginStatus,
    set_login_status
    }) =>{

      if (loginStatus){
        set_login_status(false)
        load_user()
        check_authenticated()
        refresh()
      }

    return (
      <PageMain>
        <div>
        {/* <!-- Submit button --> */}
        <div className="my-5 text-center text-xl-start">
            <h1 className="display-5 fw-bolder text-white mb-2">Bienvenidos al CIGRE Grupo C2.5</h1>
            <p className="lead fw-normal text-white-50 mb-4">
                Modelos de Inteligencia Artificial aplicados en Sistemas Eléctricos y Afines
            </p>
        </div>
        {isAuthenticated && user?
        <>
        <p className="secondary mt-2">
            &nbsp;{user.get_full_name} &nbsp;
        </p>            
        <p className="secondary mt-2">
            &nbsp;Ir a &nbsp;
            <Link to="/home">
            <button className='btn btn-success'>Home</button>
            </Link>
        </p>
        </>
        :
        <>
        <p className="secondary mt-2">
            Ingresar como &nbsp;
            <button onClick={(e)=>{
                login(
                  `${process.env.REACT_APP_INVITADO_EMAIL}`,
                `${process.env.REACT_APP_INVITADO_PASSWORD}`
                )
              }} className='btn btn-success'
            >Invitado</button>
        </p>
        <p className="secondary mt-2">
          Ir a &nbsp;
          <Link to="/login" className='text-decoration-none'>
            Login
          </Link>
          &nbsp;o puedes &nbsp;
          <Link to="/signup" className='text-decoration-none'>
            Registrarte
          </Link>
        </p> 
        </>          
        }
        </div>
      </PageMain>
    )
  }


const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    loginStatus: state.Auth.loginStatus
})

export default connect(mapStateToProps,{
  login,
  load_user,
  check_authenticated,
  refresh,
  set_login_status
}) (Main)
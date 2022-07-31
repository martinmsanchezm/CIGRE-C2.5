import PageMain from '../hocs/PageMain'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../redux/actions/auth';
import { Navigate } from 'react-router';

const Main = ({
    isAuthenticated,
    user,
    logout,
    }) =>{

      const onClick = (e) =>{
        logout()
      }

    return (
      <PageMain>
        <div>
        {/* <!-- Submit button --> */}
        <div className="my-5 text-center text-xl-start">
            <h1 className="display-5 fw-bolder text-white mb-2">Bienvenidos al Cigré Grupo C2.5</h1>
            <p className="lead fw-normal text-white-50 mb-4">
                Modelos de Inteligencia Artificial aplicados en Sistemas Eléctricos o Sistemas Afines
            </p>
        </div>
        {isAuthenticated && user?
        <>
          <Dropdown>
            <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic">
                {user.get_full_name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item name='profile'>
                <Link to='/profile' id="RouterNavLink" className='text-decoration-none'>Profile</Link>                  
              </Dropdown.Item>
              <Dropdown.Item name='logout'>
                <Link to='/' id="RouterNavLink" className='text-decoration-none' onClick={onClick}>Logout</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
          Ir a &nbsp;
          <Link to="/login" className='text-decoration-none'>
            Login
          </Link>
        </p> 
        <p className="secondary mt-2">
          O puedes &nbsp;
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
})

export default connect(mapStateToProps,{
    logout,
}) (Main)
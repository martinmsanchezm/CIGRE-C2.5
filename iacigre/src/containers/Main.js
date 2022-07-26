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
        if (e.target.name==="logout"){
          console.log('logout')
          logout()
          return <Navigate to='/' />;
        }
      }

    return (
      <PageMain>
        <div>
        {/* <!-- Submit button --> */}
        <div className="my-5 text-center text-xl-start">
            <h1 className="display-5 fw-bolder text-white mb-2">Bienvenidos al Cigre Grupo C2.5</h1>
            <p className="lead fw-normal text-white-50 mb-4">
                Modelos de Intelignecia Artificial aplicados a sistemas eléctricos
            </p>
        </div>
        {isAuthenticated && user?
        <>
        <p className="secondary mt-2">
            <Dropdown>
              <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic">
                  {user.get_full_name}
              </Dropdown.Toggle>
              <Dropdown.Menu onClick={onClick}>
                <Dropdown.Item name='profile'>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item name='logout'>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
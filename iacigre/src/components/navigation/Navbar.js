import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Alert from '../alert';
import { logout } from '../../redux/actions/auth';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar({
  user,
  logout,
}) {

  const onClick = (e) =>{
    logout()
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <Link className="navbar-brand" to='/'>Cigré C2.5</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link" to='/home'>Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" to='/about'>About</Link></li>
                    {user?
                      <Dropdown>
                        <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic">
                            {user.get_full_name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item name='profile'>                            
                            <Link to='/profile' className='text-decoration-none'>Profile</Link>
                          </Dropdown.Item>
                          <Dropdown.Item name='logout'>  
                            <Link to='/' className='text-decoration-none' onClick={onClick}>Logout</Link>                         
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      :
                      null
                    }                 
                </ul>
            </div>
        </div>
    </nav>
    <Alert />
    </>
  )
}
const mapStateToProps = state => ({
  user: state.Auth.user,
})
export default connect(mapStateToProps, {
  logout,
})(Navbar)
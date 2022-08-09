import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Alert from '../alert';
import { logout } from '../../redux/actions/auth';
import Dropdown from 'react-bootstrap/Dropdown';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBarComp({
  user,
  logout,
}) {

  const onClick = (e) =>{
    logout()
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
          <Link className="navbar-brand" to='/'>CIGRE C2.5</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <li className="nav-item"><Link className="nav-link" to='/home'>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/about'>About</Link></li>
            {user?
              <Dropdown>
                <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic">
                    {user.get_full_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user && user.id!==8?
                    <Dropdown.Item name='profile'>                            
                      <Link to='/profile' className='text-decoration-none'>Profile</Link>
                    </Dropdown.Item>
                    :null}
                  <Dropdown.Item name='logout'>  
                    <Link to='/' className='text-decoration-none' onClick={onClick}>Logout</Link>                         
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              :
              null
            } 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Alert />
    </>
  )
}
const mapStateToProps = state => ({
  user: state.Auth.user,
})
export default connect(mapStateToProps, {
  logout,
})(NavBarComp)